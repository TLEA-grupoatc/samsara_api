const moment = require('moment');
const _ = require('lodash');
const fs = require("fs");

module.exports = app => {
    const evento = app.database.models.Eventos;
    const parosdemotor = app.database.models.ParosDeMotor;
    const cobro = app.database.models.Cobros;

    const operador = app.database.models.Operadores;
    const historico = app.database.models.HistoricoOperadores;
    const actviidaddo = app.database.models.ActividadesDo;
    const queope = app.database.models.QuejaOperador;

    const prenomina = app.database.models.Prenominas;
    const liquidacion = app.database.models.Liquidaciones;

    const docoperador = app.database.models.DocOperadores;
    
    const alerta = app.database.models.Alertas;

    const Sequelize = require('sequelize');
    const { literal } = require('sequelize');
    const axios = require('axios');
    const Op = Sequelize.Op;

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
            where: {
                estado: 'LABORANDO'
            },
            order: [
                ['nombre', 'ASC'],
                ['estado', 'DESC']
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

    app.obtenerTodosLosOperadores = (req, res) => {
        operador.findAll({
            order: [
                ['nombre', 'ASC'],
                ['estado', 'DESC']
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

    app.obtenerListaParaSeguimeinto = async (req, res)  => {
        var lista = [];
        var opes = await operador.findAll({
            order: [
                ['estado', 'DESC']
            ],
        });

        for(let i = 0; i < opes.length; i++) {
            let da = ({
                unidad: opes[i].unidad,
                numero_empleado: opes[i].numero_empleado,
                nombre: opes[i].nombre,
                estado: opes[i].estado,
                estado_actividad: opes[i].estado_actividad,
                registrado_por: opes[i].registrado_por
            });

            lista.push(da);
        }

        res.json({
            OK: true,
            Total: lista.length,
            Datos: lista
        });
    }

    app.obtenerHistoricoActividadOpe = (req, res) => {
        historico.findAll({
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

    app.cerrarQueja = (req, res) => {
        let data = new actviidaddo({
            estatus: 'CERRADO',
            fecha_cierre: moment().format('YYYY-MM-DD HH:mm:ss')
        });

        actviidaddo.update(data.dataValues, {
            where: {
                id_actividad_ope_op: req.params.id_actividad_ope_op
            },
            fields: ['estatus', 'fecha_cierre']
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

    app.obtenerOperadoresConHistorico = async (req, res) => {
        const year = req.query.year ? parseInt(req.query.year) : moment().year();
        const month = req.query.month ? parseInt(req.query.month) : moment().month() + 1; // month is 1-based for users

        const monthPadded = month.toString().padStart(2, '0');
        const startOfMonth = moment(`${year}-${monthPadded}-01`).startOf('day');
        const endOfMonth = moment(startOfMonth).endOf('month').startOf('day');
        const daysInMonth = endOfMonth.date();

        let empleadosExternos = [];

        try {
            const response = await axios.get('https://api-rh.tlea.online/obtenerEmpleados');
            empleadosExternos = response.data.Empleados || [];
        }
        catch (err) {
            empleadosExternos = [];
        }

        operador.findAll({
            where: {
                estado: 'LABORANDO'
            },
            order: [
                ['nombre', 'ASC'],
            ]
        }).then(async operadores => {
            const actividades = await historico.findAll({
                where: {
                    fecha: {
                        [Op.between]: [startOfMonth.format('YYYY-MM-DD'), endOfMonth.format('YYYY-MM-DD')],
                    }
                },
                order: [
                    ['fecha', 'ASC']
                ]
            });

            const operadoresConActividades = operadores.map(op => {
            const actividadesDelOperador = actividades.filter(h => h.nombre === op.nombre);

            // Buscar avatar usando numero_empleado0
            const empleadoExterno = empleadosExternos.find(e => Number(e.numero_empleado) == Number(op.numero_empleado));
            const avatar = empleadoExterno && empleadoExterno.avatar ? 'https://api-rh.tlea.online/' + empleadoExterno.avatar : 'https://api-rh.tlea.online/images/avatars/avatar_default.png';

            const registros = Array.from({ length: daysInMonth }, (_, index) => {
                const fecha = moment(startOfMonth).add(index, 'days').format('YYYY-MM-DD');
                const titulo = `Día ${index + 1}: ${moment(fecha).format('DD-MM')}`;
                const actividad = actividadesDelOperador.find(a => moment(a.fecha).format('YYYY-MM-DD') === fecha);

                return {
                    titulo,
                    actividad: actividad ? actividad.actividad : "",
                    comentarios: actividad ? actividad.comentarios : ""
                };
            });

            return {
                ...op.dataValues,
                avatar,
                registros
            };
            });

            res.json({
                OK: true,
                Operadores: operadoresConActividades
            });
        })
        .catch(error => {
            res.status(412).json({
                OK: false,
                msg: error.message
            });
        });
    }

    app.obtenerOperadoresConHistoricoConFiltro = async (req, res) => {
        const year = req.params.year ? parseInt(req.params.year) : moment().year();
        const month = req.params.month ? parseInt(req.params.month) : moment().month() + 1; // month is 1-based for users

        console.log(req.params.year);
        console.log(year);
        console.log(req.params.month);
        console.log(month);

        const monthPadded = month.toString().padStart(2, '0');
        const startOfMonth = moment(`${year}-${monthPadded}-01`).startOf('day');
        const endOfMonth = moment(startOfMonth).endOf('month').startOf('day');
        const daysInMonth = endOfMonth.date();

        let empleadosExternos = [];

        try {
            const response = await axios.get('https://api-rh.tlea.online/obtenerEmpleados');
            empleadosExternos = response.data.Empleados || [];
        }
        catch (err) {
            empleadosExternos = [];
        }

        operador.findAll({
            where: {
                estado: 'LABORANDO'
            },
            order: [
                ['nombre', 'ASC'],
            ]
        }).then(async operadores => {
            const actividades = await historico.findAll({
                where: {
                    fecha: {
                        [Op.between]: [startOfMonth.format('YYYY-MM-DD'), endOfMonth.format('YYYY-MM-DD')],
                    }
                },
                order: [
                    ['fecha', 'ASC']
                ]
            });

            const operadoresConActividades = operadores.map(op => {
            const actividadesDelOperador = actividades.filter(h => h.nombre === op.nombre);

            // Buscar avatar usando numero_empleado0
            const empleadoExterno = empleadosExternos.find(e => Number(e.numero_empleado) == Number(op.numero_empleado));
            const avatar = empleadoExterno && empleadoExterno.avatar ? 'https://api-rh.tlea.online/' + empleadoExterno.avatar : 'https://api-rh.tlea.online/images/avatars/avatar_default.png';

            const registros = Array.from({ length: daysInMonth }, (_, index) => {
                const fecha = moment(startOfMonth).add(index, 'days').format('YYYY-MM-DD');
                const titulo = `Día ${index + 1}: ${moment(fecha).format('DD-MM')}`;
                const actividad = actividadesDelOperador.find(a => moment(a.fecha).format('YYYY-MM-DD') === fecha);

                return {
                    titulo,
                    actividad: actividad ? actividad.actividad : "",
                    comentarios: actividad ? actividad.comentarios : ""
                };
            });

            return {
                ...op.dataValues,
                avatar,
                registros
            };
            });

            res.json({
                OK: true,
                Operadores: operadoresConActividades
            });
        })
        .catch(error => {
            res.status(412).json({
                OK: false,
                msg: error.message
            });
        });
    }




    app.obtenerScoreCardOperador = async (req, res) => {
        try {
            const operadorId = req.params.operador;
            const anio = req.params.anio || req.query.anio || moment().year();
            const meses = Array.from({ length: 12 }, (_, i) => i + 1);

            const liquidacionResult = await liquidacion.findAll({
                attributes: [
                    'operador',
                    [liquidacion.sequelize.fn('MONTH', liquidacion.sequelize.col('fecha')), 'mes'],
                    [liquidacion.sequelize.fn('SUM', liquidacion.sequelize.col('monto')), 'totalliquidacion'],
                ],
                where: {
                    operador: operadorId,
                    fecha: {
                        [Op.between]: [
                            moment(`${anio}-01-01`).format('YYYY-MM-DD'),
                            moment(`${anio}-12-31`).format('YYYY-MM-DD')
                        ],
                    }
                },
                group: ['mes', 'operador'],
                order: [[liquidacion.sequelize.fn('MONTH', liquidacion.sequelize.col('fecha')), 'ASC']]
            });

            const dieselResult = await prenomina.findAll({
                attributes: [
                    'operador',
                    [prenomina.sequelize.fn('MONTH', prenomina.sequelize.col('fecha')), 'mes'],
                    [prenomina.sequelize.fn('SUM', prenomina.sequelize.col('diferencia_diesel')), 'totaldiesel'],
                ],
                where: {
                    operador: operadorId,
                    fecha: {
                        [Op.between]: [
                            moment(`${anio}-01-01`).format('YYYY-MM-DD'),
                            moment(`${anio}-12-31`).format('YYYY-MM-DD')
                        ],
                    }
                },
                group: ['mes', 'operador'],
                order: [[prenomina.sequelize.fn('MONTH', prenomina.sequelize.col('fecha')), 'ASC']]
            });

            const diaslaboradosResult = await historico.findAll({
                attributes: [
                    'nombre',
                    [historico.sequelize.fn('MONTH', historico.sequelize.col('fecha')), 'mes'],
                    [historico.sequelize.fn('COUNT', historico.sequelize.col('actividad')), 'totaldiaslaborados'],
                ],
                where: {
                    nombre: operadorId,
                    actividad: {
                        [Op.notIn]: ['SINV', 'ISSUE', 'ISS-D', 'DESVIO', 'INCA', 'LIQ', 'POSB', 'MTTO', 'ESP']
                    },
                    fecha: {
                        [Op.between]: [
                            moment(`${anio}-01-01`).format('YYYY-MM-DD'),
                            moment(`${anio}-12-31`).format('YYYY-MM-DD')
                        ],
                    }
                },
                group: ['mes', 'nombre'],
                order: [[historico.sequelize.fn('MONTH', historico.sequelize.col('fecha')), 'ASC']]
            });

            const cartasAcuerdoResult = await docoperador.findAll({
                attributes: [
                    'operador',
                    [historico.sequelize.fn('MONTH', historico.sequelize.col('fecha_creacion')), 'mes'],
                    [historico.sequelize.fn('COUNT', historico.sequelize.col('archivo')), 'totalcartasacuerdo'],
                ],
                where: {
                    operador: operadorId,
                    descripcion: 'Carta',
                    fecha_creacion: {
                        [Op.between]: [
                            moment(`${anio}-01-01`).format('YYYY-MM-DD'),
                            moment(`${anio}-12-31`).format('YYYY-MM-DD')
                        ],
                    }
                },
                group: ['mes', 'operador'],
                order: [[historico.sequelize.fn('MONTH', historico.sequelize.col('fecha_creacion')), 'ASC']]
            });

            const sistemaDiciplinarioResult = await docoperador.findAll({
                attributes: [
                    'operador',
                    [historico.sequelize.fn('MONTH', historico.sequelize.col('fecha_creacion')), 'mes'],
                    [historico.sequelize.fn('COUNT', historico.sequelize.col('archivo')), 'totalsistemadiciplinario'],
                ],
                where: {
                    operador: operadorId,
                    descripcion: 'Sistema Disciplinario',
                    fecha_creacion: {
                        [Op.between]: [
                            moment(`${anio}-01-01`).format('YYYY-MM-DD'),
                            moment(`${anio}-12-31`).format('YYYY-MM-DD')
                        ],
                    }
                },
                group: ['mes', 'operador'],
                order: [[historico.sequelize.fn('MONTH', historico.sequelize.col('fecha_creacion')), 'ASC']]
            });

            const liquidacionPorMes = {};
            liquidacionResult.forEach(l => {
                liquidacionPorMes[l.dataValues.mes] = Number(l.dataValues.totalliquidacion) || 0;
            });

            const dieselPorMes = {};
            dieselResult.forEach(d => {
                dieselPorMes[d.dataValues.mes] = Number(d.dataValues.totaldiesel) || 0;
            });

            const cartasAcuerdoPorMes = {};
            cartasAcuerdoResult.forEach(d => {
                cartasAcuerdoPorMes[d.dataValues.mes] = Number(d.dataValues.totalcartasacuerdo) || 0;
            });

            const sitemaDiciplinarioPorMes = {};
            sistemaDiciplinarioResult.forEach(d => {
                sitemaDiciplinarioPorMes[d.dataValues.mes] = Number(d.dataValues.totalsistemadiciplinario) || 0;
            });

            const diaslaboradoPorMes = {};
            diaslaboradosResult.forEach(d => {
                diaslaboradoPorMes[d.dataValues.mes] = Number(d.dataValues.totaldiaslaborados) || 0;
            });

            const porcentajeDiasLaboradoPorMes = {};
            diaslaboradosResult.forEach(d => {
                const mes = d.dataValues.mes;
                const totalDiasLaborados = Number(d.dataValues.totaldiaslaborados) || 0;
                const diasEnMes = moment(`${anio}-${mes}`, "YYYY-M").daysInMonth();
                porcentajeDiasLaboradoPorMes[mes] = diasEnMes > 0 ? Number(((totalDiasLaborados / diasEnMes) * 100).toFixed(2)) : 0;
            });

            const scoreCard = meses.map(mes => ({
                mes,
                totalliquidacion: liquidacionPorMes[mes] || 0,
                totaldiesel: dieselPorMes[mes] || 0,
                cartaacuerdo: cartasAcuerdoPorMes[mes] || 0,
                sistemadiciplinario: sitemaDiciplinarioPorMes[mes] || 0,
                productividad: diaslaboradoPorMes[mes] || 0,
                porcentaje: porcentajeDiasLaboradoPorMes[mes] || 0,
            }));

            res.json({
                OK: true,
                ScoreCard: scoreCard
            });
        } 
        catch (error) {
            res.status(412).json({
                OK: false,
                msg: error.message
            });
        }
    }




    app.actualizarOperador = (req, res) => {
        let body = req.body;

        let nuevoRegistro = new operador({
            unidad: body.unidad,
            numero_empleado: body.numero_empleado,
            nombre: body.nombre,
            estado: body.estado,
            estado_actividad: body.estado_actividad,
            comentarios: body.comentarios,
            registrado_por: body.registrado_por,
            fecha_actividad: body.fecha_actividad
        });

        operador.update(nuevoRegistro.dataValues, {
            where: {
                id_operador: req.params.id_operador
            },
            fields: [
                'unidad',
                'numero_empleado',
                'nombre',
                'estado',
                'estado_actividad',
                'comentarios',
                'registrado_por',
                'fecha_actividad'
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

    app.eliminarOperador = (req, res) => {
        let data = new operador({
            estado: 'INACTIVO',
        });

        operador.update(data.dataValues, {
            where: {
                id_operador: req.params.id_operador
            },
            fields: ['estado']
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

    app.crearOperador = (req, res) => {
        let body = req.body;

        let nuevoRegistro = new operador({
            unidad: body.unidad,
            numero_empleado: body.numero_empleado,
            nombre: body.nombre,
            estado: body.estado,
            estado_actividad: body.estado_actividad,
            registrado_por: body.registrado_por,
            fecha_actividad: body.fecha_actividad
        });

        operador.create(nuevoRegistro.dataValues, {
            fields: [
                'unidad',
                'numero_empleado',
                'nombre',
                'estado',
                'estado_actividad',
                'registrado_por',
                'fecha_actividad'
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

    app.crearCartaOperador = (req, res) => {
        let body = req.body;

        var directorio = 'documentos/';

        if(!fs.existsSync(directorio)) {
            fs.mkdirSync(directorio, {recursive: true});
        }

        const [, base64Content] = body.archivo.split(',');
        var big1 = Buffer.from(base64Content, 'base64');

        var fechacorta = body.fecha_creacion.replace('-', '').replace('-', '').replace(' ', '').replace(':', '').replace(':', '');

        fs.writeFileSync(directorio + body.usuario + '_' + fechacorta + '_' + body.nombre, big1);
        
        doc = directorio + body.usuario + '_' + fechacorta + '_' + body.nombre;

        let nuevoDocumento = new docoperador({
            operador: body.operador,
            numero_empleado: body.numero_empleado,
            nombre: body.nombre,
            descripcion: body.descripcion,
            tipo: body.tipo,
            archivo: doc,
            comentario: body.comentario,
            fecha_creacion: body.fecha_creacion,
            usuario: body.usuario
        });

        docoperador.create(nuevoDocumento.dataValues, {
            fields: [
                'operador', 
                'numero_empleado', 
                'nombre', 
                'descripcion', 
                'tipo', 
                'archivo',
                'comentario',
                'fecha_creacion',
                'usuario'
            ]
        })
        .then(result => {
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

    app.obtenerCartas = (req, res) => {
        docoperador.findAll({
            where: {
                numero_empleado: req.params.numero_empleado
            }
        }).then(result => {
            res.json({
                OK: true,
                Cartas: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }











    app.obtenerQuejasXOperador = (req, res) => {
        queope.findAll({
            where: {
                operador: req.params.operador
            }
        }).then(result => {
            res.json({
                OK: true,
                Quejas: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.crearQuejaOperador = (req, res) => {
        let body = req.body;

        let nuevoRegistro = new queope({
            operador: body.operador, 
            realizo_queja: body.realizo_queja, 
            descripcion: body.descripcion, 
            fecha_creacion: body.fecha_creacion, 
            usuario_creacion: body.usuario_creacion, 
            fecha_modificacion: body.fecha_modificacion, 
            usuario_modificacion: body.usuario_modificacion, 
            fecha_cierre: body.fecha_cierre, 
            estatus: body.estatus
        });

        queope.create(nuevoRegistro.dataValues, {
            fields: [
                'operador', 
                'realizo_queja',
                'descripcion', 
                'fecha_creacion', 
                'usuario_creacion', 
                'fecha_modificacion', 
                'usuario_modificacion', 
                'fecha_cierre', 
                'estatus'
            ]
        })
        .then(result => {
            res.json({
                OK: true,
                Queja: result
            })
        })
        .catch(error => {
            res.status(412).json({
                OK: false,
                msg: error.message
            });
        });
    }

















    app.obtenerActividadesDOXOperador = (req, res) => {
        actviidaddo.findAll({
            where: {
                operador: req.params.operador
            }
        }).then(result => {
            res.json({
                OK: true,
                Actividades: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.crearActividadDO = (req, res) => {
        let body = req.body;

        let nuevoRegistro = new actviidaddo({
            operador: body.operador, 
            tipo: body.tipo, 
            criticidad: body.criticidad, 
            grupo: body.grupo, 
            subgrupo: body.subgrupo, 
            descripcion: body.descripcion,
            comentarios: body.comentarios,
            enbase: body.enbase,
            base: body.base,
            seguimiento_colaborador: body.seguimiento_colaborador,
            fecha_inicio: body.fecha_inicio, 
            fecha_tentativa: body.fecha_tentativa, 
            fecha_cierre: body.fecha_cierre, 
            fecha_creacion: body.fecha_creacion, 
            usuario_creacion: body.usuario_creacion, 
            fecha_modificacion: body.fecha_modificacion, 
            usuario_modificacion: body.usuario_modificacion, 
            estatus: body.estatus
        });

        actviidaddo.create(nuevoRegistro.dataValues, {
            fields: [
                'operador', 
                'tipo', 
                'criticidad', 
                'grupo', 
                'subgrupo', 
                'descripcion', 
                'comentarios', 
                'enbase', 
                'base', 
                'seguimiento_colaborador', 
                'fecha_inicio', 
                'fecha_tentativa', 
                'fecha_cierre', 
                'fecha_creacion', 
                'usuario_creacion', 
                'fecha_modificacion', 
                'usuario_modificacion', 
                'estatus'
            ]
        })
        .then(result => {
            res.json({
                OK: true,
                Actividad: result
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

    return app;
}