/**
 * CRUD Playlist
 */
module.exports = function(app, db){
    app.post('/db/playlist/create', async (req, res) => {
        try {
            const playlistExists = await db.Playlist.findOne({where: {name: req.body.name}});

            if (playlistExists != null && playlistExists){
                // This playlist already exists. No need to insert another entry
                console.log("Unable to POST playlist: Playlist already exists");
                res.redirect('/admin/playlists?msg=Playlist already exists.')
                return;
            }

            // This playlist doesn't exist, we can safely create one
            let new_playlist = {
                name: req.body.name
            };

            let playlist = await db.Playlist.create(new_playlist);
            console.log("Succesfully POST playlist: " + req.body.name);

            try {
                let songs = req.body.songs;

                for (i = 0; i < songs.length; i++){
                    let song = await db.Song.findOne({where: {id: songs[i]}});
                    song = song.get({plain: true});

                    if (song != null){
                        let entry = {
                            playlistId: playlist.id,
                            songId: song.id
                        };

                        await db.PlaylistSongs.create(entry);
                        console.log("Succesfully POST PlaylistSong: " + song.name);
                    }
                    else {
                        console.log("Unable to POST PlaylistSong with id: " + songs[i] + ", no songs have the designated id.");
                    }
                }
            } catch (e){
                res.status(400).send(e.message);
                return;
            }
            res.redirect('/admin/playlists');
        } catch (e){
            res.status(400).send(e.message);
            return;
        }
    });

    app.get('/db/playlist/all', async (req, res) => {
        try {
            let playlists = await db.Playlist.findAll();
            playlists = playlists.map(x => x.get({plain: true}));

            if (playlists != null){
                res.send(playlists);
                console.log('Sent GET all for playlists');
                return;
            }
            else {
                res.sendStatus(404);
                console.log('Unable to send GET all for playlists');
                return;
            }
        } catch (e){
            res.status(400).send(e.message);
        }
    });

    app.get('/db/playlist/:id', async (req, res) => {
        try {
            let playlist = await db.Playlist.findOne({where: {id: req.params.id}});
            playlist = playlist.get({plain: true});

            let playlistSongs = await db.PlaylistSongs.findAll({where: {playlistId: playlist.id}});
            playlistSongs = playlistSongs.map(x => x.get({plain: true}));
            let ids = playlistSongs.map((x) => {return x.songId});

            // for each song id in playlist songs we need to find the associated song id in the songs database.
            let songs = await db.Song.findAll({where: {id: ids}});
            songs = songs.map(x => x.get({plain: true}));

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
    });

    app.post('/db/playlist/update', async (req, res) => {
        try {
            let playlist = await db.Playlist.findOne({where: {id: req.body.id}});

            if (playlist != null){
                playlist.update({
                    name: req.body.name
                })
                playlist.save();

                // Delete all records of PlaylistSongs with this playlist id
                playlist = playlist.get({plain: true});
                let oldSongs = await db.PlaylistSongs.findAll({where: {playlistId: playlist.id}});
                
                for (i = 0; i < oldSongs.length; i++){
                    await oldSongs[i].destroy();
                }

                // Add in all new song records
                try {
                    let songs = req.body.songs;

                    for (i = 0; i < songs.length; i++){
                        let song = await db.Song.findOne({where: {id: songs[i]}});
                        song = song.get({plain: true});
        
                        if (song != null){
                            let entry = {
                                playlistId: playlist.id,
                                songId: song.id
                            }
            
                            await db.PlaylistSongs.create(entry);
                            console.log("Succesfully POST PlaylistSong: " + song.name);
                        }
                        else {
                            console.log("Unable to POST PlaylistSong with id: " + songs[i] + ", no songs have the designated id.");
                        }
                    }
                } catch (e){
                    res.status(400).send(e.message);
                    return;
                }
                console.log("Successfully PUT playlist: " + req.body.id);
            }
            res.redirect('/admin/playlists');
        } catch (e){
            res.status(400).send(e.message);
            return;
        }
    });

    app.post('/db/playlist/delete', async (req, res) => {
        try {
            let playlist = await db.Playlist.findOne({where: {id: req.body.id}})

            if (playlist != null){
                await playlist.destroy();

                // Delete all records of PlaylistSongs with this playlist id
                let songs = await db.PlaylistSongs.findAll({where: {playlistId: playlist.id}});
                                    
                for (i = 0; i < songs.length; i++){
                    await songs[i].destroy();
                }
                console.log("Successfully DELETE playlist: " + req.body.id);
            }
            res.redirect('/admin/playlists');
        } catch (e){
            res.status(400).send(e.message);
        }
    });
}