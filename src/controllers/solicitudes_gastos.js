const fs = require("fs");

module.exports = app => {
    // const cliente = app.database.models.Clientes;
    const origendestino = app.database.models.OrigenesDestinosGastos;
    const origen = app.database.models.OrigenesGastos;
    const destino = app.database.models.DestinosGastos;

    const gasto = app.database.models.SolicitudGastos;

    const docgasto = app.database.models.DocGastos;

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
            where: {
                estado: 'A'
            },
            order: [['terminal', 'ASC']],
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
        origen.findAll({

        }).then(result => {
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
        destino.findAll({
    
        }).then(result => {
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



    app.cargarDocDeposito = (req, res) => {
        let body = req.body;
        var gastos = body.datosgastos;

        var directorio = 'documentos/';

        if(!fs.existsSync(directorio)) {
            fs.mkdirSync(directorio, {recursive: true});
        }

        const [, base64Content] = body.archivo.split(',');
        var big1 = Buffer.from(base64Content, 'base64');

        var fechacorta = body.fecha_creacion.replace('-', '').replace('-', '').replace(' ', '').replace(':', '').replace(':', '');

        fs.writeFileSync(directorio + body.usuario + '_' + fechacorta + '_' + body.nombre, big1);
        
        doc = directorio + body.usuario + '_' + fechacorta + '_' + body.nombre;

        let nuevoDocumento = new docgasto({
            folio: body.folio,
            operador: body.operador,
            nombre: body.nombre,
            descripcion: body.descripcion,
            tipo: body.tipo,
            archivo: doc,
            fecha_creacion: body.fecha_creacion,
            usuario: body.usuario
        });

        docgasto.create(nuevoDocumento.dataValues, {
            fields: [
                'folio', 
                'operador', 
                'nombre', 
                'descripcion', 
                'tipo', 
                'archivo',
                'fecha_creacion',
                'usuario'
            ]
        })
        .then(result => {
            gastos.forEach(element => {
                let data = new gasto({
                    estatus: 'Depositado'
                });
        
                gasto.update(data.dataValues, {
                    where: {
                        id_gastos: element
                    },
                    individualHooks: true, 
                    fields: ['estatus']
                }).then(result => {
                    console.log('success');
                }).catch(err => {
                  console.log(err);
                  
                });
            });

            res.json({
                OK: true,
                Documento: result
            });
        }).catch(error => {
            res.status(412).json({
                OK: false,
                msg: error.message
            });
        });    
    }

    app.obtenerDeposito = (req, res) => {
        docgasto.findAll({
            where: {
                folio: req.params.folio
            }
        }).then(result => {
            res.json({
                OK: true,
                Docs: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.obtenerSolicitudesDeGastos = (req, res) => {  
        gasto.findAll({
            order: [['fecha_solicitud', 'DESC']],
        }).then(result => {
            res.json({
                OK: true,
                Gastos: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.verificarExistenciaGasto = (req, res) => {  
        gasto.findAll({
            where: {
                operador: req.params.operador,
                origen: req.params.origen,
                destino: req.params.destino,
                fecha_creacion: req.params.fecha_creacion,
                tipo_gasto: 'NORMAL'
            }
        }).then(result => {
            res.json({
                OK: true,
                Gastos: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.crearSolicitudGastos = (req, res) => {
        let body = req.body;

        for(let inf of body.info) {
            let nuevoRegistro = new gasto({
                fecha_solicitud: inf.fecha_solicitud, 
                solicitante: inf.solicitante, 
                unidad_negocio: inf.unidad_negocio, 
                folio: inf.folio, 
                operador: inf.operador, 
                economico: inf.economico, 
                origen: inf.origen, 
                destino: inf.destino, 
                cliente: inf.cliente, 
                tipo_gasto: inf.tipo_gasto, 
                concepto: inf.concepto, 
                monto: inf.monto, 
                aprobado_por: inf.aprobado_por,
                aprobado_por_gerente: inf.aprobado_por_gerente,
                estatus: inf.estatus,
                fecha_creacion: inf.fecha_creacion
            });

            gasto.create(nuevoRegistro.dataValues, {
                individualHooks: true, 
                fields: [
                    'fecha_solicitud', 
                    'solicitante', 
                    'unidad_negocio', 
                    'folio', 
                    'operador', 
                    'economico', 
                    'origen', 
                    'destino', 
                    'cliente', 
                    'tipo_gasto', 
                    'concepto', 
                    'monto', 
                    'aprobado_por', 
                    'aprobado_por_gerente', 
                    'estatus',
                    'fecha_creacion'
                ]
            })
            .then(async result => {
                console.log('success');
                
            })
            .catch(error => {

                console.log(error);
                
                // res.status(412).json({
                //     OK: false,
                //     msg: error.message
                // });
            });
        }

        res.json({
            OK: true
        })
    }

    app.solicitudDeGastosAceptarRechazar = (req, res) => {
        let data = new gasto({
            aprobado_por: req.params.aprobado_por,
            aprobado_por_gerente: req.params.aprobado_por_gerente,
            estatus: req.params.estado
        });

        gasto.update(data.dataValues, {
            where: {
                id_gastos: req.params.id_gastos
            },
            individualHooks: true, 
            fields: ['aprobado_por', 'aprobado_por_gerente', 'estatus']
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



















    app.obtenerOrigenesDestinoGrupo = (req, res) => {  
        origendestino.findAll({
            where: {
                estado: 'A'
            },
            group: [['id_origen_gasto']],
            order: [['id_origen_gasto']]
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



    app.checarOrigenesDestino = (req, res) => {  
        origendestino.findAll({
            where: {
                id_origen_gasto: req.params.id_origen_gasto, 
                id_destino_gasto: req.params.id_destino_gasto, 
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

    
    app.crearOrigenDestino = (req, res) => {
        let body = req.body;

        let nuevoRegistro = new origendestino({
            id_origen_gasto: body.id_origen_gasto, 
            id_destino_gasto: body.id_destino_gasto, 
            terminal: body.terminal, 
            caseta: body.caseta, 
            guia: body.guia, 
            gratificacion: body.gratificacion, 
            pension: body.pension, 
            taxi: body.taxi, 
            permiso: body.permiso, 
            gasolina: body.gasolina, 
            fitosanitaria: body.fitosanitaria, 
            comida: body.comida, 
            talacha: body.talacha, 
            registrado_por: body.registrado_por, 
            modificado_por: body.modificado_por, 
            fecha_creacion: body.fecha_creacion, 
            fecha_modificacion: body.fecha_modificacion, 
            estado: body.estado
        });

        origendestino.create(nuevoRegistro.dataValues, {
            individualHooks: true, 
            fields: [
                'id_origen_gasto', 
                'id_destino_gasto', 
                'terminal', 
                'caseta', 
                'guia', 
                'gratificacion', 
                'pension', 
                'taxi', 
                'permiso', 
                'gasolina', 
                'fitosanitaria', 
                'comida', 
                'talacha', 
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
                OrigenDestino: result
            })
        })
        .catch(error => {
            res.status(412).json({
                OK: false,
                msg: error.message
            });
        });
    }

    app.actualizarOrigenDestino = (req, res) => {
        let body = req.body;

        let editarPre = new origendestino({
            id_origen_gasto: body.id_origen_gasto, 
            id_destino_gasto: body.id_destino_gasto, 
            terminal: body.terminal, 
            caseta: body.caseta, 
            guia: body.guia, 
            gratificacion: body.gratificacion, 
            pension: body.pension, 
            taxi: body.taxi, 
            permiso: body.permiso, 
            gasolina: body.gasolina, 
            fitosanitaria: body.fitosanitaria, 
            comida: body.comida, 
            talacha: body.talacha, 
            registrado_por: body.registrado_por, 
            modificado_por: body.modificado_por, 
            fecha_creacion: body.fecha_creacion, 
            fecha_modificacion: body.fecha_modificacion, 
            estado: body.estado
        });

        origendestino.update(editarPre.dataValues, {
            where: {
                id_origen_destino: req.params.id_origen_destino
            },
            individualHooks: true,
            fields: [
                'id_origen_gasto', 
                'id_destino_gasto', 
                'terminal', 
                'caseta', 
                'guia', 
                'gratificacion', 
                'pension', 
                'taxi', 
                'permiso', 
                'gasolina', 
                'fitosanitaria', 
                'comida', 
                'talacha', 
                'fitosanitaria', 
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
            })
        }).catch(error => {
            res.status(412).json({
                OK: false,
                msg: error.message
            });
        });
    }




    app.enviarProceso = (req, res) => {
        let data = new gasto({
            estatus: req.params.estado
        });

        gasto.update(data.dataValues, {
            where: {
                id_gastos: req.params.id_gastos
            },
            individualHooks: true, 
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