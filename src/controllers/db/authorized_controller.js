/**
 * CRUD Authorized
 */
module.exports = function(app, db){
    app.post('/db/authorized', async (req, res) => {
        try {
            const authorizedExists = await db.Authorized.findOne({where: {email: req.body.email}});

            if (authorizedExists != null && authorizedExists){
                // This email is already authorized. No need to insert another entry
                console.log('Unable to POST authorization: Authorization already exists.');
                res.redirect('/admin/authorized?msg=Email is already authorized.')
                return;
            }

            // An authorization doesn't exist for this email, we can safely create one
            await db.Authorized.create(req.body);
            console.log('Successfully POST authorization: ' + req.body.email);
            res.redirect('/admin/authorized');
        } catch (e){
            res.status(400).send(e.message);
        }
    });

    app.route('/db/authorized/:id')
        .get(async (req, res) => {
            try {
                let authorized = await db.Authorized.findOne({where: {id: req.params.id}});

                if (authorized != null){
                    res.send(authorized);
                    console.log('Sent GET for authorization: ' + req.params.id);
                    return;
                }
                else {
                    res.sendStatus(404);
                    console.log('Unable to send GET for authorization: Authorization does not exist');
                    return;
                }
            } catch (e){
                res.status(400).send(e.message);
            }
        })
        .put(async (req, res) => {
            try {
                let authorizedEmail = await db.Authorized.findOne({where: {id: req.params.id}});

                if (authorizedEmail != null){
                    authorizedEmail.email = res.body.email;
                    authorizedEmail.save();
                    console.log('Successfully PUT authorization: ' + req.params.id);
                }

                res.redirect('/admin/authorized');
            } catch (e){
                res.status(400).send(e.message);
            }
        })
        .delete(async (req, res) => {
            try {
                let authorizedEmail = await db.Authorized.findOne({where: {id: req.params.id}})

                if (authorizedEmail != null){
                    await authorizedEmail.destroy();
                    console.log('Successfully DELETE authorization: ' + req.params.id);
                }

                res.redirect('/admin/authorized');
            } catch (e){
                res.status(400).send(e.message);
            }
        });
}