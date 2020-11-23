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

module.exports = new AdminController();