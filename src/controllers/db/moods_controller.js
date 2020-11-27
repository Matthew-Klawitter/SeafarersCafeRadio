/**
 * CRUD Moods
 */
module.exports = function(app, db){
    app.post('/db/mood', async (req, res) => {
        try {
            const moodExists = await db.Mood.findOne({where: {name: req.body.name}});

            if (moodExists != null && moodExists){
                // This mood already exists. No need to insert another entry
                res.redirect('/admin/moods?msg=Mood is already exists.')
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
    })

    app.route('/db/mood/:id')
        .get(async (req, res) => {
            try {
                let mood = await db.Mood.findOne({where: {id: req.params.id}});

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
        })
        .put(async (req, res) => {
            try {
                let moodName = await db.Mood.find({where: {id: req.params.id}});

                if (moodName != null){
                    moodName.name = res.body.name;
                    moodName.save();
                    console.log('Successfully PUT mood: ' + req.params.id);
                }

                res.redirect('/admin/moods');
            } catch (e){
                res.status(400).send(e.message);
            }
        })
        .delete(async (req, res) => {
            try {
                let mood = await db.Mood.find({where: {id: req.params.id}})

                if (mood != null){
                    if (mood.name != "none"){
                        await mood.destroy();
                        console.log('Successfully DELETE mood: ' + req.params.id);
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