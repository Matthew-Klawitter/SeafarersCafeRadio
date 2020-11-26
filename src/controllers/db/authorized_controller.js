const path = require('path');

/**
 * CRUD Authorized
 */
module.exports = function(app, db){
    app.route('/db/authorized/:id')
        .get(async (req, res) => {
            try {
                let authorized = await db.Authorized.findOne({where: {id: req.params.id}});

                if (authorized != null){
                    res.send(authorized);
                }
                else {
                    res.sendStatus(404);
                }
            } catch (e){
                res.status(400).send(e.message);
            }
        })
        .post(async (req, res) => {
            try {
                const authorizedExists = await db.Authorized.findOne({where: {email: req.body.email}});

                if (authorizedExists != null && authorizedExists){
                    // This email is already authorized. No need to insert another entry
                    res.redirect('/admin/authorized?msg=Email is already authorized.')
                }

                // An authorization doesn't exist for this email, we can safely create one
                await db.Authorized.create(req.body);
                res.redirect('/admin/authorized');
            } catch (e){
                res.status(400).send(e.message);
            }
        })
        .put(async (req, res) => {
            try {
                let authorizedEmail = await db.Authorized.find({where: {id: req.params.id}});

                if (authorizedEmail != null){
                    authorizedEmail.email = res.body.email;
                    authorizedEmail.save();
                }

                res.redirect('/admin/authorized');
            } catch (e){
                res.status(400).send(e.message);
            }
        })
        .delete(async (req, res) => {
            try {
                let authorizedEmail = await db.Authorized.find({where: {id: req.params.id}})

                if (authorizedEmail != null){
                    await authorizedEmail.destroy();
                }

                res.redirect('/admin/authorized');
            } catch (e){
                res.status(400).send(e.message);
            }
        });
}