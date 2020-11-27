const path = require('path');

/**
 * CRUD Playlist
 * TODO: Implement song m:m associations. We need to add a migration for fk's since sequelize won't auto do it
 */
module.exports = function(app, db){
    app.post('/db/playlist', async (req, res) => {
        try {
            const playlistExists = await db.Playlist.findOne({where: {name: req.body.name}});

            if (playlistExists != null && playlistExists){
                // This playlist already exists. No need to insert another entry
                res.redirect('/admin/playlists?msg=Playlist already exists.')
                return;
            }

            // This playlist doesn't exist, we can safely create one
            await db.Playlist.create(req.body);
            res.redirect('/admin/playlists');
        } catch (e){
            res.status(400).send(e.message);
        }
    })

    app.route('/db/playlist/:id')
        .get(async (req, res) => {
            try {
                let playlist = await db.Playlist.findOne({where: {id: req.params.id}});

                if (playlist != null){
                    res.send(playlist);
                }
                else {
                    res.sendStatus(404);
                }
            } catch (e){
                res.status(400).send(e.message);
            }
        })
        .put(async (req, res) => {
            try {
                let playlist = await db.Playlist.find({where: {id: req.params.id}});

                if (playlist != null){
                    playlist.name = res.body.name;
                    playlist.save();
                }

                res.redirect('/admin/playlists');
            } catch (e){
                res.status(400).send(e.message);
            }
        })
        .delete(async (req, res) => {
            try {
                let playlist = await db.Playlist.find({where: {id: req.params.id}})

                if (playlist != null){
                    await playlist.destroy();
                }

                res.redirect('/admin/playlists');
            } catch (e){
                res.status(400).send(e.message);
            }
        });
}