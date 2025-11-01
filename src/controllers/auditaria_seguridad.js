const moment = require('moment');

module.exports = app => {
    const auditoria = app.database.models.AuditoriaSeguridad;

    const Sequelize = require('sequelize');
    const { literal } = require('sequelize');
    const Op = Sequelize.Op;

    app.obtenerAuditoriasSeguridad = (req, res) => {
        var primerDiaMes = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        var ultimoDiaMes = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

        var formatpdm = moment(primerDiaMes).format('YYYY-MM-DD');
        var formatudm = moment(ultimoDiaMes).format('YYYY-MM-DD');

        auditoria.findAll({
            where: {
                creado_el: {
                    [Op.between]: [formatpdm, formatudm],
                },
                estatus: {
                    [Op.ne]: 'I'
                }
            },
            order: [
                ['creado_el', 'DESC']
            ],
        }).then(result => {
            res.json({
                OK: true,
                Auditorias: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.crearAuditoriaSeguridad = (req, res) => {
        let body = req.body;

        let nuevoRegistro = new auditoria({
            division: body.division, 
            unidadnegocio: body.unidadnegocio, 
            operador: body.operador, 
            maxipista: body.maxipista, 
            aprobo: body.aprobo, 
            comentarios: body.comentarios, 
            evidenciaauditoria: body.evidenciaauditoria, 
            aplicaconcientizacion: body.aplicaconcientizacion, 
            evidenciaconcientizacion: body.evidenciaconcientizacion, 
            registrado_por: body.registrado_por, 
            creado_el: body.creado_el, 
            actualizado_por: body.actualizado_por, 
            actualizado_el: body.actualizado_el, 
            estatus: body.estatus
        });

        auditoria.create(nuevoRegistro.dataValues, {
            fields: [
                'division', 
                'unidadnegocio', 
                'operador', 
                'maxipista', 
                'aprobo', 
                'comentarios', 
                'evidenciaauditoria', 
                'aplicaconcientizacion', 
                'evidenciaconcientizacion', 
                'registrado_por', 
                'creado_el', 
                'actualizado_por', 
                'actualizado_el', 
                'estatus'
            ]
        })
        .then(async result => {
            res.json({
                OK: true,
                Auditoria: result
            })
        })
        .catch(error => {
            res.status(412).json({
                OK: false,
                msg: error.message
            });
        });
    }

    app.actualizarAuditoriaSeguridad = (req, res) => {
        let body = req.body;

        let actualizarRegistro = new auditoria({
            division: body.division, 
            unidadnegocio: body.unidadnegocio, 
            operador: body.operador, 
            maxipista: body.maxipista, 
            aprobo: body.aprobo, 
            comentarios: body.comentarios, 
            evidenciaauditoria: body.evidenciaauditoria, 
            aplicaconcientizacion: body.aplicaconcientizacion, 
            evidenciaconcientizacion: body.evidenciaconcientizacion, 
            registrado_por: body.registrado_por, 
            creado_el: body.creado_el, 
            actualizado_por: body.actualizado_por, 
            actualizado_el: body.actualizado_el, 
            estatus: body.estatus
        });

        auditoria.update(actualizarRegistro.dataValues, {
            where: {
                id_as: req.params.id_as
            },
            fields: [
                'division', 
                'unidadnegocio', 
                'operador', 
                'maxipista', 
                'aprobo', 
                'comentarios', 
                'evidenciaauditoria', 
                'aplicaconcientizacion', 
                'evidenciaconcientizacion', 
                'registrado_por', 
                'creado_el', 
                'actualizado_por', 
                'actualizado_el', 
                'estatus'
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

    app.eliminarAuditoriaSeguridad = (req, res) => {
        let id = req.params.id_as;

        let audi = new auditoria({
            estatus: 'I'
        });

        auditoria.update(audi.dataValues, {
            where: {
                id_as: id
            },
            fields: ['estatus']
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

    return app;
}