const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');

module.exports = app => {
    const Usuario = app.database.models.Usuarios;
    const loginlog = app.database.models.LOGINSLOG;

    app.post('/iniciar_sesion', (req, res) => {
        let body = req.body;  
        var today = new Date();
        const hoy = moment(today).format('YYYY-MM-DD HH:mm:ss');
                        
        Usuario.scope('withPassword').findOne({
            where: {
                nombre_usuario: body.nombre_usuario,
                status: 'A'
            }
        }).then(result => {
            if(!result || !bcrypt.compareSync(body.contrasena, result.dataValues.contrasena)){
                return res.status(400).json({
                    OK: false,
                    msg: 'Usuario o contraseña incorrecto'
                });
            }

            delete result.dataValues.contrasena;

            let token = jwt.sign({ usuario: result.dataValues }, app.libs.config.SEED_TOKEN, {expiresIn: app.libs.config.CADUCIDAD_TOKEN});
  
            let nuevoRegistro = new loginlog({
                nombre: result.dataValues.nombre_empleado,
                usuario: result.dataValues.nombre_usuario,
                fecha: hoy
            });

            loginlog.create(nuevoRegistro.dataValues, {
                fields: [
                    'nombre',
                    'usuario',
                    'fecha'
                ]
            })
            .then(async result => {})

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