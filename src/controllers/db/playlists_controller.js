/**
 * CRUD Playlist
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
            let playlist = await db.Playlist.create(req.body);
            console.log("Succesfully POST playlist: " + req.body.name);

            for (i = 0; i < req.body.songs.length; i++){
                let song = await db.Songs.findOne({where: {id: songs[i]}});

                // TODO: This might denote a race condition. Determine its removal before release
                if (song != null){
                    let entry = {
                        playlistId: playlist.id,
                        songId: songs[i]
                    }
    
                    await db.PlaylistSongs.create(entry);
                    console.log("Succesfully POST PlaylistSong: " + songs[i]);
                }
                else {
                    console.log("Unable to POST PlaylistSong with id: " + songs[i] + ", no songs have the designated id.");
                }
            }
            
            res.redirect('/admin/playlists');
        } catch (e){
            res.status(400).send(e.message);
        }
    })

    app.route('/db/playlist/:id')
        .get(async (req, res) => {
            try {
                let playlist = await db.Playlist.findOne({where: {id: req.params.id}});
                let playlistsongs = await db.PlaylistSongs.findAll({where: {playlistId: playlist.id}});
                // for each song id in playlist songs we need to find the associated song id in the songs database.
                let songs = await db.Songs.findAll({where: {id: playlistsongs.map((r) => {
                    return r.id;
                })}})

                if (playlist != null){
                    res.send({
                        playlist: playlist,
                        songs: songs
                    });
                    console.log("Sent GET {playlist, songs}: " + req.params.id);
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
                let playlist = await db.Playlist.findOne({where: {id: req.params.id}});

                if (playlist != null){
                    playlist.name = res.body.name;
                    playlist.save();

                    // Delete all records of PlaylistSongs with this playlist id
                    let songs = await db.PlaylistSongs.findAll({where: {playlistId: playlist.id}});
                    
                    for (i = 0; i < songs.length; i++){
                        await songs[i].destroy();
                    }

                    // Add in all new song records
                    // TODO: This might denote a race condition. Determine its removal before release
                    for (i = 0; i < req.body.songs.length; i++){
                        let song = await db.Songs.findOne({where: {id: songs[i]}});
        
                        if (song != null){
                            let entry = {
                                playlistId: playlist.id,
                                songId: songs[i]
                            }
            
                            await db.PlaylistSongs.create(entry);
                            console.log("Succesfully POST PlaylistSong with songId: " + songs[i]);
                        }
                        else {
                            console.log("Unable to POST PlaylistSong with songId: " + songs[i] + ", no songs have the designated id.");
                        }
                    }

                    console.log("Successfully PUT playlist: " + req.params.id);
                }

                res.redirect('/admin/playlists');
            } catch (e){
                res.status(400).send(e.message);
            }
        })
        .delete(async (req, res) => {
            try {
                let playlist = await db.Playlist.findOne({where: {id: req.params.id}})

                if (playlist != null){
                    await playlist.destroy();

                    // Delete all records of PlaylistSongs with this playlist id
                    let songs = await db.PlaylistSongs.findAll({where: {playlistId: playlist.id}});
                                        
                    for (i = 0; i < songs.length; i++){
                        await songs[i].destroy();
                    }

                    console.log("Successfully DELETE playlist: " + req.params.id);
                }

                res.redirect('/admin/playlists');
            } catch (e){
                res.status(400).send(e.message);
            }
        });
}