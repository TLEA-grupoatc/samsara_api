const fs = require("fs");

module.exports = app => {
    const accidente = app.database.models.Accidentes;

    const Sequelize = require('sequelize');
    const { literal } = require('sequelize');
    const Op = Sequelize.Op;

    app.obtenerAccidentes = (req, res) => {
        accidente.findAll({
            // where: {
            //     fecha: {
            //         [Op.between]: [req.params.fecha + ' 00:00:00', req.params.fecha + ' 23:59:59']
            //     }
            // },
            order: [
                ['fecha', 'DESC']
            ],
        }).then(result => {
            res.json({
                OK: true,
                Accidentes: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.crearRegistroAccidente = (req, res) => {
        let body = req.body;
        var directorio = 'documentos/evidenciaAccidentes/';
        var fechacorta = body.fecha_creacion.replace('-', '').replace('-', '').replace(' ', '').replace(':', '').replace(':', '');

        if(!fs.existsSync(directorio)) {
            fs.mkdirSync(directorio, {recursive: true});
        }

        const [, base64Content] = body.evidencia.split(',');
        var big1 = Buffer.from(base64Content, 'base64');

        fs.writeFileSync(directorio + body.usuario + '_' + fechacorta + '_' + body.nombre + '_' + body.descripcionE, big1); 
        doc = directorio + body.usuario + '_' + fechacorta + '_' + body.nombre + '_' + body.descripcionE;

        let nuevoRegistro = new accidente({
            operador: body.operador, 
            economico: body.economico, 
            tipo_accidente: body.tipo_accidente, 
            motivo: body.motivo, 
            descripcion: body.descripcion, 
            monto: body.monto, 
            evidencia: doc, 
            fecha: body.fecha, 
            mes: body.mes, 
            fecha_creacion: body.fecha_creacion, 
            usuario_creacion: body.usuario_creacion, 
            fecha_modificacion: body.fecha_modificacion, 
            usuario_modificacio: body.usuario_modificacion
        });

        accidente.create(nuevoRegistro.dataValues, {
            fields: [
                'operador', 
                'economico', 
                'tipo_accidente', 
                'motivo', 
                'descripcion', 
                'monto', 
                'evidencia', 
                'fecha', 
                'mes', 
                'fecha_creacion', 
                'usuario_creacion', 
                'fecha_modificacion', 
                'usuario_modificacion'
            ]
        })
        .then(async result => {
            res.json({
                OK: true,
                Accidente: result
            })
        })
        .catch(error => {
            res.status(412).json({
                OK: false,
                msg: error.message
            });
        });
    }

    app.actualizarRegistroAccidente = (req, res) => {
        let body = req.body;

        let actualizarRegistro = new accidente({
            operador:  body.operador, 
            economico:  body.economico, 
            tipo_accidente:  body.tipo_accidente, 
            motivo:  body.motivo, 
            descripcion:  body.descripcion, 
            monto:  body.monto, 
            evidencia:  body.evidencia, 
            fecha:  body.fecha, 
            mes:  body.mes,  
            fecha_modificacion:  body.fecha_modificacion, 
            usuario_modificacio:  body.usuario_modificacion
        });

        accidente.update(actualizarRegistro.dataValues, {
            where: {
                id_accidentes: req.params.id_accidentes
            },
            fields: [
                'operador', 
                'economico', 
                'tipo_accidente', 
                'motivo', 
                'descripcion', 
                'monto', 
                'evidencia', 
                'fecha', 
                'mes', 
                'fecha_modificacion', 
                'usuario_modificacion'
            ]
        }).then(result => {            
            res.json({
                OK: true,
                rows_affected: result[0]
            });
        }).catch(err => {
            res.status(412).json({
                OK: false,
                msg: err
            });
        });
    }

    // app.eliminarConvoy = (req, res) => {
    //     let id = req.params.id_convoy;

    //     let deconvoy = new convoy({
    //         estado: 'I'
    //     });

    //     convoy.update(deconvoy.dataValues, {
    //         where: {
    //             id_convoy: id
    //         },
    //         fields: ['estado']
    //     }).then(result => {
    //         res.json({
    //             OK: true,
    //             rows_affected: result[0]
    //         });
    //     }).catch(err => {
    //         res.status(412).json({
    //             OK: false,
    //             msg: err
    //         });
    //     });
    // } 

    return app;
}