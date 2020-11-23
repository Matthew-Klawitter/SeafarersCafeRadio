// ORM Manager
const db = require('./models/index.js');

// Radio manager
const radio = require('./scripts/radio/radio.js');

// Server/router
const express = require("express");
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// Routing controllers
const indexController = require(__dirname + '/controllers/index/index_controller.js');
const radioController = require(__dirname + '/controllers/radio/radio_controller.js');
const adminController = require(__dirname + '/controllers/admin/admin_controller.js')

{/* <picture>
  <source srcset="img.webp" type="image/webp">
  <source srcset="img.jpg" type="image/jpeg"> 
  <img src="img.jpg">
</picture> */}


// TODO: Load/prompt for configuration - secrets, port, etc.

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

app.use(function (req, res, next) {
    if (req.path.toLowerCase().startsWith('/radio')){
        // ensure we get a valid login cookie, else return to login screen
    }
    if (req.path.toLowerCase().startsWith('/admin')){
        // ensure we get a valid login cookie with an account who's role is set to admin
    }
});


// Index Controller routes
app.get('/home', function(req, res){
    indexController.home(req, res);
})
app.get('/home/register', function(req, res){
    indexController.register(req, res);
})

// Radio Controller routes
app.get('/radio', function (req, res){
    radioController.home(req, res);
});
app.get('/radio/stream', function (req, res){
    radioController.stream(req, res, radio);
});

// Admin Controller routes
app.get('/admin', function (req, res){
    adminController.home(req, res);
});

// Admin Controller accounts routes
app.get('/admin/accounts', function (req, res){
    adminController.accountsHome(req, res);
});
app.get('/admin/accounts/create', function (req, res){
    adminController.createAccountsView(req, res);
});
app.get('/admin/accounts/read', function (req, res){
    adminController.readAccountsView(req, res);
});
app.get('/admin/accounts/update', function (req, res){
    adminController.updateAccountsView(req, res);
});
app.get('/admin/accounts/delete', function (req, res){
    adminController.deleteAccountsView(req, res);
});

// Admin Controller authorized routes
app.get('/admin/authorized', function (req, res){
    adminController.authorizedHome(req, res);
});
app.get('/admin/authorized/create', function (req, res){
    adminController.createAuthorizedView(req, res);
});
app.get('/admin/authorized/read', function (req, res){
    adminController.readAuthorizedView(req, res);
});
app.get('/admin/authorized/update', function (req, res){
    adminController.updateAuthorizedView(req, res);
});
app.get('/admin/authorized/delete', function (req, res){
    adminController.deleteAuthorizedView(req, res);
});

// Admin Controller backgrounds routes
app.get('/admin/backgrounds', function (req, res){
    adminController.backgroundsHome(req, res);
});
app.get('/admin/backgrounds/create', function (req, res){
    adminController.createBackgroundsView(req, res);
});
app.get('/admin/backgrounds/read', function (req, res){
    adminController.readBackgroundsView(req, res);
});
app.get('/admin/backgrounds/update', function (req, res){
    adminController.updateBackgroundsView(req, res);
});
app.get('/admin/backgrounds/delete', function (req, res){
    adminController.deleteBackgroundsView(req, res);
});

// Admin Controller moods routes
app.get('/admin/moods', function (req, res){
    adminController.moodsHome(req, res);
});
app.get('/admin/moods/create', function (req, res){
    adminController.createMoodsView(req, res);
});
app.get('/admin/moods/read', function (req, res){
    adminController.readMoodsView(req, res);
});
app.get('/admin/moods/update', function (req, res){
    adminController.updateMoodsView(req, res);
});
app.get('/admin/moods/delete', function (req, res){
    adminController.deleteMoodsView(req, res);
});

// Admin Controller playlists routes
app.get('/admin/playlists', function (req, res){
    adminController.playlistsHome(req, res);
});
app.get('/admin/playlists/create', function (req, res){
    adminController.createPlaylistsView(req, res);
});
app.get('/admin/playlists/read', function (req, res){
    adminController.readPlaylistsView(req, res);
});
app.get('/admin/playlists/update', function (req, res){
    adminController.updatePlaylistsView(req, res);
});
app.get('/admin/playlists/delete', function (req, res){
    adminController.deletePlaylistsView(req, res);
});

// Admin Controller songs routes
app.get('/admin/songs', function (req, res){
    adminController.songsHome(req, res);
});
app.get('/admin/songs/create', function (req, res){
    adminController.createSongsView(req, res);
});
app.get('/admin/songs/read', function (req, res){
    adminController.readSongsView(req, res);
});
app.get('/admin/songs/update', function (req, res){
    adminController.updateSongsView(req, res);
});
app.get('/admin/songs/delete', function (req, res){
    adminController.deleteSongsView(req, res);
});


// TODO: RM at release. For testing we'll just always stream. At least until we got the database and views implemented.
radio.startStreaming();
server.listen(80);