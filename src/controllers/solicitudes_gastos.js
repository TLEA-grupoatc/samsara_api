const cron = require('node-cron');
const moment = require('moment');

module.exports = app => {
    // const cliente = app.database.models.Clientes;
    const origendestino = app.database.models.OrigenesDestinosGastos;
    const origen = app.database.models.OrigenesGastos;
    const destino = app.database.models.DestinosGastos;

    const Sequelize = require('sequelize');
    const { literal } = require('sequelize');
    const Op = Sequelize.Op;

    // app.obtenerClientes = (req, res) => {
    //     cliente.findAll().then(result => {
    //         res.json({
    //             OK: true,
    //             Clientes: result,
    //         })
    //     })
    //     .catch(error => {
    //         res.status(412).json({
    //             msg: error.message
    //         });
    //     });
    // }

    // app.crearCliente = (req, res) => {
    //     let body = req.body;

    //     let nuevoRegistro = new cliente({
    //         cliente: body.cliente
    //     });

    //     cliente.create(nuevoRegistro.dataValues, {
    //         fields: [
    //             'cliente'
    //         ]
    //     })
    //     .then(async result => {
    //         res.json({
    //             OK: true,
    //             Cliente: result
    //         })
    //     })
    //     .catch(error => {
    //         res.status(412).json({
    //             OK: false,
    //             msg: error.message
    //         });
    //     });
    // }

    // app.actualizarCliente = (req, res) => {
    //     let body = req.body;

    //     let actualizarRegistro = new cliente({
    //         cliente: body.cliente,
    //     });

    //     cliente.update(actualizarRegistro.dataValues, {
    //         where: {
    //             id_cliente: req.params.id_cliente
    //         },
    //         fields: [
    //             'cliente'
    //         ]
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

    app.obtenerOrigenesDestinoGastos = (req, res) => {  
        origendestino.findAll({

        }).then(result => {
            res.json({
                OK: true,
                OriDes: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.obtenerOrigenesDestinoGastosXOD = (req, res) => {  
        origendestino.findAll({
            where: {
                terminal: req.params.terminal,
                id_origen_gasto: req.params.idorigen,
                id_destino_gasto: req.params.iddestino,
                estado: 'A'
            }
        }).then(result => {
            res.json({
                OK: true,
                OriDes: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }


    app.obtenerOrigenesGastos = (req, res) => {  
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

    app.crearOrigenGastos = (req, res) => {
        let body = req.body;

        let nuevoRegistro = new origen({
            unidad_negocio: body.unidad_negocio,
            terminal: body.terminal,
            origen: body.origen,
            registrado_por: body.registrado_por,
            modificado_por: body.modificado_por,
            fecha_creacion: body.fecha_creacion,
            fecha_modificacion: body.fecha_modificacion,
            estado: body.estado
        });

        origen.create(nuevoRegistro.dataValues, {
            fields: [
                'unidad_negocio',
                'terminal',
                'origen',
                'registrado_por',
                'modificado_por',
                'fecha_creacion',
                'fecha_modificacion',
                'estado'
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

    app.actualizarOrigenGastos = (req, res) => {
        let body = req.body;

        let actualizarRegistro = new origen({
            unidad_negocio: body.unidad_negocio,
            terminal: body.terminal,
            origen: body.origen,
            registrado_por: body.registrado_por,
            modificado_por: body.modificado_por,
            fecha_creacion: body.fecha_creacion,
            fecha_modificacion: body.fecha_modificacion,
            estado: body.estado
        });

        origen.update(actualizarRegistro.dataValues, {
            where: {
                id_origen_gasto: req.params.id_origen_gasto
            },
            fields: [
                'unidad_negocio',
                'terminal',
                'origen',
                'registrado_por',
                'modificado_por',
                'fecha_creacion',
                'fecha_modificacion',
                'estado'
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

    app.obtenerDestinosGastos = (req, res) => {  
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

    app.crearDestinoGastos = (req, res) => {
        let body = req.body;

        let nuevoRegistro = new destino({
            unidad_negocio: body.unidad_negocio,
            terminal: body.terminal,
            destino: body.destino,
            registrado_por: body.registrado_por,
            modificado_por: body.modificado_por,
            fecha_creacion: body.fecha_creacion,
            fecha_modificacion: body.fecha_modificacion,
            estado: body.estado
        });

        destino.create(nuevoRegistro.dataValues, {
            fields: [
                'unidad_negocio',
                'terminal',
                'destino',
                'registrado_por',
                'modificado_por',
                'fecha_creacion',
                'fecha_modificacion',
                'estado'
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

    app.actualizarDestinoGastos = (req, res) => {
        let body = req.body;

        let actualizarRegistro = new destino({
            unidad_negocio: body.unidad_negocio,
            terminal: body.terminal,
            destino: body.destino,
            registrado_por: body.registrado_por,
            modificado_por: body.modificado_por,
            fecha_creacion: body.fecha_creacion,
            fecha_modificacion: body.fecha_modificacion,
            estado: body.estado
        });

        destino.update(actualizarRegistro.dataValues, {
            where: {
                id_destino_gasto: req.params.id_destino_gasto
            },
            fields: [
                'unidad_negocio',
                'terminal',
                'destino',
                'registrado_por',
                'modificado_por',
                'fecha_creacion',
                'fecha_modificacion',
                'estado'
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

    return app;
}