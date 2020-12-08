const multer = require('multer');
const path = require('path');

const sourcePath = path.join(__dirname, '..', '..', 'uploaded/songs/')
const relativePath = '/uploaded/songs/';

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('audio/mpeg')){
        cb(null, true);
    }
    else {
        cb('Please only upload mp3 files.', false);
    }
}

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, sourcePath);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})
var upload = multer({ storage: storage, fileFilter: fileFilter });

/**
 * CRUD Songs
 */
module.exports = function(app, db){
    app.post('/db/songs/create', upload.single('file'), async (req, res) => {
        try {
            const file = req.file;

            if (!file || !file.mimetype.startsWith('audio/mpeg')) {
                // A file was not uploaded or is not an image
                console.log('Unable to POST song: No file uploaded.');
                res.status(400).send('Please upload an MP3 file.')
                return;
            }

            const songExists = await db.Song.findOne({where: {filename: file.originalname}});

            if (songExists != null && songExists){
                // This song has already been uploaded. No need to insert another entry
                console.log('Unable to POST song: Song already exists.');
                res.redirect('/admin/songs?msg=Song already exists.')
                return;
            }

            // This song doesn't yet exist, we can safely create one
            let song = {
                title: req.body.title,
                filename: file.originalname,
                path: relativePath + file.originalname,
                artist: req.body.artist,
                source: req.body.source,
                moodId: req.body.mood[0]
            };

            await db.Song.create(song);
            console.log('Successfully POST song: ' + file.originalname);
            res.redirect('/admin/songs');
        } catch (e){
            res.status(400).send(e.message);
        }
    });

    app.get('/db/songs/all', async (req, res) => {
        try {
            let songs = await db.Song.findAll();
            songs = songs.map(x => x.get({plain: true}));

            if (songs != null){
                res.send(songs);
                console.log('Sent GET all for songs');
                return;
            }
            else {
                res.sendStatus(404);
                console.log('Unable to send GET all for songs');
                return;
            }
        } catch (e){
            res.status(400).send(e.message);
        }
    });

    app.get('/db/songs/:id', async (req, res) => {
        try {
            let song = await db.Song.findOne({where: {id: req.params.id}}).get({plain: true});

            if (song != null){
                res.send(song);
                console.log('Sent GET for song: ' + req.params.id);
                return;
            }
            else {
                res.sendStatus(404);
                console.log('Unable to send GET for song: Song does not exist.');
                return;
            }
        } catch (e){
            res.status(400).send(e.message);
        }
    });

    app.post('/db/songs/update', async (req, res) => {
        try {
            let song = await db.Song.findOne({where: {id: req.body.id}});

            if (song != null){
                // TODO: For baseline release, we're not going to worry about the ability
                // to change filename and source. We'll need to work heavily with the multer
                // for support. Current workaround is deleting a song and reuploading it.
                song.update({
                    title: req.body.title,
                    artist: req.body.artist,
                    source: req.body.source,
                    moodId: req.body.mood[0]
                });
                song.save();
                console.log('Successfully PUT song: ' + req.body.id);
            }

            res.redirect('/admin/songs');
        } catch (e){
            res.status(400).send(e.message);
        }
    });

    app.post('/db/songs/delete', async (req, res) => {
        try {
            let song = await db.Song.findOne({where: {id: req.body.id}})

            if (song != null){
                // Delete the existing song record
                await song.destroy();

                // Delete all records in PlaylistSongs with this song id
                let id = song.get({plain: true}).id;
                let songs = await db.PlaylistSongs.findAll({where: {songId: id}});
                                    
                for (i = 0; i < songs.length; i++){
                    await songs[i].destroy();
                }

                // Delete the file from disk
                fs.unlink(sourcePath + song.get({plain: true}).filename, (err) =>{
                    if (err) {
                        console.error(err);
                        return;
                    }
                });

                console.log('successfully DELETE song: ' + req.body.id);
        }

            res.redirect('/admin/songs');
        } catch (e){
            res.status(400).send(e.message);
        }
    });
}