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
const indexController = require(__dirname + '/controller/index/index_controller.js');
const radioController = require(__dirname + '/controller/radio/radio_controller.js');

// https://stackoverflow.com/questions/44918470/how-to-use-webp-image-format-in-html

// Load/prompt for configuration - secrets, port, etc.

// Build media database - updates database with entries and paths to media files found within a specific folder, configures a list containing media info for streaming
// Setup audio streams streams - establishes what audio is playing, streaming chunks, syncing clients, and background images
// Configure routes - route routes for data, auth, access, etc.



// Index Controller routes
app.get('/home', function(req, res){
    indexController.home(req, res);
})
app.get('/home/register', function(req, res){
    indexController.register(req, res);
})

// Radio Controller routes
app.get('/radio', function (req, res){
    // TODO: Authenticate login before routing
    radioController.home(req, res);
});
app.get('/radio/stream', function (req, res){
    // TODO: Authenticate login before routing
    radioController.stream(req, res, radio);
});

// app.route('/book')
//   .get(function (req, res) {
//     res.send('Get a random book')
//   })
//   .post(function (req, res) {
//     res.send('Add a book')
//   })
//   .put(function (req, res) {
//     res.send('Update the book')
//   })

// TODO: RM at release. For testing we'll just always stream. At least until we got the database and views implemented.
radio.startStreaming();
server.listen(80);