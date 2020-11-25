const path = require('path');

module.exports = function(app, db){
    // Admin Home Controller routes
    app.get('/admin', function (req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/admin.html'))
    });

    // Admin Controller accounts routes
    app.get('/admin/accounts', function (req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/accounts/accounts.html'))
    });
    app.get('/admin/accounts/create', function (req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/accounts/create.html'))
    });
    app.get('/admin/accounts/read/:id', function (req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/accounts/read.html'))
    });
    app.get('/admin/accounts/update/:id', function (req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/accounts/update.html'))
    });
    app.get('/admin/accounts/delete/:id', function (req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/accounts/delete.html'))
    });

    // Admin Controller authorized routes
    app.get('/admin/authorized', function (req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/authorized/authorized.html'))
    });
    app.get('/admin/authorized/create', function (req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/authorized/create.html'))
    });
    app.get('/admin/authorized/read/:id', function (req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/authorized/read.html'))
    });
    app.get('/admin/authorized/update/:id', function (req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/authorized/update.html'))
    });
    app.get('/admin/authorized/delete/:id', function (req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/authorized/delete.html'))
    });

    // Admin Controller backgrounds routes
    app.get('/admin/backgrounds', function (req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/backgrounds/backgrounds.html'))
    });
    app.get('/admin/backgrounds/create', function (req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/backgrounds/create.html'))
    });
    app.get('/admin/backgrounds/read/:id', function (req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/backgrounds/read.html'))
    });
    app.get('/admin/backgrounds/update/:id', function (req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/backgrounds/update.html'))
    });
    app.get('/admin/backgrounds/delete/:id', function (req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/backgrounds/delete.html'))
    });

    // Admin Controller moods routes
    app.get('/admin/moods', function (req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/moods/moods.html'))
    });
    app.get('/admin/moods/create', function (req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/moods/create.html'))
    });
    app.get('/admin/moods/read/:id', function (req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/moods/read.html'))
    });
    app.get('/admin/moods/update/:id', function (req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/moods/update.html'))
    });
    app.get('/admin/moods/delete/:id', function (req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/moods/delete.html'))
    });

    // Admin Controller playlists routes
    app.get('/admin/playlists', function (req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/playlists/playlists.html'))
    });
    app.get('/admin/playlists/create', function (req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/playlists/create.html'))
    });
    app.get('/admin/playlists/read/:id', function (req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/playlists/read.html'))
    });
    app.get('/admin/playlists/update/:id', function (req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/playlists/update.html'))
    });
    app.get('/admin/playlists/delete/:id', function (req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/playlists/delete.html'))
    });

    // Admin Controller songs routes
    app.get('/admin/songs', function (req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/songs/songs.html'))
    });
    app.get('/admin/songs/create', function (req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/songs/create.html'))
    });
    app.get('/admin/songs/read/:id', function (req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/songs/read.html'))
    });
    app.get('/admin/songs/update/:id', function (req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/songs/update.html'))
    });
    app.get('/admin/songs/delete/:id', function (req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/songs/delete.html'))
    });
};