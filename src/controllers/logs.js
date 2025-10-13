const moment = require('moment');

module.exports = app => {

    const loginlog = app.database.models.LOGINSLOG;
    const log = app.database.models.TABLELOGS;

    app.insertaLoginLog = async (req, res) => {
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
        .then(async result => {
            res.json({
                OK: true,
                Resultado: result
            });
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }


    app.insertRegisterLog = async (req, res) => {
        var today = new Date();
        const hoy = moment(today).format('YYYY-MM-DD HH:mm:ss');
        
        let nuevoRegistro = new log({
            nombre_tabla: body.nombre_tabla, 
            modulo: body.modulo, 
            accion: body.accion, 
            id: body.id, 
            movimiento: body.movimiento, 
            descripcion: body.descripcion, 
            valor_anterior: body.valor_anterior, 
            valor_nuevo: body.valor_nuevo, 
            usuario: body.usuario, 
            fecha: hoy, 
            usuario_: 'tlea_root@localhost'
        });

        log.create(nuevoRegistro.dataValues, {
            fields: [
                'nombre_tabla', 
                'modulo', 
                'accion', 
                'id', 
                'movimiento', 
                'descripcion', 
                'valor_anterior', 
                'valor_nuevo', 
                'usuario', 
                'fecha', 
                'usuario_db'
            ]
        })
        .then(async result => {
            res.json({
                OK: true,
                Log: result
            });
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    return app;
}