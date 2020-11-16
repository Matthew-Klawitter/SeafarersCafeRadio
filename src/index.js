const express = require("express");
const app = express();

// For reference http://expressjs.com/en/guide/routing.html https://stackoverflow.com/questions/23396575/node-socket-live-audio-stream-broadcast/26029102#26029102 
// https://stackoverflow.com/questions/9326288/html5-audio-playlist-how-to-play-a-second-audio-file-after-the-first-has-ended https://stackoverflow.com/questions/44918470/how-to-use-webp-image-format-in-html
// https://blog.logrocket.com/online-radio-server-pure-node-js/

// Load/prompt for configuration - secrets, port, etc.
// Connect with sqlite model

// Auth system - token - see https://developer.okta.com/blog/2019/02/14/modern-token-authentication-in-node-with-express and http://www.passportjs.org/docs/
// Pre-validated emails can request an authentication token. Registered users are validated by administrator before allowing site access

// Build media database - updates database with entries and paths to media files found within a specific folder, configures a list containing media info for streaming
// Setup audio streams streams - establishes what audio is playing, streaming chunks, syncing clients, and background images
// Configure routes - route routes for data, auth, access, etc.



app.listen(port);