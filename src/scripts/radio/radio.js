const fs = require('fs');
const EventEmitter = require('events');
const { PassThrough } = require('stream');
const Throttle = require('throttle');
const mm = require('music-metadata');
const util = require('util');

class Radio {
    constructor(params) {
        this.sinks = []; // Consumes and pipes data to client. Created and appended to list on successful connection. Removed on disconnect
        this.songs = []; // List containing the path of all songs
        this.songs.push(__dirname + "\\test.mp3");
        this.songs.push(__dirname + "\\test2.mp3");
        this.currentSong = null;
        this.stream = new EventEmitter();
    }

    makeResponseSink() {
        const responseSink = new PassThrough();
        this.sinks.push(responseSink);
        return responseSink;
    }

    broadcast(chunk) {
        for (const sink of this.sinks) {
            sink.write(chunk);
        }
    }

    playLoop() {
        if (this.currentSong == null){
            // start with first song in queue
            this.currentSong = this.songs[0];
        }
        else if (this.currentSong == (this.songs[(this.songs.length - 1)])){
            // after finishing the queue, go back to the start
            this.currentSong = this.songs[0];
        }
        else {
            // move onto the next song
            let nextSongIndex = this.songs.indexOf(this.currentSong);
            this.currentSong = this.songs[nextSongIndex + 1];
        }

        mm.parseFile(this.currentSong).then( metadata => {
            let bitrate = metadata.format.bitrate;
            console.log(metadata.format.trackInfo.name);
            console.log(bitrate);

            const songReadable = fs.createReadStream(this.currentSong);
            const throttleTransformable = new Throttle(bitrate / 8);
            throttleTransformable
              .on('data', (chunk) => this.broadcast(chunk))
              .on('end', () => this.playLoop());
    
            songReadable.pipe(throttleTransformable);
        })
        .catch( err => {
          console.error(err.message);
        });
    }

    startStreaming() {
        this.playLoop();
    }
}

module.exports = Radio;