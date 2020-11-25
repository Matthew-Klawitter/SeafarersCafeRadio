const path = require('path');

class IndexController{
    home(req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/index/index.html'))
    }

    register(req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/index/register.html'))
    }
}

module.exports = function (app, db){
    var indexController = new IndexController();

    // Index Controller routes
    app.get('/', function(req, res){
        indexController.home(req, res);
    })
    app.get('/register', function(req, res){
        indexController.register(req, res);
    })

    return indexController;
};