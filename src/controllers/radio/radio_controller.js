const path = require('path');

module.exports = function(app, db, radio){
    // Radio Controller routes
    app.get('/radio', function (req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/radio/radio.html'))
    });
    app.get('/radio/stream', function (req, res){
        // TODO: we need to keep track of the responseSink with a unique id to remove it on disconnect
        const responseSink = radio.makeResponseSink();
        res.type('audio/mpeg');
        responseSink.pipe(res);
    });

    // Radio Controls (TODO: much of this will likely be moved to admin)
    app.get('/radio/play', function (req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/radio/radio.html'))
    });
    app.get('/radio/pause', function (req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/radio/radio.html'))
    });
    app.get('/radio/setplaylist', function (req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/radio/radio.html'))
    });
    app.get('/radio/getplaylist', function (req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/radio/radio.html'))
    });
    app.get('/radio/clearplaylist', function (req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/radio/radio.html'))
    });
    app.get('/radio/setnext', function (req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/radio/radio.html'))
    });
    app.get('/radio/setindex', function (req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/radio/radio.html'))
    });
    app.get('/radio/playsong', function (req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/radio/radio.html'))
    });
    app.get('/radio/playnext', function (req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/radio/radio.html'))
    });
    app.get('/radio/playprev', function (req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/radio/radio.html'))
    });
    app.get('/radio/getnext', function (req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/radio/radio.html'))
    });
    app.get('/radio/getprev', function (req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/radio/radio.html'))
    });
};