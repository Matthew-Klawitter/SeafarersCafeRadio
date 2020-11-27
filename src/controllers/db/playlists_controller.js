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
                console.log("Unable to POST playlist: Playlist already exists");
                res.redirect('/admin/playlists?msg=Playlist already exists.')
                return;
            }

            // This playlist doesn't exist, we can safely create one
            await db.Playlist.create(req.body);
            console.log("Succesfully POST playlist: " + req.body.name);
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
                    console.log("Sent GET playlist: " + req.params.id);
                    return;
                }
                else {
                    res.sendStatus(404);
                    console.log("Unable to GET playlist: Playlist does not exist.");
                    return;
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
                    console.log("Successfully PUT playlist: " + req.params.id);
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
                    console.log("Successfully DELETE playlist: " + req.params.id);
                }

                res.redirect('/admin/playlists');
            } catch (e){
                res.status(400).send(e.message);
            }
        });
}