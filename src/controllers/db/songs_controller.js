const multer = require('multer');
const path = require('path');

const sourcePath = path.join(__dirname, '..', '..', 'uploaded/songs/')

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
        cb(null, file.filename);
    }
})
var upload = multer({ storage: storage, fileFilter: fileFilter });

/**
 * CRUD Songs
 */
module.exports = function(app, db){
    app.post('/db/songs', upload.single('file'), async (req, res) => {
        try {
            const file = req.file;

            if (!file || !file.mimetype.startsWith('audio/mpeg')) {
                // A file was not uploaded or is not an image
                console.log('Unable to POST song: No file uploaded.');
                res.status(400).send('Please upload an MP3 file.')
                return;
            }

            const songExists = await db.Song.findOne({where: {filename: filename}});

            if (songExists != null && songExists){
                // This song has already been uploaded. No need to insert another entry
                console.log('Unable to POST song: Song already exists.');
                res.redirect('/admin/songs?msg=Song already exists.')
                return;
            }

            // This song doesn't yet exist, we can safely create one
            let song = {
                title: req.body.title,
                filename: file.filename,
                path: sourcePath + file.filename,
                artist: req.body.artist,
                source: req.body.source,
                moodId: req.body.moodId
            };

            await db.Song.create(song);
            console.log('Successfully POST song: ' + file.filename);
            res.redirect('/admin/songs');
        } catch (e){
            res.status(400).send(e.message);
        }
    });

    app.route('/db/songs/:id')
        .get(async (req, res) => {
            try {
                let song = await db.Song.findOne({where: {id: req.params.id}});

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
        })
        .put(async (req, res) => {
            try {
                let song = await db.Song.findOne({where: {id: req.params.id}});

                if (song != null){
                    // TODO: For baseline release, we're not going to worry about the ability
                    // to change filename and source. We'll need to work heavily with the multer
                    // for support. Current workaround is deleting a song and reuploading it.
                    song.title = req.body.title;
                    song.artist = req.body.artist;
                    song.source = req.body.source;
                    song.moodId = req.body.moodId;
                    song.save();
                    console.log('Successfully PUT song: ' + req.params.id);
                }

                res.redirect('/admin/songs');
            } catch (e){
                res.status(400).send(e.message);
            }
        })
        .delete(async (req, res) => {
            try {
                let song = await db.Song.findOne({where: {id: req.params.id}})

                if (song != null){
                    await song.destroy();
                    console.log('successfully DELETE song: ' + req.params.id);
                }

                res.redirect('/admin/songs');
            } catch (e){
                res.status(400).send(e.message);
            }
        });
}