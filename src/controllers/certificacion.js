const fs = require("fs");

module.exports = app => {
    const ruta = app.database.models.Rutas;

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