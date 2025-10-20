const moment = require('moment');
const fs = require("fs");

module.exports = app => {
    // const cliente = app.database.models.Clientes;
    const origendestino = app.database.models.OrigenesDestinosGastos;
    const origen = app.database.models.OrigenesGastos;
    const destino = app.database.models.DestinosGastos;

    const gasto = app.database.models.SolicitudGastos;
    const docgasto = app.database.models.DocGastos;

    const liquidacion = app.database.models.Liquidaciones;

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

        fs.writeFileSync(directorio + body.usuario + '_' + fechacorta + '_' + body.nombre + '_' + body.descripcion, big1);
        
        doc = directorio + body.usuario + '_' + fechacorta + '_' + body.nombre + '_' + body.descripcion;

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
                    estatus: 'Depositado',
                    id_doc_gastos: result.dataValues.id_doc_gastos
                });
        
                gasto.update(data.dataValues, {
                    where: {
                        id_gastos: element.id_gastos
                    },
                    individualHooks: true, 
                    fields: ['estatus', 'id_doc_gastos']
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

    app.obtenerSolicitudesDeGastos = (req, res) => {
        gasto.findAll({
            where: {
                estatus: {
                    [Op.ne]: ['Depositado']
                },
            },
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

    app.obtenerSolicitudesDeGastosProCan = (req, res) => { 
        gasto.findAll({
            where: {
                estatus: {
                    [Op.in]: ['En Proceso', 'Cancelado']
                }   
            },
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

    app.obtenerSolicitudesDeGastosXEstatus = (req, res) => {  
        var today = new Date();
        const hoy = moment(today).format('YYYY-MM-DD');
        
        gasto.findAll({
            where: {
                // fecha_creacion: hoy,
                estatus: req.params.estatus
            },
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

    
    app.obtenerSolicitudesDeGastosDepositados = (req, res) => {  
        var today = new Date();
        const hoy = moment(today).format('YYYY-MM-DD');
        
        gasto.findAll({
            where: {
                // fecha_creacion: hoy,
                estatus: req.params.estatus
            },
            order: [['fecha_solicitud', 'DESC']],
            limit: 1500
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


    app.obtenerSolicitudesDeGastosXEstatusPorAprobar = (req, res) => {  
        gasto.findAll({
            where: {
                [Op.or]: [ { estatus: req.params.estatus }, { pendientedeaprobar: 0, estatus: 'Depositado' } ]
            },
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









    app.obtenerSolicitudesDeGastosXAuxiliar = (req, res) => {  
        gasto.findAll({
            where: {
                solicitante: req.params.solicitante
            },
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

    app.obtenerSolicitudesDeGastosPorDepositar = (req, res) => {  
        gasto.findAll({
            where: {
                estatus: 'Por Depositar',
            },
            order: [
                ['fecha_solicitud', 'DESC']
            ]
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

    app.obtenerSolicitudesDeGastosParaAdvan = (req, res) => {  
        gasto.findAll({
            where: {
                estatus: 'Por Capturar Advan',
            },
            order: [
                ['fecha_solicitud', 'DESC']
            ]
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


    app.obtenerSolicitudesDeGastosEnlace = (req, res) => {
        var mes = req.params.mes;
        var year = req.params.year;

        // Calculate the first and last day of the month
        var firstDay = new Date(year, mes - 1, 1); // First day of the month
        console.log(firstDay);
        
        var lastDay = new Date(year, mes, 0); // Last day of the month
        console.log(lastDay);

        gasto.findAll({
            where: {
                fecha_creacion: {
                    [Op.between]: [firstDay, lastDay]
                }
            },
            order: [['fecha_creacion', 'DESC']],
        }).then(result => {
            res.json({
            OK: true,
            Gastos: result
            });
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
                tipo_gasto: 'NORMAL',
                fecha_creacion: req.params.fecha_creacion
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
        var archi = body.docs;
        var today = new Date();
        const hora = moment(today).format('HH:mm');
        
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
                montotabla: inf.montotabla,
                comentarios: inf.comentarios, 
                conceptos_agrupados: inf.conceptos_agrupados, 
                pendientedeaprobar: inf.pendientedeaprobar,
                aprobado_por: inf.aprobado_por,
                aprobado_por_gerente: inf.aprobado_por_gerente,
                estatus: inf.estatus,
                fecha_creacion: inf.fecha_creacion,
                horario: obtenerHorarioID(hora)
            });

            function obtenerHorarioID(hora) {
                const [h, m] = hora.split(":").map(Number);
                const minutos = h * 60 + m;

                if (minutos >= 60 && minutos < 600) return 1;   // 01:00 - 09:59
                if (minutos >= 600 && minutos < 720) return 2;  // 10:00 - 11:59
                if (minutos >= 720 && minutos <= 990) return 3;  // 12:00 - 16:30
                if (minutos >= 991 && minutos <= 1439) return 4;  // 16:31 - 23:59

                return 4;
            }


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
                    'montotabla',
                    'comentarios', 
                    'conceptos_agrupados', 
                    'pendientedeaprobar',
                    'aprobado_por', 
                    'aprobado_por_gerente', 
                    'estatus',
                    'fecha_creacion',
                    'horario'
                ]
            })
            .then(async result => {
                console.log('success');

                if(archi.length > 0) {
                    for(let tabla of archi) {
                        var directorio = 'documentos/';
                        if(!fs.existsSync(directorio)) {
                            fs.mkdirSync(directorio, {recursive: true});
                        }

                        const [, base64Content] = tabla.archivo.split(',');
                        var big1 = Buffer.from(base64Content, 'base64');

                        var fechacorta = tabla.fecha_creacion.replace('-', '').replace('-', '').replace(' ', '').replace(':', '').replace(':', '');

                        fs.writeFileSync(directorio + tabla.usuario + '_' + fechacorta + '_' + tabla.nombre + '_' + tabla.descripcion, big1);
                        
                        doc = directorio + tabla.usuario + '_' + fechacorta + '_' + tabla.nombre + '_' + tabla.descripcion;

                        let nuevoDocumento = new docgasto({
                            folio: tabla.folio,
                            operador: tabla.operador,
                            nombre: tabla.nombre,
                            descripcion: tabla.descripcion,
                            tipo: tabla.tipo,
                            archivo: doc,
                            usuario: tabla.usuario,
                            fecha_creacion: tabla.fecha_creacion
                        });

                        docgasto.create(nuevoDocumento.dataValues, {
                            fields: [
                                'folio', 
                                'operador', 
                                'nombre', 
                                'descripcion', 
                                'tipo', 
                                'archivo',
                                'usuario',
                                'fecha_creacion'
                            ]
                        })
                        .then(result => {
                            console.log('insertado');
                            
                        }).catch(error => {
                            console.log(error);
                    
                        });   
                    }
                }
            })
            .catch(error => {
                console.log(error);
            });
        }

        res.json({
            OK: true
        })
    }

    app.crearSolicitudGastosComida = (req, res) => {
        let body = req.body;
        var today = new Date();
        const hora = moment(today).format('HH:mm');

        let nuevoRegistro = new gasto({
            fecha_solicitud: body.fecha_solicitud, 
            solicitante: body.solicitante, 
            unidad_negocio: body.unidad_negocio, 
            folio: body.folio, 
            operador: body.operador, 
            economico: body.economico, 
            origen: body.origen, 
            destino: body.destino, 
            cliente: body.cliente, 
            tipo_gasto: body.tipo_gasto, 
            concepto: body.concepto, 
            monto: body.monto, 
            comentarios: body.comentarios, 
            conceptos_agrupados: body.conceptos_agrupados, 
            pendientedeaprobar: 0,
            aprobado_por: body.aprobado_por,
            aprobado_por_gerente: body.aprobado_por_gerente,
            estatus: body.estatus,
            fecha_creacion: body.fecha_creacion,
            horario: obtenerHorarioID(hora)
        });

        function obtenerHorarioID(hora) {
            const [h, m] = hora.split(":").map(Number);
            const minutos = h * 60 + m;

            if (minutos >= 60 && minutos < 600) return 1;   // 01:00 - 09:59
            if (minutos >= 600 && minutos < 720) return 2;  // 10:00 - 11:59
            if (minutos >= 720 && minutos <= 990) return 3;  // 12:00 - 16:30
            if (minutos >= 991 && minutos <= 1439) return 4;  // 16:31 - 23:59

            return 4;
        }

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
                'comentarios', 
                'conceptos_agrupados', 
                'pendientedeaprobar', 
                'aprobado_por', 
                'aprobado_por_gerente', 
                'estatus',
                'fecha_creacion',
                'horario'
            ]
        })
        .then(async result => {
            res.json({
                OK: true,
                Gasto: result
            })
        })
        .catch(error => {
            res.status(412).json({
                OK: false,
                msg: error.message
            });
        });
    }

    app.solicitudDeGastosAceptarRechazar = (req, res) => {
        var today = new Date();
        const hoy = moment(today).format('YYYY-MM-DD HH:mm:ss');

        let data = new gasto({
            aprobado_por: req.params.aprobado_por,
            aprobado_por_gerente: req.params.estado === 'Por Aprobar Gerente' ? null : 'No Aplica',
            fecha_jun: hoy,
            pendientedeaprobar: req.params.pendientedeaprobar,
            estatus: req.params.estado
        });

        gasto.update(data.dataValues, {
            where: {
                id_gastos: req.params.id_gastos
            },
            individualHooks: true, 
            fields: ['aprobado_por', 'aprobado_por_gerente' ,'fecha_jun', 'pendientedeaprobar', 'estatus']
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

    app.solicitudDeGastosAceptarRechazarGerente = (req, res) => {
        var today = new Date();
        const hoy = moment(today).format('YYYY-MM-DD HH:mm:ss');

        let data = new gasto({
            aprobado_por_gerente: req.params.aprobado_por_gerente,
            fecha_gerente: hoy,
            estatus: req.params.estado,
        });

        gasto.update(data.dataValues, {
            where: {
                id_gastos: req.params.id_gastos
            },
            individualHooks: true, 
            fields: ['aprobado_por_gerente', 'fecha_gerente', 'estatus']
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

    app.solicitudDeGastosAceptarGratificaciones = (req, res) => {
        var today = new Date();
        const hoy = moment(today).format('YYYY-MM-DD HH:mm:ss');

        let data = new gasto({
            aprobado_por: req.params.aprobado_por,
            fecha_jun: hoy,
            pendientedeaprobar: 1
        });

        gasto.update(data.dataValues, {
            where: {
                id_gastos: req.params.id_gastos
            },
            individualHooks: true, 
            fields: ['aprobado_por', 'fecha_jun', 'pendientedeaprobar']
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







    app.obtenerUsuariosGastos = (req, res) => {
        liquidacion.findAll({
            attributes: ['usuario'],
            group: ['usuario'],
            order: [['usuario', 'DESC']],
        }).then(result => {
            res.json({
                OK: true,
                Usuarios: result,
            });
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }










    app.verificarExistenciaGastoComida = (req, res) => {  
        gasto.findAll({
            where: {
                operador: req.params.operador,
                concepto: 'Comida',
                fecha_creacion: req.params.fecha_creacion
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

    app.verificarExistenciaGastoCasa = (req, res) => {
        const today = new Date();
        const dayOfWeek = today.getDay();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
        startOfWeek.setHours(0, 0, 0, 0);

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);

        const startOfWeekDate = startOfWeek.toISOString().split('T')[0];
        const endOfWeekDate = endOfWeek.toISOString().split('T')[0];

        gasto.findAll({
            where: {
                operador: req.params.operador,
                concepto: 'Casa',
                fecha_creacion: {
                    [Op.between]: [startOfWeekDate, endOfWeekDate]
                }
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
                terminal: req.params.terminal, 
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
        var today = new Date();
        const hoy = moment(today).format('YYYY-MM-DD HH:mm:ss');

        let data = new gasto({
            estatus: req.params.estado,
            fecha_envio: hoy
        });

        gasto.update(data.dataValues, {
            where: {
                id_gastos: req.params.id_gastos
            },
            individualHooks: true, 
            fields: ['fecha_envio', 'estatus']
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

    app.cancelarRechazar = (req, res) => {

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

    app.verTablaAnticiposXOperador = (req, res) => {  
        docgasto.findAll({
            where: {
                folio: req.params.folio,
                nombre: 'Tabla de Anticipos'
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

    app.obtenerUltimaLiquidacionPagada = (req, res) => {
        const startOfWeek = new Date();
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
        startOfWeek.setHours(0, 0, 0, 0);

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);

        liquidacion.findAll({
            where: {
                estado: 'COMPLETO',
                fecha_pago: {
                    [Op.between]: [startOfWeek, endOfWeek]
                }
            },
            order: [['fecha_pago', 'DESC']],
        }).then(result => {
            res.json({
                OK: true,
                Liquidaciones: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.rechazarValeNomina = (req, res) => {
        let body = req.body;
        let archi = body.archi;

        let data = new gasto({
            comentarios_nomina: body.comentarios_nomina,
            estatus: body.estado
        });

        
        gasto.update(data.dataValues, {
            where: {
                id_gastos: req.params.id_gastos
            },
            individualHooks: true, 
            fields: ['comentarios_nomina', 'estatus']
        }).then(result => {
            console.log('success');
            
            
            // if(archi.length > 0) {
            //     for(let tabla of archi) {
                    var directorio = 'documentos/';
                    if(!fs.existsSync(directorio)) {
                        fs.mkdirSync(directorio, {recursive: true});
                    }

                    const [, base64Content] = archi.archivo.split(',');
                    var big1 = Buffer.from(base64Content, 'base64');

                    var fechacorta = archi.fecha_creacion.replace('-', '').replace('-', '').replace(' ', '').replace(':', '').replace(':', '');

                    fs.writeFileSync(directorio + archi.usuario + '_' + fechacorta + '_' + archi.nombre + '_' + archi.descripcion, big1);
                    
                    doc = directorio + archi.usuario + '_' + fechacorta + '_' + archi.nombre + '_' + archi.descripcion;

                    let nuevoDocumento = new docgasto({
                        folio: archi.folio,
                        operador: archi.operador,
                        nombre: archi.nombre,
                        descripcion: archi.descripcion,
                        tipo: archi.tipo,
                        archivo: doc,
                        usuario: archi.usuario,
                        fecha_creacion: archi.fecha_creacion
                    });

                    docgasto.create(nuevoDocumento.dataValues, {
                        fields: [
                            'folio', 
                            'operador', 
                            'nombre', 
                            'descripcion', 
                            'tipo', 
                            'archivo',
                            'usuario',
                            'fecha_creacion'
                        ]
                    })
                    .then(result => {
                        console.log('insertado');
                        
                    }).catch(error => {
                        console.log(error);
                
                    });   
            //     }
            //     res.json({
            //         OK: true,
            //         rows_affected: result[0]
            //     });
            // }
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




















    app.obtenerDeposito = (req, res) => {
        docgasto.findAll({
            where: {
                nombre: 'Deposito',
                id_doc_gastos: req.params.folio
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


    app.obtenerVerArchivo = (req, res) => {
        docgasto.findAll({
            where: {
            [Op.or]: [
                { id_doc_gastos: req.params.id_doc_gastos },
                { folio: req.params.folio }
            ]
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











    app.actualizarSolicitudGastos = (req, res) => {
        let body = req.body;

        let data = new gasto({
            fecha_solicitud: body.fecha_solicitud, 
            solicitante: body.solicitante, 
            unidad_negocio: body.unidad_negocio, 
            folio: body.folio, 
            operador: body.operador, 
            economico: body.economico, 
            origen: body.origen, 
            destino: body.destino, 
            cliente: body.cliente, 
            tipo_gasto: body.tipo_gasto, 
            concepto: body.concepto, 
            monto: body.monto, 
            comentarios: body.comentarios, 
            conceptos_agrupados: body.conceptos_agrupados, 
            aprobado_por: body.aprobado_por,
            aprobado_por_gerente: body.aprobado_por_gerente,
            id_doc_gastos: body.id_doc_gastos,
            estatus: body.estatus,
            fecha_creacion: body.fecha_creacion,
            horario: body.horario
        });

        gasto.update(data.dataValues, {
            where: {
                id_gastos: req.params.id_gastos
            },
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
                'comentarios', 
                'conceptos_agrupados', 
                'aprobado_por', 
                'aprobado_por_gerente', 
                'id_doc_gastos', 
                'estatus',
                'fecha_creacion',
                'horario'
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





    app.pasarAPorDepositar = (req, res) => {
        let data = new gasto({
            estatus: req.params.estatus
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


    app.bitacoracerrada = (req, res) => {
        let data = new gasto({
            comentarios_nomina: req.params.comentarios_nomina
        });

        gasto.update(data.dataValues, {
            where: {
                id_gastos: req.params.id_gastos
            },
            individualHooks: true, 
            fields: ['comentarios_nomina']
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




    // ESPECIALES

    app.eliminarPermanenteGasto = (req, res) => {
        gasto.findByPk(req.params.id_gastos).then(result => {
            if(!result) {
                return res.status(404).json({
                    OK: false,
                    msg: 'Gasto not found'
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












    app.obtenerGastosXEstatusParaLigar = (req, res) => {
        gasto.findAll({
            where: {
                estatus: req.params.estatus,
                id_liquidacion:{
                    [Op.is]: null
                }
            },
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















    // LIQUIDACIONES
    app.obtenerTramosParaOperadores = (req, res) => {
        origendestino.findAll({
            attributes: ['id_origen_gasto', 'id_destino_gasto'],
            group: ['id_origen_gasto', 'id_destino_gasto'],
        }).then(result => { 
            res.json({
                OK: true,
                Tramos: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }







    app.obtenerGastosParaLiquidaciones = (req, res) => {
        const where = {};

        if(req.params.fecha_solicitud != 'undefined') {
            const [startDate, endDate] = req.params.fecha_solicitud.split(' ');
            where.fecha_solicitud = {
                [Op.between]: [`${startDate} 00:00:00`, `${endDate} 23:59:59`],
            };
        }

        if(req.params.operador != 'undefined') {
            where.operador = req.params.operador;
        }

        if(req.params.economico != 'undefined') {
            where.economico = req.params.economico;
        }
        
        where.estatus = 'DEPOSITADO';
        where.id_liquidacion = null
        
        gasto.findAll({
            where,
            limit: 100,
            order: [['fecha_solicitud', 'DESC']],
        })
        .then(result => {
            res.json({
                OK: true,
                Gastos: result,
            });
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message,
            });
        });
    }

    return app;
}