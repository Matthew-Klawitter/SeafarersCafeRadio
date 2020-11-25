const path = require('path');

/**
 * CRUD Backgrounds
 */
module.exports = function(app, db){
    //Note, access id's via req.params.id
    app.route('/db/backgrounds/:id')
        .get((req, res) => {
            // retrieve an account
            
        })
        .post((req, res) => {
            // create an account
            try {
                const newBackground = await db.Background.create(req.body);
            } catch (e){
                res.status(400).send(e.message);
            }
        })
        .put((req, res) => {
            // update an account
        })
        .delete((req, res) => {
            // delete an account
        });
}