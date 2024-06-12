const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = app => {
    const Usuario = app.database.models.UsuariosApp;

    app.post('/login_app', (req, res) => {
        let body = req.body;  
        Usuario.scope('withContra').findOne({
            where: {
                usuario: body.usuario,
                estado: 'A'
            }
        }).then(result => {
            if(!result || body.contra !== result.dataValues.contra){
                return res.status(400).json({
                    OK: false,
                    msg: 'Usuario o contraseña incorrecto'
                });
            }

            delete result.dataValues.contra;

            let token = jwt.sign({
                usuario: result.dataValues  
            }, app.libs.config.SEED_TOKEN, {expiresIn: app.libs.config.CADUCIDAD_TOKEN});

            return res.json({
                OK: true,
                usuario: result,
                token
            });           
        }).catch(err => {
            return res.status(412).json({
                OK: false,
                msg: err.message
            });
        });
    });
}