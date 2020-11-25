const path = require('path');

module.exports = function (app, db){
    // Index Controller routes
    app.get('/', function(req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/index/index.html'))
    })
    app.get('/register', function(req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/index/register.html'))
    })
};