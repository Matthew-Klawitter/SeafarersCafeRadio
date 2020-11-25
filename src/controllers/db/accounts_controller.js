const crypto = require('crypto');
const path = require('path');
const { config } = require('process');

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
    app.post('/register/create', (req, res) => {
        try {
            // do we have the specified email address listed as one allowed to be used to create an account?
            const isAuthorized = db.Authorized.findOne({where: {email: req.body.email}});

            if (isAuthorized != null && isAuthorized){
                const accountExists = db.Accounts.findOne({where: {username: req.body.username}});
                const emailExists = db.Accounts.findOne({where: {email: req.body.email}});

                if (accountExists != null && accountExists){
                    // account with this username already exists so we cannot make a new one.
                    res.redirect('/register');
                    return;
                }
                if (emailExists != null && emailExists){
                    // an account has already been created with this email so we cannot make a new one
                    res.redirect('/register');
                    return;
                }

                // if we pass the prior contraints then we're all set to make a new account
                let salt = crypto.randomBytes(32).toString("Base64");
                const hash = hashWithSalt(req.body.password, salt);
                let role = await db.Role.find({where: {name: "default"}});

                let user = {
                    username: req.body.username,
                    password: hash,
                    salt: salt,
                    email: req.body.email, 
                    roleId: role.id
                };

                await db.User.create(user);
                res.redirect('/');
            }
            else {
                // This email is not authorized to create an account.
                res.redirect('/register');
            }
        } catch (e){
            res.status(400).send(e.message);
        }
    });

    // routes follow the db path, and thusly should only be accessable by admin roles
    app.route('/db/accounts/:id')
        .get((req, res) => {
            try {
                let account = await db.findOne({where: {id: req.params.id}});
                if (account != null){
                    res.send(account);
                }
                else {
                    res.send(null);
                }
            } catch (e){
                res.status(400).send(e.message);
            }
        })
        .put((req, res) => {
            // TODO: Not implemented on release. Will need methodology to update/change passwords
            try {
                let accountId = req.params.id;
                let account = await db.User.find({where: {id: accountId}})
                let salt = crypto.randomBytes(32).toString("Base64");
                const hash = hashWithSalt(req.body.password, salt);

                if (account != null){
                    account.salt = salt;
                    account.password = hash;
                    account.save();
                }

                res.redirect('/admin/accounts');
            } catch (e){
                res.status(400).send(e.message);
            }
        })
        .delete((req, res) => {
            try {
                let accountId = req.params.id;
                let account = await db.User.find({where: {id: accountId}})

                if (account != null){
                    await account.destroy();
                    res.redirect('/admin/accounts');
                }
                else {
                    res.send(null);
                }

            } catch (e){
                res.status(400).send(e.message);
            }
        });
}