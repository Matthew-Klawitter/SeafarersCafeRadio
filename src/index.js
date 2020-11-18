const Radio = require('./scripts/radio/radio.js');
const radio = new Radio();

const express = require("express");
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

// https://stackoverflow.com/questions/44918470/how-to-use-webp-image-format-in-html

// Load/prompt for configuration - secrets, port, etc.
// Connect with sqlite model

// Auth system - token - see https://developer.okta.com/blog/2019/02/14/modern-token-authentication-in-node-with-express and http://www.passportjs.org/docs/
// Pre-validated emails can request an authentication token. Registered users are validated by administrator before allowing site access

// Build media database - updates database with entries and paths to media files found within a specific folder, configures a list containing media info for streaming
// Setup audio streams streams - establishes what audio is playing, streaming chunks, syncing clients, and background images
// Configure routes - route routes for data, auth, access, etc.

app.get('/stream', function (req, res){
    const responseSink = radio.makeResponseSink();
    res.type('audio/mpeg');
    responseSink.pipe(res);
});

app.get('/', function (req, res){
    res.sendFile(__dirname + "/view/index/index.html");
});


radio.startStreaming();
server.listen(80);