const path = require('path');

/**
 * 
 */
class AdminController{

    home(req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/admin.html'))
    }

    /**
     * Account views
     */

    accountsHome(req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/accounts/accounts.html'))
    }

    createAccountsView(req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/accounts/create.html'))
    }

    readAccountsView(req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/accounts/read.html'))
    }

    updateAccountsView(req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/accounts/update.html'))
    }

    deleteAccountsView(req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/accounts/delete.html'))
    }

    /**
     * Authorized views
     * (Views routing to pages to create and managed approved email addresses accounts can be created for)
     */

    authorizedHome(req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/authorized/authorized.html'))
    }

    createAuthorizedView(req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/authorized/create.html'))
    }

    readAuthorizedView(req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/authorized/read.html'))
    }

    updateAuthorizedView(req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/authorized/update.html'))
    }

    deleteAuthorizedView(req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/authorized/delete.html'))
    }

    /**
     * Background views
     */

    backgroundsHome(req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/backgrounds/backgrounds.html'))
    }

    createBackgroundsView(req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/backgrounds/create.html'))
    }

    readBackgroundsView(req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/backgrounds/read.html'))
    }

    updateBackgroundsView(req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/backgrounds/update.html'))
    }

    deleteBackgroundsView(req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/backgrounds/delete.html'))
    }

    /**
     * Mood views
     */

    moodsHome(req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/moods/moods.html'))
    }

    createMoodsView(req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/moods/create.html'))
    }

    readMoodsView(req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/moods/read.html'))
    }

    updateMoodsView(req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/moods/update.html'))
    }

    deleteMoodsView(req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/moods/delete.html'))
    }

    /**
     * Playlist views
     */
    playlistsHome(req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/playlists/playlists.html'))
    }

    createPlaylistView(req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/playlists/create.html'))
    }

    readPlaylistsView(req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/playlists/read.html'))
    }

    updatePlaylistView(req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/playlists/update.html'))
    }

    deletePlaylistView(req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/playlists/delete.html'))
    }

    /**
     * Song views
     */
    songsHome(req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/songs/songs.html'))
    }

    createSongsView(req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/songs/create.html'))
    }

    readSongsView(req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/songs/read.html'))
    }

    updateSongsView(req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/songs/update.html'))
    }

    deleteSongsView(req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/admin/songs/delete.html'))
    }
}

module.exports = function(app, db){
    var adminController = new AdminController();

    // Admin Home Controller routes
    app.get('/admin', function (req, res){
        adminController.home(req, res);
    });

    // Admin Controller accounts routes
    app.get('/admin/accounts', function (req, res){
        adminController.accountsHome(req, res);
    });
    app.get('/admin/accounts/create', function (req, res){
        adminController.createAccountsView(req, res);
    });
    app.get('/admin/accounts/read/:id', function (req, res){
        //TODO: Note, access id's via req.params.id
        adminController.readAccountsView(req, res);
    });
    app.get('/admin/accounts/update/:id', function (req, res){
        adminController.updateAccountsView(req, res);
    });
    app.get('/admin/accounts/delete/:id', function (req, res){
        adminController.deleteAccountsView(req, res);
    });

    // Admin Controller authorized routes
    app.get('/admin/authorized', function (req, res){
        adminController.authorizedHome(req, res);
    });
    app.get('/admin/authorized/create', function (req, res){
        adminController.createAuthorizedView(req, res);
    });
    app.get('/admin/authorized/read/:id', function (req, res){
        adminController.readAuthorizedView(req, res);
    });
    app.get('/admin/authorized/update/:id', function (req, res){
        adminController.updateAuthorizedView(req, res);
    });
    app.get('/admin/authorized/delete/:id', function (req, res){
        adminController.deleteAuthorizedView(req, res);
    });

    // Admin Controller backgrounds routes
    app.get('/admin/backgrounds', function (req, res){
        adminController.backgroundsHome(req, res);
    });
    app.get('/admin/backgrounds/create', function (req, res){
        adminController.createBackgroundsView(req, res);
    });
    app.get('/admin/backgrounds/read/:id', function (req, res){
        adminController.readBackgroundsView(req, res);
    });
    app.get('/admin/backgrounds/update/:id', function (req, res){
        adminController.updateBackgroundsView(req, res);
    });
    app.get('/admin/backgrounds/delete/:id', function (req, res){
        adminController.deleteBackgroundsView(req, res);
    });

    // Admin Controller moods routes
    app.get('/admin/moods', function (req, res){
        adminController.moodsHome(req, res);
    });
    app.get('/admin/moods/create', function (req, res){
        adminController.createMoodsView(req, res);
    });
    app.get('/admin/moods/read/:id', function (req, res){
        adminController.readMoodsView(req, res);
    });
    app.get('/admin/moods/update/:id', function (req, res){
        adminController.updateMoodsView(req, res);
    });
    app.get('/admin/moods/delete/:id', function (req, res){
        adminController.deleteMoodsView(req, res);
    });

    // Admin Controller playlists routes
    app.get('/admin/playlists', function (req, res){
        adminController.playlistsHome(req, res);
    });
    app.get('/admin/playlists/create', function (req, res){
        adminController.createPlaylistsView(req, res);
    });
    app.get('/admin/playlists/read/:id', function (req, res){
        adminController.readPlaylistsView(req, res);
    });
    app.get('/admin/playlists/update/:id', function (req, res){
        adminController.updatePlaylistsView(req, res);
    });
    app.get('/admin/playlists/delete/:id', function (req, res){
        adminController.deletePlaylistsView(req, res);
    });

    // Admin Controller songs routes
    app.get('/admin/songs', function (req, res){
        adminController.songsHome(req, res);
    });
    app.get('/admin/songs/create', function (req, res){
        adminController.createSongsView(req, res);
    });
    app.get('/admin/songs/read/:id', function (req, res){
        adminController.readSongsView(req, res);
    });
    app.get('/admin/songs/update/:id', function (req, res){
        adminController.updateSongsView(req, res);
    });
    app.get('/admin/songs/delete/:id', function (req, res){
        adminController.deleteSongsView(req, res);
    });

    return adminController;
};