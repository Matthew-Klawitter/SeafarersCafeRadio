const path = require('path');

class RadioController{
    home(req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/radio/radio.html'))
    }

    stream(req, res, radio){
        // TODO: we need to keep track of the responseSink with a unique id to remove it on disconnect
        const responseSink = radio.makeResponseSink();
        res.type('audio/mpeg');
        responseSink.pipe(res);
    }

    play(){

    }

    pause(){

    }

    setPlaylistQueue(){

    }

    getPlaylistQueue(){

    }

    clearPlaylistQueue(){

    }

    setNextSong(){

    }

    setQueueIndex(){

    }

    playSong(){

    }

    playNext(){

    }

    playPrevious(){

    }

    getNextSong(){

    }

    getPreviousSong(){

    }
}

module.exports = function(app, db, radio){
    var radioController = new RadioController();

    // Radio Controller routes
    app.get('/radio', function (req, res){
        radioController.home(req, res);
    });
    app.get('/radio/stream', function (req, res){
        radioController.stream(req, res, radio);
    });

    return radioController;
};