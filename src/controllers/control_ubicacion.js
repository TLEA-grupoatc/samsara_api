const cron = require('node-cron');
const moment = require('moment');
const _ = require('lodash');

module.exports = app => {
    const Samsara = require("@api/samsara-dev-rel");
    Samsara.auth(process.env.KEYSAM);

    const controlubicaciones = app.database.models.ControlUbicaciones;
    const cliente = app.database.models.Clientes;
    const destino = app.database.models.Destinos;
    const origen = app.database.models.Origenes;
    const unidad = app.database.models.Unidades;

    const ubiporeco = app.database.models.UBICACIONESPORECONOMICO;

    const Sequelize = require('sequelize');
    const { literal } = require('sequelize');
    const Op = Sequelize.Op;


    app.getUbicacionPorEconomicoAgrupado = (req, res) => {  
        const today = moment().startOf('day');
        const sevenDaysAgo = moment().subtract(7, 'days').startOf('day');

        ubiporeco.findAll({
            attributes: [
                'economico',
                [Sequelize.fn('MIN', Sequelize.col('hora_entrada')), 'hora_entrada'],
            ],
            where: {
                hora_entrada: {
                    [Op.between]: [sevenDaysAgo.toDate(), today.toDate()]
                }
            },
            group: ['economico'],
            order: [
                ['economico', 'DESC'],
            ]
        }).then(async groupedResults => {
            const result = await Promise.all(groupedResults.map(async group => {
            const latestRecord = await ubiporeco.findOne({
                where: {
                    economico: group.economico,
                    hora_entrada: group.hora_entrada
                }
            });
            return latestRecord;
            }));

            res.json({
            OK: true,
            Total: result.length,
            Registros: result
            });
        })
        .catch(error => {
            res.status(412).json({
            msg: error.message
            });
        });
    }

    app.getUbicacionPorEconomico = (req, res) => {  
        ubiporeco.findAll({
            order: [
                ['economico', 'DESC'],
                ['hora_entrada', 'DESC']
            ]
        }).then(result => {
            res.json({
                OK: true,
                Registros: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.obtenerClientes = (req, res) => {
        cliente.findAll().then(result => {
            res.json({
                OK: true,
                Clientes: result,
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.crearCliente = (req, res) => {
        let body = req.body;

        let nuevoRegistro = new cliente({
            cliente: body.cliente
        });

        cliente.create(nuevoRegistro.dataValues, {
            fields: [
                'cliente'
            ]
        })
        .then(async result => {
            res.json({
                OK: true,
                Cliente: result
            })
        })
        .catch(error => {
            res.status(412).json({
                OK: false,
                msg: error.message
            });
        });
    }

    app.actualizarCliente = (req, res) => {
        let body = req.body;

        let actualizarRegistro = new cliente({
            cliente: body.cliente,
        });

        cliente.update(actualizarRegistro.dataValues, {
            where: {
                id_cliente: req.params.id_cliente
            },
            fields: [
                'cliente'
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

    app.obtenerOrigenes = (req, res) => {  
        origen.findAll().then(result => {
            res.json({
                OK: true,
                Origenes: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.crearOrigen = (req, res) => {
        let body = req.body;

        let nuevoRegistro = new origen({
            id_cliente: body.id_cliente,
            origen: body.origen
        });

        origen.create(nuevoRegistro.dataValues, {
            fields: [
                'id_cliente',
                'origen'
            ]
        })
        .then(async result => {
            res.json({
                OK: true,
                Origen: result
            })
        })
        .catch(error => {
            res.status(412).json({
                OK: false,
                msg: error.message
            });
        });
    }

    app.actualizarOrigen = (req, res) => {
        let body = req.body;

        let actualizarRegistro = new origen({
            id_cliente: body.id_cliente,
            origen: body.origen
        });

        origen.update(actualizarRegistro.dataValues, {
            where: {
                id_origen: req.params.id_origen
            },
            fields: [
                'id_cliente',
                'origen'
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

    app.obtenerDestinos = (req, res) => {  
        destino.findAll().then(result => {
            res.json({
                OK: true,
                Destinos: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.crearDestino = (req, res) => {
        let body = req.body;

        let nuevoRegistro = new destino({
            id_cliente: body.id_cliente,
            destino: body.destino
        });

        destino.create(nuevoRegistro.dataValues, {
            fields: [
                'id_cliente',
                'destino'
            ]
        })
        .then(async result => {
            res.json({
                OK: true,
                Destino: result
            })
        })
        .catch(error => {
            res.status(412).json({
                OK: false,
                msg: error.message
            });
        });
    }

    app.actualizarDestino = (req, res) => {
        let body = req.body;

        let actualizarRegistro = new destino({
            id_cliente: body.id_cliente,
            destino: body.destino
        });

        destino.update(actualizarRegistro.dataValues, {
            where: {
                id_cliente: req.params.id_cliente
            },
            fields: [
                'id_cliente',
                'destino'
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
    
    app.obtenerPlanes = async (req, res) => {
        var fecha = moment(new Date()).format('YYYY-MM-DD');
        var planes = [];

        controlubicaciones.findAll({
            where: {
                division: req.params.division,
                registro: {
                    [Op.between]: [fecha + ' 00:00:00', fecha + ' 23:59:59'],
                }
            },
            order: [
                ['cliente', 'ASC']
            ],
        }).then(result => {
            planes = result;
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });

        await unidad.findAll({
            where: {
                division: req.params.division,
                estado: 'A'
            },
            order: [
                ['name', 'ASC'],
                ['idcliente', 'ASC']
            ]
        }).then(async result => {
            var listadeitems = [];

            for(let tracto of result) {
                const plan = planes.find(aud => aud.unidad === tracto.name);

                let registros = ({
                    division: tracto.division,
                    unidad: tracto.name,
                    operador: plan != undefined ? plan.operador : '',
                    cliente: plan != undefined ? plan.cliente : tracto.idcliente,
                    origen: plan != undefined ? plan.origen : '',
                    destino: plan != undefined ? plan.destino : '',
                    estatus: plan != undefined ? plan.estatus : '',
                    plancarga: plan != undefined ? plan.plancarga : '',
                    ubicacion1: plan != undefined ? plan.ubicacion1 : '',
                    ubicacion2: plan != undefined ? plan.ubicacion2 : '',
                    ubicacion3: plan != undefined ? plan.ubicacion3 : '',
                    ubicacion4: plan != undefined ? plan.ubicacion4 : '',
                    ubicacion5: plan != undefined ? plan.ubicacion5 : '',
                    ubicacion6: plan != undefined ? plan.ubicacion6 : '',
                    ubicacion7: plan != undefined ? plan.ubicacion7 : '',
                    ubicacion8: plan != undefined ? plan.ubicacion8 : '',
                    ubicacion9: plan != undefined ? plan.ubicacion9 : '',
                    ubicacion10: plan != undefined ? plan.ubicacion10 : '',
                    ubicacion11: plan != undefined ? plan.ubicacion11 : '',
                    ubicacion12: plan != undefined ? plan.ubicacion12 : '',
                    registro: plan != undefined ? plan.registro : '',
                    registrado_por: plan != undefined ? plan.registrado_por : '',
                    estado: plan != undefined ? plan.estado : ''
                });

                listadeitems.push(registros);
            }

            res.json({
                OK: true,
                Planes: listadeitems
            });
        });
    }

    app.crearPlan = (req, res) => {
        let body = req.body;

        let nuevoRegistro = new controlubicaciones({
            division: body.division,
            unidad: body.unidad,
            operador: body.operador,
            cliente: body.cliente,
            origen: body.origen,
            destino: body.destino,
            estatus: body.estatus,
            plancarga: body.plancarga,
            ubicacion1: body.ubicacion1,
            ubicacion2: body.ubicacion2,
            ubicacion3: body.ubicacion3,
            ubicacion4: body.ubicacion4,
            ubicacion5: body.ubicacion5,
            ubicacion6: body.ubicacion6,
            ubicacion7: body.ubicacion7,
            ubicacion8: body.ubicacion8,
            ubicacion9: body.ubicacion9,
            ubicacion10: body.ubicacion10,
            ubicacion11: body.ubicacion11,
            ubicacion12: body.ubicacion12,
            registro: body.registro,
            registrado_por: body.registrado_por,
            estado: body.estado
        });

        controlubicaciones.create(nuevoRegistro.dataValues, {
            fields: [
                'division', 
                'unidad', 
                'operador', 
                'cliente', 
                'origen', 
                'destino', 
                'estatus', 
                'plancarga', 
                'ubicacion1', 
                'ubicacion2', 
                'ubicacion3', 
                'ubicacion4', 
                'ubicacion5', 
                'ubicacion6', 
                'ubicacion7', 
                'ubicacion8', 
                'ubicacion9', 
                'ubicacion10', 
                'ubicacion11', 
                'ubicacion12', 
                'registro', 
                'registrado_por', 
                'estado'
            ]
        })
        .then(result => {
            res.json({
                OK: true,
                Plan: result
            })
        })
        .catch(error => {
            res.status(412).json({
                OK: false,
                msg: error.message
            });
        });
    }

    cron.schedule('00 08 * * *', () => { ubicacion('ubicacion1'); });
    cron.schedule('00 09 * * *', () => { ubicacion('ubicacion2'); });
    cron.schedule('00 10 * * *', () => { ubicacion('ubicacion3'); });
    cron.schedule('00 11 * * *', () => { ubicacion('ubicacion4'); });
    cron.schedule('00 12 * * *', () => { ubicacion('ubicacion5'); });
    cron.schedule('00 13 * * *', () => { ubicacion('ubicacion6'); });
    cron.schedule('00 14 * * *', () => { ubicacion('ubicacion7'); });
    cron.schedule('00 15 * * *', () => { ubicacion('ubicacion8'); });
    cron.schedule('00 16 * * *', () => { ubicacion('ubicacion9'); });
    cron.schedule('00 17 * * *', () => { ubicacion('ubicacion10'); });
    cron.schedule('00 18 * * *', () => { ubicacion('ubicacion11'); });
    cron.schedule('00 19 * * *', () => { ubicacion('ubicacion12'); });

    async function ubicacion(hora) {
        var fecha = moment(new Date()).format('YYYY-MM-DDTHH:mm:ss');
        var paraValidadfecha = moment(new Date()).format('YYYY-MM-DD');
        var fechahora = fecha + 'Z';

        Samsara.getVehicleStats({
            time: fechahora,
            tagIds: '4343814,4244687,4236332,4399105,4531263,3907109',
            types: 'gps'
        })
        .then(result => {
            result['data']['data'].forEach(async (element) => {
                var fechagps = element['gps'].time.split('T')[0];
                if(paraValidadfecha == fechagps) {
                    await controlubicaciones.update(
                        { [hora]: element['gps'].reverseGeo.formattedLocation },
                        {
                          where: {
                            unidad: element.name,
                          }
                        }
                    );
                }
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