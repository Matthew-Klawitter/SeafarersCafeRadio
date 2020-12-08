/**
 * CRUD Moods
 */
module.exports = function(app, db){
    app.post('/db/mood/create', async (req, res) => {
        try {
            const moodExists = await db.Mood.findOne({where: {name: req.body.name}});

            if (moodExists != null && moodExists){
                // This mood already exists. No need to insert another entry
                res.redirect('/admin/moods?msg=Mood already exists.')
                console.log('Unable to POST mood: Mood already exists');
                return;
            }

            // This mood doesn't exist, we can safely create one
            await db.Mood.create(req.body);
            console.log('Successfully POST mood: ' + req.body.name);
            res.redirect('/admin/moods');
        } catch (e){
            res.status(400).send(e.message);
        }
    });

    app.get('/db/moods/all', async (req, res) => {
        try {
            let moods = await db.Mood.findAll();
            moods = moods.map(x => x.get({plain: true}));

            if (moods != null){
                res.send(moods);
                console.log('Sent GET all for moods');
                return;
            }
            else {
                res.sendStatus(404);
                console.log('Unable to send GET all for moods');
                return;
            }
        } catch (e){
            res.status(400).send(e.message);
        }
    });

    app.get('/db/moods/:id', async (req, res) => {
        try {
            let mood = await db.Mood.findOne({where: {id: req.params.id}});
            mood = mood.get({plain: true});

            if (mood != null){
                res.send(mood);
                console.log('Sent GET for mood: ' + req.params.id);
                return;
            }
            else {
                res.sendStatus(404);
                console.log('Unable to send GET for mood: Mood does not exist.');
                return;
            }
        } catch (e){
            res.status(400).send(e.message);
        }
    });

    app.post('/db/moods/update', async (req, res) => {
        try {
            let mood = await db.Mood.findOne({where: {id: req.body.id}});

            if (mood != null){
                mood.update({
                    name: res.body.name
                });
                moodName.save();
                console.log('Successfully PUT mood: ' + req.body.id);
            }

            res.redirect('/admin/moods');
        } catch (e){
            res.status(400).send(e.message);
        }
    });

    app.post('/db/moods/delete', async (req, res) => {
        try {
            let mood = await db.Mood.findOne({where: {id: req.body.id}})

            if (mood != null){
                if (mood.get({plain: true}).name != "none"){
                    await mood.destroy();
                    console.log('Successfully DELETE mood: ' + req.body.id);
                }else {
                    console.log("Cannot delete default 'none' mood.");
                }
            }

            res.redirect('/admin/moods');
        } catch (e){
            res.status(400).send(e.message);
        }
    });
}