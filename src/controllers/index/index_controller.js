const path = require('path');

class IndexController{
    home(req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/index/index.html'))
    }

    register(req, res){
        res.sendFile(path.join(__dirname, '..', '..', 'view/index/register.html'))
    }
}

module.exports = new IndexController();