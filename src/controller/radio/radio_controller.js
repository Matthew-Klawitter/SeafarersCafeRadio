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
}

module.exports = new RadioController();