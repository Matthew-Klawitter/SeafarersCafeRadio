// Config
const fs = require('fs');
const path = require('path');
const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config', 'config.json')));
const secret = config.jwtSecret;

if (!secret){
    console.log("Please enter required information into config.json before running the application.")
    process.exit();
}

// ORM Manager
const db = require('./models/index.js');

// Radio manager
const radio = require('./scripts/radio/radio.js');

// Server/router
const express = require("express");
const { Console } = require('console');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// Additional middleware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Auth controller
const authController = require(__dirname + '/controllers/auth/auth_controller.js');
authController(app, db, secret);

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
const backgroundsController = require(__dirname + '/controllers/db/backgrounds_controller.js');
backgroundsController(app, db);
const moodController = require(__dirname + '/controllers/db/moods_controller.js');
moodController(app, db);
const playlistsController = require(__dirname + '/controllers/db/playlists_controller.js');
playlistsController(app, db);
const songController = require(__dirname + '/controllers/db/songs_controller.js');
songController(app, db);

// TODO: Setup audio streams - establishes what audio is playing, streaming chunks, syncing clients, and background images
// TODO: Finish the views

// TODO: RM at release. For testing we'll just always stream. At least until we got the database and views implemented.
radio.startStreaming();
server.listen(80);