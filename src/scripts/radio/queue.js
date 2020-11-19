class RadioQueue {
    constructor(params){
        this.queue = []; // Contains a list of Song objects
    }

    addSong(song){
        if (song.bitrate != null){
            this.queue.push(song);
            return true;
        }
        return false;
    }

    rmSong(song){
        let index = this.queue.indexOf(song);
        if (index > -1){
            this.queue.splice(index, 1);
        }
    }

    rmSong(index){
        if (index > -1){
            this.queue.splice(index, 1);
        }
    }
}