const fs = require('fs');
const multer = require('multer');
const path = require('path');

const sourcePath = path.join(__dirname, '..', '..', 'uploaded/backgrounds/')
const relativePath = '/uploaded/backgrounds/';

console.log(sourcePath);

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
        cb(null, file.originalname);
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

            const backgroundExists = await db.Background.findOne({where: {filename: file.originalname}});

            if (backgroundExists != null && backgroundExists){
                // This background has already been uploaded. No need to insert another entry
                console.log('Unable to POST background: Background already exists.');
                res.redirect('/admin/backgrounds?msg=Background already exists.')
                return;
            }

            // This background doesn't yet exist, we can safely create one
            let background = {
                filename: file.originalname,
                path: relativePath + file.originalname,
                author: req.body.author,
                source: req.body.source,
                moodId: req.body.mood[0]
            };

            await db.Background.create(background);
            console.log('Successfully POST background: ' + file.originalname);
            res.redirect('/admin/backgrounds');
        } catch (e){
            res.status(400).send(e.message);
        }
    });

    app.get('/db/backgrounds/all', async (req, res) => {
        try {
            let backgrounds = await db.Background.findAll();
            backgrounds = backgrounds.map(x => x.get({plain: true}));

            if (backgrounds != null){
                res.send(backgrounds);
                console.log('Sent GET all for backgrounds');
                return;
            }
            else {
                res.sendStatus(404);
                console.log('Unable to send GET all for backgrounds');
                return;
            }
        } catch (e){
            res.status(400).send(e.message);
        }
    });

    app.route('/db/backgrounds/:id')
        .get(async (req, res) => {
            try {
                let background = await db.Background.findOne({where: {id: req.params.id}}).get({plain: true});

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
                    background.update({
                        author: req.body.author,
                        source: req.body.source,
                        moodId: req.body.mood[0]
                    });
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
                    fs.unlink(sourcePath + background.get({plain: true}).filename, (err) =>{
                        if (err) {
                            console.error(err);
                            return;
                        }
                    });
                    console.log('successfully DELETE background: ' + req.params.id);
                }

                res.redirect('/admin/backgrounds');
            } catch (e){
                res.status(400).send(e.message);
            }
        });
}