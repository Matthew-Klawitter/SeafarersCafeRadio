const crypto = require('crypto');

function hashWithSalt(password, salt) {
    var hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    return hash.digest("base64");
};

/**
 * CRUD Account
 */
module.exports = function(app, db){
    // Only public route for registering new accounts
    app.post('/register/create', async (req, res) => {
        try {
            // Is the provided email address listed as one allowed to be used to create an account?
            const isAuthorized = await db.Authorized.findOne({where: {email: req.body.email}});

            if (isAuthorized != null && isAuthorized){
                const accountExists = await db.User.findOne({where: {username: req.body.username}});
                const emailExists = await db.User.findOne({where: {email: req.body.email}});

                if (accountExists != null && accountExists){
                    // account with this username already exists so we cannot make a new one.
                    console.log('Unable to create account: username already in use.');
                    res.redirect('/register?msg=Sorry, that username is already in use.');
                    return;
                }
                if (emailExists != null && emailExists){
                    // an account has already been created with this email so we cannot make a new one
                    console.log('Unable to create account: email already in use.');
                    res.redirect('/register?msg=Sorry, that email is already in use.');
                    return;
                }

                // if we pass the prior constraints then we're all set to make a new account
                let salt = crypto.randomBytes(32).toString("Base64");
                const hash = hashWithSalt(req.body.password, salt);

                // Due to seeders, this role should always exist. New and current Roles are not currently CRUDable by users
                let role = await db.Role.findOne({where: {name: "default"}});
                role = role.get({plain: true});

                let user = {
                    username: req.body.username,
                    password: hash,
                    salt: salt,
                    email: req.body.email, 
                    roleId: role.id
                };

                await db.User.create(user);
                console.log('Successfully created account: ' + user.username);
                res.redirect('/');
            }
            else {
                // This email is not authorized to create an account.
                console.log('Unable to create account: Unauthorized email.');
                res.redirect('/register?msg=Sorry, that email is not authorized to create an account.');
            }
        } catch (e){
            res.status(400).send(e.message);
        }
    });

    app.get('/db/accounts/roles/all', async (req, res) => {
        try {
            let roles = await db.Role.findAll();
            roles = roles.map(x => x.get({plain: true}));

            if (roles != null){
                let filtered = [];

                for (i = 0; i < roles.length; i++){
                    if (roles[i].name != "owner"){
                        filtered.push(roles[i]);
                    }
                }

                res.send(filtered);
                console.log('Sent GET all for roles');
                return;
            }
            else {
                res.sendStatus(404);
                console.log('Unable to send GET all for roles');
                return;
            }
        } catch (e){
            res.status(400).send(e.message);
        }
    });

    app.get('/db/accounts/all', async (req, res) => {
        try {
            let accounts = await db.User.findAll();
            accounts = accounts.map(x => x.get({plain: true}));

            if (accounts != null){
                let dataAccount = [];

                for (i = 0; i < accounts.length; i++){
                    let role = await db.Role.findOne({where: {id: accounts[i].roleId}});
                    role = role.get({plain: true});

                    dataAccount.push({
                        id: accounts[i].id,
                        username: accounts[i].username,
                        email: accounts[i].email,
                        role: role.name
                    });
                }

                res.send(dataAccount);
                console.log('Sent GET all for accounts');
                return;
            }
            else {
                res.sendStatus(404);
                console.log('Unable to send GET all for accounts');
                return;
            }
        } catch (e){
            res.status(400).send(e.message);
        }
    });

    // routes follow the db path, and thusly should only be accessable by admin roles
    app.get('/db/accounts/:id', async (req, res) => {
        try {
            let account = await db.User.findOne({where: {id: req.params.id}})
            account = account.get({plain: true});
            if (account != null){
                let currentRole = await db.Role.findOne({where: {id: account.roleId}});
                currentRole = currentRole.get({plain: true});
                if (currentRole != null){
                    // We must only send selective info on accounts
                    let details = {
                        id: account.id,
                        username: account.username,
                        email: account.email,
                        role: currentRole.name
                    }
                    res.send(details);
                    console.log('Sent GET for account: ' + req.params.id);
                    return;
                }
                else {
                    res.sendStatus(404);
                    console.log('Unable to GET account: Associated role does not exist.');
                    return;
                }
            }
            else {
                res.sendStatus(404);
                console.log('Unable to GET account: User does not exist.');
                return;
            }
        } catch (e){
            res.status(400).send(e.message);
        }
    });

    app.post('/db/accounts/update', async (req, res) => {
        // TODO: Ability to update all account info not implemented on release. Will need methodology to update/change passwords
        try {
            let account = await db.User.findOne({where: {id: req.body.id}})
            let dataAccount = account.get({plain: true});
            let role = await db.Role.findOne({where: {id: dataAccount.roleId}});
            role = role.get({plain: true});
            let ownerRole = await db.Role.findOne({where: {name: "owner"}});
            ownerRole = ownerRole.get({plain: true});
            // let salt = crypto.randomBytes(32).toString("Base64");
            // const hash = hashWithSalt(req.body.password, salt);

            if (account != null && role != null){
                // Do not update role for owners
                if (role.name == "owner"){
                    account.update({
                        username: req.body.username
                    });
                    account.save();
                }
                else {
                    // Currently not allowed to assign other owners
                    if (req.body.roleId == ownerRole.id){
                        console.log("Warning: A blocked attempt was made to assign a new owner account by an admin through a modified post request.")
                    }
                    else {
                        account.update({
                            username: req.body.username,
                            roleId: req.body.roleId
                        });
                        account.save();
                    }
                }
            }
            
            res.redirect('/admin/accounts');
        } catch (e){
            res.status(400).send(e.message);
        }
    });
     
    app.post('/db/accounts/delete', async (req, res) => {
        try {
            let account = await db.User.findOne({where: {id: req.body.id}});
            let dataAccount = account.get({plain: true});
            let role = await db.Role.findOne({where: {id: dataAccount.roleId}});
            role = role.get({plain: true});
            
            if (account != null && role != null){
                if (role.name == "owner"){
                    console.log('Cannot DELETE owner account: ' + dataAccount.username);
                    res.redirect('/admin/accounts');
                    return;
                }
                else {
                    await account.destroy();
                    console.log('Successfully DELETE account: ' + dataAccount.username);
                    res.redirect('/admin/accounts');
                    return;
                }
            }

            console.log('Unable to DELETE account: User does not exist.');
            res.redirect('/admin/accounts');
        } catch (e){
            res.status(400).send(e.message);
        }
    });
}