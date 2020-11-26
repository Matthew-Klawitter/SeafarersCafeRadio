const path = require('path');

/**
 * CRUD Moods
 */
module.exports = function(app, db){
    app.route('/db/mood/:id')
        .get(async (req, res) => {
            try {
                let mood = await db.Mood.findOne({where: {id: req.params.id}});

                if (mood != null){
                    res.send(mood);
                }
                else {
                    res.sendStatus(404);
                }
            } catch (e){
                res.status(400).send(e.message);
            }
        })
        .post(async (req, res) => {
            try {
                const moodExists = await db.Mood.findOne({where: {name: req.body.name}});

                if (moodExists != null && moodExists){
                    // This mood already exists. No need to insert another entry
                    res.redirect('/admin/moods?msg=Mood is already exists.')
                    return;
                }

                // This mood doesn't exist, we can safely create one
                await db.Mood.create(req.body);
                res.redirect('/admin/moods');
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
                    await mood.destroy();
                }

                res.redirect('/admin/moods');
            } catch (e){
                res.status(400).send(e.message);
            }
        });
}