// ORM Manager
const db = require('./models/index.js');

// Radio manager
const radio = require('./scripts/radio/radio.js');

// Server/router
const express = require("express");
const song = require('./models/song.js');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// Routing controllers
const indexController = require(__dirname + '/controllers/index/index_controller.js');
indexController(app, db);
const radioController = require(__dirname + '/controllers/radio/radio_controller.js');
radioController(app, db, radio);
const adminController = require(__dirname + '/controllers/admin/admin_controller.js')
adminController(app, db);

// Routing data
const accountsController = require(__dirname + '/controllers/db/accounts_controller.js');
accountsController(app, db);
const authorizedController = require(__dirname + '/controllers/db/authorized_controller.js');
authorizedController(app, db);
const backgroundsController = require(__dirname + '/controllers/db/background_controller.js');
backgroundsController(app, db);
const moodController = require(__dirname + '/controllers/db/moods_controller.js');
moodController(app, db);
const playlistsController = require(__dirname + '/controllers/db/playlists_controller.js');
playlistsController(app, db);
const songController = require(__dirname + '/controllers/db/songs_controller.js');
songController(app, db);


// TODO: Build media database - updates database with entries and paths to media files found within a specific folder, configures a list containing media info for streaming
// TODO: Setup audio streams streams - establishes what audio is playing, streaming chunks, syncing clients, and background images
// TODO: Configure routes - route routes for data, auth, access, etc.

// if (req.path.toLowerCase().startsWith("/admin")) {
//     let cookie = req.cookies.authorization
//     if (!cookie) {
//         console.debug("Redirecting to login - no cookie")
//         res.redirect('/login');
//         return;
//     }
//     try {
//         const decryptedUserId = jwtFunctions.verify(cookie);
//         models.users.findOne({ where: { username: decryptedUserId } }).then((user, error) => {
//             if (user) {
//                 res.locals.user = user.get({ plain: true });
//             } else {
//                 console.debug("Redirecting to login - invalid cookie")
//                 res.redirect('/login');
//                 return;
//             }
//         });
//     } catch (e) {
//         res.status(400).send(e.message);
//     }
// }
// next();

/**
 * Ensure only authenticated users can access data sensitive routes
 */
app.use(function (req, res, next) {
    if (req.path.toLowerCase().startsWith('/radio')){
        // ensure we get a valid login cookie, else return to login screen
    }
    else if (req.path.toLowerCase().startsWith('/admin') || req.path.toLowerCase().startsWith('/db')){
        // ensure we get a valid login cookie with an account who's role is set to admin
    }
    next();
});

// TODO: RM at release. For testing we'll just always stream. At least until we got the database and views implemented.
radio.startStreaming();
server.listen(80);