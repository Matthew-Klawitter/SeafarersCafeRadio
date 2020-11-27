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
            const isAuthorized = db.Authorized.findOne({where: {email: req.body.email}});

            if (isAuthorized != null && isAuthorized){
                const accountExists = await db.Accounts.findOne({where: {username: req.body.username}});
                const emailExists = await db.Accounts.findOne({where: {email: req.body.email}});

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
                let role = await db.Role.find({where: {name: "default"}});

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

    // routes follow the db path, and thusly should only be accessable by admin roles
    app.route('/db/accounts/:id')
        .get(async (req, res) => {
            try {
                let account = await db.User.findOne({where: {id: req.params.id}});
                if (account != null){
                    let currentRole = await db.Roles.findOne({where: {id: account.roleId}});

                    if (currentRole != null){
                        // We must only send selective info on accounts
                        let details = {
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
        })
        .put(async (req, res) => {
            // TODO: Not implemented on release. Will need methodology to update/change passwords
            try {
                let account = await db.User.find({where: {id: req.params.id}})
                // let salt = crypto.randomBytes(32).toString("Base64");
                // const hash = hashWithSalt(req.body.password, salt);

                if (account != null){
                    account.username = req.body.username;
                    account.roleId = req.body.roleId;
                    account.save();
                }

                // console.log('Unable to PUT account: Not yet implemented.');
                res.redirect('/admin/accounts');
            } catch (e){
                res.status(400).send(e.message);
            }
        })
        .delete(async (req, res) => {
            try {
                let account = await db.User.find({where: {id: req.params.id}})

                if (account != null){
                    await account.destroy();
                    console.log('Successfully DELETE account: ' + account.username);
                    res.redirect('/admin/accounts');
                }

                console.log('Unable to DELETE account: User does not exist.');
                res.redirect('/admin/accounts');
            } catch (e){
                res.status(400).send(e.message);
            }
        });
}