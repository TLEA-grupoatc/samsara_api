const moment = require('moment');
const _ = require('lodash');

module.exports = app => {
    const evento = app.database.models.Eventos;
    const parosdemotor = app.database.models.ParosDeMotor;
    const cobro = app.database.models.Cobros;
    const operador = app.database.models.Operadores;
    
    
    const alerta = app.database.models.Alertas;


    const Sequelize = require('sequelize');
    const { literal } = require('sequelize');
    const Op = Sequelize.Op;

    app.obtenerEventosCriticos = (req, res) => {
        evento.findAll({
            where: {
                fecha: {
                    [Op.between]: [req.params.fechaInicio, req.params.fechaFin],
                }
            },
            order: [
                ['fecha', 'DESC']
            ],
        }).then(result => {
            res.json({
                OK: true,
                Eventos: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.obtenerParosDeMotor = (req, res) => {
        parosdemotor.findAll({
            where: {
                id_evento: req.params.id_evento
            },
            order: [
                ['fecha', 'DESC']
            ],
        }).then(result => {
            res.json({
                OK: true,
                ParosDeMotor: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.crearEvento = (req, res) => {
        let body = req.body;
        let lista = body.lista;

        let nuevoRegistro = new evento({
            personal_enturno: body.personal_enturno, 
            turno: body.turno,
            evento: body.evento,
            fecha: body.fecha,
            hora: body.hora,
            observaciones: body.observaciones
        });

        evento.create(nuevoRegistro.dataValues, {
            fields: [
                'personal_enturno', 
                'turno',
                'evento',
                'fecha',
                'hora',
                'observaciones'
            ]
        })
        .then(async result => {
            if(lista != null) {
                lista.forEach(async re => {
                    let nuevoRegistro = new parosdemotor({
                        id_evento: result.id_evento, 
                        unidad_denegocio: re.unidad_denegocio, 
                        unidad: re.unidad,
                        motivo: re.motivo,
                        ubicacion: re.ubicacion,
                        corte_deaceleracion: re.corte_deaceleracion,
                        fecha: re.fecha, 
                        hora: re.hora, 
                        quien_solicita: re.quien_solicita,
                        latitud: re.latitud,
                        longitud: re.longitud,
                        c4: re.c4,
                        operaciones: re.operaciones,
                        turno: re.turno,
                        estado: re.estado
                    });
                    
                    await parosdemotor.create(nuevoRegistro.dataValues, {
                        fields: [
                            'id_evento', 
                            'unidad_denegocio', 
                            'unidad',
                            'motivo',
                            'ubicacion',
                            'corte_deaceleracion', 
                            'fecha', 
                            'hora', 
                            'quien_solicita',
                            'latitud',
                            'longitud',
                            'c4',
                            'operaciones',
                            'turno',
                            'estado'
                        ]
                    }).then(result => {}).catch(error => { console.log(error.message); });
                });
            }
               
            res.json({
                OK: true,
                Evento: result
            })
        })
        .catch(error => {
            res.status(412).json({
                OK: false,
                msg: error.message
            });
        });
    }

    app.obtenerOperadores = (req, res) => {
        operador.findAll({
            where: {
                estado: 'A'
            }
        }).then(result => {
            res.json({
                OK: true,
                Operadores: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.obtenerOperadoresLista = (req, res) => {
        operador.findAll({
            order: [
                ['nombre', 'ASC']
            ],
        }).then(result => {
            res.json({
                OK: true,
                Operadores: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.actualizarOperador = (req, res) => {
        let body = req.body;

        let nuevoRegistro = new operador({
            unidad: body.unidad,
            numero_empleado: body.numero_empleado,
            nombre: body.nombre,
            estado: body.estado
        });

        operador.update(nuevoRegistro.dataValues, {
            where: {
                id_operador: req.params.id_operador
            },
            fields: [
                'unidad',
                'numero_empleado',
                'nombre',
                'estado'
            ]
        })
        .then(async result => {
            res.json({
                OK: true,
                Operador: result
            })
        })
        .catch(error => {
            res.status(412).json({
                OK: false,
                msg: error.message
            });
        });
    }










    app.crearOperador = (req, res) => {
        let body = req.body;

        let nuevoRegistro = new origen({
            numero_empleado: body.numero_empleado,
            nombre: body.nombre,
            estado: body.estado
        });

        origen.create(nuevoRegistro.dataValues, {
            fields: [
                'numero_empleado',
                'nombre',
                'estado'
            ]
        })
        .then(async result => {
            res.json({
                OK: true,
                Operador: result
            })
        })
        .catch(error => {
            res.status(412).json({
                OK: false,
                msg: error.message
            });
        });
    }

    app.obtenerCobros = (req, res) => {
        cobro.findAll({
            where: {
                registro: {
                    [Op.between]: [req.params.fechaInicio + ' 00:00:00', req.params.fechaFin + ' 23:59:59']
                }
            },
            order: [
                ['registro', 'DESC']
            ],
        }).then(result => {
            res.json({
                OK: true,
                Cobros: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.crearCobro = (req, res) => {
        let body = req.body;

        let nuevoRegistro = new cobro({
            unidad: body.unidad, 
            operador: body.operador,
            concepto: body.concepto,
            cantidad: body.cantidad,
            enlace: body.enlace,
            registro: body.registro,
            registrado_por: body.registrado_por,
            cobrado: body.cobrado,
            cobrado_por: body.cobrado_por,
            estado: body.estado
        });

        cobro.create(nuevoRegistro.dataValues, {
            fields: [
                'unidad', 
                'operador',
                'concepto',
                'cantidad',
                'enlace',
                'registro',
                'registrado_por',
                'cobrado',
                'cobrado_por',
                'estado'
            ]
        })
        .then(result => {
            res.json({
                OK: true,
                Cobro: result
            })
        })
        .catch(error => {
            res.status(412).json({
                OK: false,
                msg: error.message
            });
        });
    }

    app.cobroRealizado = (req, res) => {
        var today = new Date();
        const hoy = moment(today).format('YYYY-MM-DD HH:mm:ss');
        let data = new cobro({
            estado: 'I',
            cobrado: hoy,
            cobrado_por: req.params.cobrado_por
        });

        cobro.update(data.dataValues, {
            where: {
                id_cobro: req.params.id_cobro
            },
            fields: ['estado', 'cobrado', 'cobrado_por']
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












    app.obtenerReporteOperadoresAlertas = (req, res) => {
        alerta.findAll({
            attributes: [
                'unidad', 
                'operador', 
                'event', 
                [Sequelize.fn('COUNT', Sequelize.col('event')), 'total']
            ],
            where: {
                eventTime: {
                    [Op.between]: [req.params.fechaInicio, req.params.fechaFin],
                }
            },
            group: ['event', 'unidad'],
            order: [
                ['unidad', 'ASC']
            ],
        }).then(result => {
            res.json({
                OK: true,
                Reporte: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    return app;
}