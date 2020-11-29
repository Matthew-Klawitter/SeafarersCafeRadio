const multer = require('multer');
const path = require('path');

const sourcePath = path.join(__dirname, '..', '..', 'uploaded/backgrounds/')
const relativePath = '/uploaded/backgrounds/';

const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')){
        cb(null, true);
    }
    else {
        cb('Please only upload images.', false);
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
var upload = multer({ storage: storage, fileFilter: imageFilter });

/**
 * CRUD Backgrounds
 */
module.exports = function(app, db){
    app.post('/db/backgrounds', upload.single('file'), async (req, res) => {
        try {
            const file = req.file;

            if (!file || !file.mimetype.startsWith('image')) {
                // A file was not uploaded or is not an image
                console.log('Unable to POST background: No file uploaded.');
                res.status(400).send('Please upload an image file.')
                return;
            }

            const backgroundExists = await db.Background.findOne({where: {filename: filename}});

            if (backgroundExists != null && backgroundExists){
                // This background has already been uploaded. No need to insert another entry
                console.log('Unable to POST background: Background already exists.');
                res.redirect('/admin/backgrounds?msg=Background already exists.')
                return;
            }

            // This background doesn't yet exist, we can safely create one
            let background = {
                filename: file.filename,
                path: relativePath + file.filename,
                author: req.body.author,
                source: req.body.source,
                moodId: req.body.moodId
            };

            await db.Background.create(background);
            console.log('Successfully POST background: ' + file.filename);
            res.redirect('/admin/backgrounds');
        } catch (e){
            res.status(400).send(e.message);
        }
    });

    app.route('/db/backgrounds/:id')
        .get(async (req, res) => {
            try {
                let background = await db.Background.findOne({where: {id: req.params.id}});

                if (background != null){
                    res.send(background);
                    console.log('Sent GET for background: ' + req.params.id);
                    return;
                }
                else {
                    res.sendStatus(404);
                    console.log('Unable to send GET for background: Background does not exist.');
                    return;
                }
            } catch (e){
                res.status(400).send(e.message);
            }
        })
        .put(async (req, res) => {
            try {
                let background = await db.Background.findOne({where: {id: req.params.id}});

                if (background != null){
                    // TODO: For baseline release, we're not going to worry about the ability
                    // to change filename and source. We'll need to work heavily with the multer
                    // for support. Current workaround is deleting a background and reuploading it.
                    background.author = req.body.author;
                    background.source = req.body.source;
                    background.moodId = req.body.moodId;
                    background.save();
                    console.log('Successfully PUT background: ' + req.params.id);
                }

                res.redirect('/admin/backgrounds');
            } catch (e){
                res.status(400).send(e.message);
            }
        })
        .delete(async (req, res) => {
            try {
                let background = await db.Background.findOne({where: {id: req.params.id}})

                if (background != null){
                    await background.destroy();
                    console.log('successfully DELETE background: ' + req.params.id);
                }

                res.redirect('/admin/backgrounds');
            } catch (e){
                res.status(400).send(e.message);
            }
        });
}