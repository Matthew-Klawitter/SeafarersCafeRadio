const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const path = require('path');

const jwtFunctions = {
    sign: function(message, secret) {
      return jwt.sign({ value: message }, secret);
    },
    verify: function(token, secret) {
      return jwt.verify(token, secret).value;
    }
  }

function hashWithSalt(password, salt){
    var hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    return hash.digest("base64");
};

// Allows all authenticated users access to radio routes
function radioMiddleware(req, res, next){
    let cookie = req.cookies.authorization;

    if (!cookie) {
        console.debug("Redirecting to login - no cookie")
        res.redirect('/');
        return;
    }
    try {
        const decryptedUserId = jwtFunctions.verify(cookie, secret);
        db.User.findOne({ where: { username: decryptedUserId } }).then((user, error) => {
            if (user) {
                res.locals.user = user.get({ plain: true });
            } 
            else
            {
                console.debug("Redirecting to login - invalid cookie")
                res.redirect('/');
                return;
            }
        });
    } catch (e) {
        res.status(400).send(e.message);
    }
    next();
}

// Allows authenticated admin users access to admin and db routes
async function adminMiddleware(req, res, next){
    let cookie = req.cookies.authorization;

    if (!cookie) {
        console.debug("Redirecting to login - no cookie")
        res.redirect('/');
        return;
    }
    try {
        const decryptedUserId = jwtFunctions.verify(cookie, secret);
        db.User.findOne({ where: { username: decryptedUserId } }).then((user, error) => {
            if (user) {
                res.locals.user = user.get({ plain: true });

                let adminRole = await db.Role.findOne({where: {name: "admin"}});
                adminRole = adminRole.get({plain: true});
                let ownerRole = await db.Role.findOne({where: {name: "owner"}});
                ownerRole = ownerRole.get({plain: true});

                if (user.roleId != adminRole.id && user.roleId != ownerRole.id){
                    console.debug("Redirecting to login - non-admin cannot access admin routes.");
                    res.redirect('/');
                    return;
                }
            } 
            else
            {
                console.debug("Redirecting to login - invalid cookie")
                res.redirect('/');
                return;
            }
        });
    } catch (e) {
        res.status(400).send(e.message);
    }
    next();
}

module.exports = function (app, db, secret){
    /**
     * Data sensitive routes requiring authenticated users
     */
    app.use('/radio', (req, res, next) =>{
        radioMiddleware(req, res, next);
    });

    app.use('/admin', (req, res, next) =>{
        adminMiddleware(req, res, next);
    });

    app.use('/db', (req, res, next) =>{
        adminMiddleware(req, res, next);
    });

    // Index Controller routes
    app.post('/login', async function(req, res){
        const user = await db.User.findOne({ where: { username: req.body.username} })

        if (user == null){
            console.debug("Unsuccessfull login: Redirecting to login")
            res.redirect('/?msg=Invalid login');
            return;
        }

        const hash = hashWithSalt(req.body.password, user.salt)

        if (user.password == hash) {
            const token = jwtFunctions.sign(user.username, secret);
            res.cookie('authorization', token, { expires: new Date(Date.now() + (1000 * 60 * 60)) });
            console.debug("Successfull login: Redirecting to radio.")
            res.redirect('/radio');
            return;
        } else {
            console.debug("Unsuccessfull login: Redirecting to login")
            res.redirect('/?msg=Invalid login');
            return;
        }
    })
};