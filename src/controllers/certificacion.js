const fs = require("fs");

module.exports = app => {
    const ruta = app.database.models.Rutas;
    const doccertificacion = app.database.models.DocCertificacion;
    const certificacionhistorico = app.database.models.CertificacionHistorico;

    const Sequelize = require('sequelize');
    const { literal } = require('sequelize');
    const Op = Sequelize.Op;

    app.obtenerRutas = (req, res) => {  
        ruta.findAll({
            order: [['ruta', 'ASC']],
        }).then(result => {
            res.json({
                OK: true,
                Rutas: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.obtenerRutasXID = (req, res) => {  
        ruta.findAll({
            where: {
                id_certificacion: req.params.id_certificacion
            },
        }).then(result => {
            res.json({
                OK: true,
                Rutas: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.crearRuta = (req, res) => {
        let body = req.body;

        let nuevoRegistro = new ruta({
            ruta:  body.ruta, 
            origen:  body.origen, 
            destino:  body.destino, 
            via:  body.via, 
            km_gmap:  body.km_gmap, 
            km_advan:  body.km_advan, 
            caseta_oneway:  body.caseta_oneway, 
            diesel:  body.diesel, 
            caseta_round_trip:  body.caseta_round_trip, 
            sueldo:  body.sueldo, 
            gop:  body.gop, 
            tarifa:  body.tarifa, 
            rentabilidad:  body.rentabilidad, 
            porcentaje_rentabilidad:  body.porcentaje_rentabilidad, 
            seguridad:  body.seguridad, 
            condicion_carretera:  body.condicion_carretera, 
            tipo_carretera:  body.tipo_carretera, 
            permisos:  body.permisos, 
            estatus_actual:  body.estatus_actual, 
            estatus:  body.estatus, 
            fecha_creacion:  body.fecha_creacion, 
            usuario_creacion:  body.usuario_creacion, 
            fecha_ultima_moficacion:  body.fecha_ultima_moficacion, 
            usuario_ultima_moficacion:  body.usuario_ultima_moficacion
        });

        ruta.create(nuevoRegistro.dataValues, {
            fields: [
                'ruta',
                'origen',
                'destino',
                'via',
                'km_gmap',
                'km_advan',
                'caseta_oneway',
                'diesel',
                'caseta_round_trip',
                'sueldo',
                'gop',
                'tarifa',
                'rentabilidad',
                'porcentaje_rentabilidad',
                'seguridad',
                'condicion_carretera',
                'tipo_carretera',
                'permisos',
                'estatus_actual',
                'estatus',
                'fecha_creacion',
                'usuario_creacion',
                'fecha_ultima_moficacion',
                'usuario_ultima_moficacion'
            ]
        })
        .then(async result => {
            res.json({
                OK: true,
                Ruta: result
            })
        })
        .catch(error => {
            res.status(412).json({
                OK: false,
                msg: error.message
            });
        });
    }

    app.actualizarRuta = (req, res) => {
        let body = req.body;

        let data = new ruta({
            ruta:  body.ruta, 
            origen:  body.origen, 
            destino:  body.destino, 
            via:  body.via, 
            km_gmap:  body.km_gmap, 
            km_advan:  body.km_advan, 
            caseta_oneway:  body.caseta_oneway, 
            diesel:  body.diesel, 
            caseta_round_trip:  body.caseta_round_trip, 
            sueldo:  body.sueldo, 
            gop:  body.gop, 
            tarifa:  body.tarifa, 
            rentabilidad:  body.rentabilidad, 
            porcentaje_rentabilidad:  body.porcentaje_rentabilidad, 
            seguridad:  body.seguridad, 
            condicion_carretera:  body.condicion_carretera, 
            tipo_carretera:  body.tipo_carretera, 
            permisos:  body.permisos, 
            estatus_actual:  body.estatus_actual, 
            estatus:  body.estatus, 
            fecha_creacion:  body.fecha_creacion, 
            usuario_creacion:  body.usuario_creacion, 
            fecha_ultima_moficacion:  body.fecha_ultima_moficacion, 
            usuario_ultima_moficacion:  body.usuario_ultima_moficacion
        });

        ruta.update(data.dataValues, {
            where: {
                id_certificacion: req.params.id_certificacion
            },
            individualHooks: true, 
            fields: [
                'ruta',
                'origen',
                'destino',
                'via',
                'km_gmap',
                'km_advan',
                'caseta_oneway',
                'diesel',
                'caseta_round_trip',
                'sueldo',
                'gop',
                'tarifa',
                'rentabilidad',
                'porcentaje_rentabilidad',
                'seguridad',
                'condicion_carretera',
                'tipo_carretera',
                'permisos',
                'estatus_actual',
                'estatus',
                'fecha_creacion',
                'usuario_creacion',
                'fecha_ultima_moficacion',
                'usuario_ultima_moficacion'
            ]
        })
        .then(async result => {
            res.json({
                OK: true,
                rows_affected: result[0]
            });
        })
        .catch(error => {
            console.log(error);
        });
    }

    app.certificarPunto = (req, res) => {
        var campo = req.params.campo;

        let data = new ruta({
            [campo]: req.params.valor
        });

        ruta.update(data.dataValues, {
            where: {
                id_certificacion: req.params.id_certificacion
            },
            individualHooks: true, 
            fields: ['seguridad', 'condicion_carretera', 'tipo_carretera', 'permisos']
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

    app.obtenerEvidenciaRuta = (req, res) => {  
        doccertificacion.findAll({
            where: {
                id_certificacion: req.params.id_certificacion
            },
            order: [['fecha_creacion', 'ASC']],
        }).then(result => {
            res.json({
                OK: true,
                Documentos: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.agregarEvidencia = (req, res) => {
        let body = req.body;
        let documentos = body.docs;
        var directorio = 'documentos/';

        documentos.forEach(docu => {
            if(!fs.existsSync(directorio)) {
                fs.mkdirSync(directorio, {recursive: true});
            }

            const [, base64Content] = docu.archivo.split(',');
            var big1 = Buffer.from(base64Content, 'base64');

            var fechacorta = docu.fecha_creacion.replace('-', '').replace('-', '').replace(' ', '').replace(':', '').replace(':', '');

            fs.writeFileSync(directorio + docu.usuario + '_' + fechacorta + '_' + docu.nombre + '_' + docu.descripcion, big1);
            
            var doc = directorio + docu.usuario + '_' + fechacorta + '_' + docu.nombre + '_' + docu.descripcion;

            let nuevoDocumento = new doccertificacion({
                id_certificacion: docu.id_certificacion,
                via: docu.via,
                nombre: docu.nombre,
                descripcion: docu.descripcion,
                tipo: docu.tipo,
                archivo: doc,
                usuario: docu.usuario,
                fecha_creacion: docu.fecha_creacion
            });

            doccertificacion.create(nuevoDocumento.dataValues, {
                fields: [
                    'id_certificacion', 
                    'via', 
                    'nombre', 
                    'descripcion', 
                    'tipo', 
                    'archivo',
                    'usuario',
                    'fecha_creacion'
                ]
            })
            .then(result => {
                res.json({
                    OK: true,
                    Evidencia: result
                })
            }).catch(error => {
                res.status(412).json({
                    OK: false,
                    msg: error
                });
            });   
        });
    }


    app.obtenerHistoricoCertificaciones = (req, res) => {  
        certificacionhistorico.findAll({
            where: {
                id_certificacion: req.params.id_certificacion
            },
        }).then(result => {
            res.json({
                OK: true,
                Historico: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }



    // ESPECIALES
    app.eliminarPermanenteRuta = (req, res) => {
        ruta.findByPk(req.params.id_gastos).then(result => {
            if(!result) {
                return res.status(404).json({
                    OK: false,
                    msg: 'Ruta not found'
                });
            }

            return result.destroy();
        })
        .then(result => {     
            res.json({
                OK: true,
                rows_affected: result[0]
            });
        })
        .catch(error => {
            res.status(412).json({
                OK: false,
                msg: error.message
            });
        });
    }

    return app;
}