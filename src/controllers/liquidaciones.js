const dotenv = require('dotenv').config();
const { result, forEach } = require('lodash');
const moment = require('moment');
const fs = require("fs");
const path = require("path");
const sql = require('mssql');

module.exports = app => {
    const operador = app.database.models.Operadores;
    const prenomina = app.database.models.Prenominas;
    const liquidacion = app.database.models.Liquidaciones;
    const prenominadocs = app.database.models.PrenominasDocumentos;

    const Sequelize = require('sequelize');
    const { literal } = require('sequelize');
    const Op = Sequelize.Op;

    const config = {
        user: process.env.USERADVAN,
        password: process.env.PASSWORDADVAN,
        server: process.env.SERVERADVAN,
        database: process.env.DATABASEADVAN,
        options: {
            encrypt: false
        }
    };

    app.obtenerPlan = async (req, res) => {
        try {
            let pool = await sql.connect(config);
            
            var ops = await operador.findAll({
                where: {
                    estado: 'LABORANDO'
                }
            });
     
            var datos = [];
            var enorder = [];
            var los150 = [];
            
            for(let index = 0; index < ops.length; index++) {
                var unidaoeprador = ops[index].unidad;
                var elestado = ops[index].estado_actividad;
                let result = await pool.request().query("SELECT TOP(1) VRPD.TERMINAL_CLAVE, FORMAT(VRPD.FCH_LIQUIDACION,'yyyy-MM-dd') as FCH_LIQUIDACION, DATEDIFF(DAY, VRPD.FCH_LIQUIDACION, '" + req.params.fechaInicio + "') AS DIAS, VRPD.OPERADOR_NOMBRE, VRPD.TRACTO_NUM_ECO, VRPD.MONTO FROM vRepDedPer_sueldo AS VRPD \
                    WHERE VRPD.OPERADOR_NOMBRE = '" + ops[index].nombre + "' \
                    AND VRPD.TRACTO_NUM_ECO NOT LIKE 'PHES%' \
                    ORDER BY FCH_LIQUIDACION DESC");
                
                if(result['recordsets'][0].length > 0) {

                    var inf = ({
                        TERMINAL_CLAVE: result['recordsets'][0][0].TERMINAL_CLAVE,
                        FCH_LIQUIDACION: result['recordsets'][0][0].FCH_LIQUIDACION,
                        DIAS: result['recordsets'][0][0].DIAS,
                        OPERADOR_NOMBRE: result['recordsets'][0][0].OPERADOR_NOMBRE,
                        MONTO: result['recordsets'][0][0].MONTO,
                        actividad: elestado,
                        unidadoperador: unidaoeprador
                    });
                    
                    datos.push(inf);
                }
            }

            var datosorder = datos.sort((a, b) => b.DIAS - a.DIAS);

            for(let i = 0; i < datosorder.length; i++) {
                var unidad;
                var sinexpacio = datosorder[i].TERMINAL_CLAVE.trim();

                    if(sinexpacio === 'MTY') {
                        unidad = 'UNIDAD 1';
                    }
                    else {
                        unidad = sinexpacio.replace('MTY', 'UNIDAD ');
                    }
                    
                    var bitacoras = await obtenerBitacoras(datosorder[i].OPERADOR_NOMBRE, req.params.fechaInicio, unidad);

                    var liq;

                    if(unidad == 'UNIDAD 1') {liq = 'ALMA-TLE'}
                    if(unidad == 'UNIDAD 2') {liq = 'CECILIA'}
                    if(unidad == 'UNIDAD 3') {liq = 'VICTORIA'}
                    if(unidad == 'UNIDAD 4') {liq = 'VANESA'}
                    if(unidad == 'UNIDAD 5') {liq = 'ALEJANDRA'}
        
                    
                    if(bitacoras != undefined) {
                        if(bitacoras.bitas >= 3) {
                            if(datosorder[i].DIAS > 13 && datosorder[i].DIAS <= 50) {
                                let da = ({
                                    TERMINAL_CLAVE: datosorder[i].unidadoperador,
                                    FCH_LIQUIDACION: datosorder[i].FCH_LIQUIDACION,
                                    DIAS: datosorder[i].DIAS,
                                    OPERADOR_NOMBRE: datosorder[i].OPERADOR_NOMBRE,
                                    MONTO: datosorder[i].MONTO,
                                    kilometraje: bitacoras != undefined ? bitacoras.kilometraje : 0,
                                    bitas: bitacoras != undefined ? bitacoras.bitas : 0,
                                    primera: bitacoras != undefined ? bitacoras.primera : '',
                                    ultima: bitacoras != undefined ? bitacoras.ultima : '',
                                    diasbita: bitacoras != undefined ? bitacoras.diasbita : 0,
                                    liquidadora: liq,
                                    actividad: datosorder[i].actividad,
                                    unidades: bitacoras != undefined ? bitacoras.tractos : 0,
                                    ultimoTractoCamion: bitacoras != undefined ? bitacoras.ultimotracto : '',
                                    aplicaaliq: 'Aplica'
                                });

                                los150.push(da);
                            }
                        }
                        else {
                            if(datosorder[i].DIAS > 13 && datosorder[i].DIAS <= 50) {
    
                            }
                            else {
                                let da = ({
                                    TERMINAL_CLAVE: datosorder[i].unidadoperador,
                                    FCH_LIQUIDACION: datosorder[i].FCH_LIQUIDACION,
                                    DIAS: datosorder[i].DIAS,
                                    OPERADOR_NOMBRE: datosorder[i].OPERADOR_NOMBRE,
                                    MONTO: datosorder[i].MONTO,
                                    kilometraje: bitacoras != undefined ? bitacoras.kilometraje : 0,
                                    bitas: bitacoras != undefined ? bitacoras.bitas : 0,
                                    primera: bitacoras != undefined ? bitacoras.primera : '',
                                    ultima: bitacoras != undefined ? bitacoras.ultima : '',
                                    diasbita: bitacoras != undefined ? bitacoras.diasbita : 0,
                                    liquidadora: liq,
                                    actividad: datosorder[i].actividad,
                                    unidades: bitacoras != undefined ? bitacoras.tractos : 0,
                                    ultimoTractoCamion: bitacoras != undefined ? bitacoras.ultimotracto : '',
                                    aplicaaliq: 'No Aplica'
                                });

                                los150.push(da);
                            }
                        }
                    }
                
            }

            enorder = los150;
            
            // const subarraySize = Math.ceil(enorder.length / 5);

            // const array1 = enorder.slice(0, subarraySize);
            // const array2 = enorder.slice(subarraySize, subarraySize * 2);
            // const array3 = enorder.slice(subarraySize * 2, subarraySize * 3);
            // const array4 = enorder.slice(subarraySize * 3, subarraySize * 4);
            // const array5 = enorder.slice(subarraySize * 4, enorder.length);

            // var registros = [];

            // registros.push(
            //     {"uno": array1},
            //     {"dos": array2},
            //     {"tres": array3},
            //     {"cuatro": array4},
            //     {"cinco": array5}
            // )
            
            sql.close();
            
            res.json({
                OK: true,
                Total: enorder.length,
                Datos: enorder
            });
        }
        catch (err) {
            console.error('Error al conectar o hacer la consulta:', err);
            sql.close();
        }
    }

    app.obtenerPlanPorUnidad = async (req, res) => {
        try {
            let pool = await sql.connect(config);

            var ops = await operador.findAll({
                where: {
                    estado: 'LABORANDO'
                }
            });

            var datos = [];
            var enorder = [];
            var los150 = [];
            
            for(let index = 0; index < ops.length; index++) {
                var elestado = ops[index].estado_actividad;
                let result = await pool.request().query("SELECT TOP(1) VRPD.TERMINAL_CLAVE, FORMAT(VRPD.FCH_LIQUIDACION,'yyyy-MM-dd') as FCH_LIQUIDACION, DATEDIFF(DAY, VRPD.FCH_LIQUIDACION, '" + req.params.fechaInicio + "') AS DIAS, VRPD.OPERADOR_NOMBRE, VRPD.TRACTO_NUM_ECO, VRPD.MONTO FROM vRepDedPer_sueldo AS VRPD \
                    WHERE VRPD.OPERADOR_NOMBRE = '" + ops[index].nombre + "' \
                    AND VRPD.TRACTO_NUM_ECO NOT LIKE 'PHES%' \
                    ORDER BY FCH_LIQUIDACION DESC");
                
                if(result['recordsets'][0].length > 0) {

                    var inf = ({
                        TERMINAL_CLAVE: result['recordsets'][0][0].TERMINAL_CLAVE,
                        FCH_LIQUIDACION: result['recordsets'][0][0].FCH_LIQUIDACION,
                        DIAS: result['recordsets'][0][0].DIAS,
                        OPERADOR_NOMBRE: result['recordsets'][0][0].OPERADOR_NOMBRE,
                        MONTO: result['recordsets'][0][0].MONTO,
                        actividad: elestado
                    });
                    
                    datos.push(inf);
                }
            }
            

            var datosorder = datos.sort((a, b) => b.DIAS - a.DIAS);

            for(let i = 0; i < datosorder.length; i++) {
                var unidad;
                var sinexpacio = datosorder[i].TERMINAL_CLAVE.trim();

                if(sinexpacio == req.params.unidad) {
                    if(sinexpacio === 'MTY') {
                        unidad = 'UNIDAD 1';
                    }
                    else {
                        unidad = sinexpacio.replace('MTY', 'UNIDAD ');
                    }
                    
                    var bitacoras = await obtenerBitacoras(datosorder[i].OPERADOR_NOMBRE, req.params.fechaInicio, unidad);

                    var liq;

                    if(unidad == 'UNIDAD 1') {liq = 'ALMA-TLE'}
                    if(unidad == 'UNIDAD 2') {liq = 'CECILIA'}
                    if(unidad == 'UNIDAD 3') {liq = 'VICTORIA'}
                    if(unidad == 'UNIDAD 4') {liq = 'VANESA'}
                    if(unidad == 'UNIDAD 5') {liq = 'ALEJANDRA'}
        
                    
                    if(bitacoras != undefined) {
                        if(bitacoras.diasbita > 13 && bitacoras.diasbita <= 50) {
                            let da = ({
                                TERMINAL_CLAVE: unidad,
                                FCH_LIQUIDACION: datosorder[i].FCH_LIQUIDACION,
                                DIAS: datosorder[i].DIAS,
                                OPERADOR_NOMBRE: datosorder[i].OPERADOR_NOMBRE,
                                MONTO: datosorder[i].MONTO,
                                kilometraje: bitacoras != undefined ? bitacoras.kilometraje : 0,
                                bitas: bitacoras != undefined ? bitacoras.bitas : 0,
                                primera: bitacoras != undefined ? bitacoras.primera : '',
                                ultima: bitacoras != undefined ? bitacoras.ultima : '',
                                diasbita: bitacoras != undefined ? bitacoras.diasbita : 0,
                                liquidadora: liq,
                                actividad: datosorder[i].actividad
                            });

                            los150.push(da);
                        }
                    }
                }
            }

            enorder = los150;
            
            // const subarraySize = Math.ceil(enorder.length / 5);

            // const array1 = enorder.slice(0, subarraySize);
            // const array2 = enorder.slice(subarraySize, subarraySize * 2);
            // const array3 = enorder.slice(subarraySize * 2, subarraySize * 3);
            // const array4 = enorder.slice(subarraySize * 3, subarraySize * 4);
            // const array5 = enorder.slice(subarraySize * 4, enorder.length);

            // var registros = [];

            // registros.push(
            //     {"uno": array1},
            //     {"dos": array2},
            //     {"tres": array3},
            //     {"cuatro": array4},
            //     {"cinco": array5}
            // )
            
            // sql.close();
            
            res.json({
                OK: true,
                Total: enorder.length,
                Datos: enorder
            });
        }
        catch (err) {
            console.error('Error al conectar o hacer la consulta:', err);
            sql.close();
        }
    }

    app.obtenerPrenomina = (req, res) => {
        const where = {};

        if(req.params.fechas != 'undefined') {
            const [startDate, endDate] = req.params.fechas.split(' ');
            where.fecha = {
                [Op.between]: [`${startDate} 00:00:00`, `${endDate} 23:59:59`],
            };
        }

        if(req.params.operador != 'undefined') {
            where.operador = req.params.operador;
        }

        if(req.params.status != 'undefined') {
            where.estado = req.params.status;
        }

        if(req.params.tracto != 'undefined') {
            where.tracto = req.params.tracto;
        }

        if(req.params.local != 'undefined') {
            where.localidad = req.params.local;
        }

        prenomina.findAll({
            where,
            order: [['fecha', 'DESC']],
        })
        .then(result => {
            res.json({
                OK: true,
                Prenominas: result,
            });
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message,
            });
        });
    }

    app.obtenerLiquidacion = (req, res) => {
        const where = {};
        if(req.params.pendiente === 'PENDIENTE FIRMA') {
            liquidacion.findAll({
                where: {
                    checklist: 1,
                    estado: 'EN PROCESO'
                },
                order: [['fecha', 'DESC']],
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
        else if(req.params.pendiente === 'PENDIENTE PAGO') {
            liquidacion.findAll({
                where: {
                    firma: 1,
                      estado: 'EN PROCESO'
                },
                order: [['fecha', 'DESC']],
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
        else {
            if(req.params.fechas != 'undefined') {
                const [startDate, endDate] = req.params.fechas.split(' ');
                where.fecha = {
                    [Op.between]: [`${startDate} 00:00:00`, `${endDate} 23:59:59`],
                };
            }
    
            if(req.params.operador != 'undefined') {
                where.operador = req.params.operador;
            }
    
            if(req.params.folio != 'null') {
                where.folio = req.params.folio;
            }
    
            if(req.params.negocio != 'undefined') {
                where.terminal = req.params.negocio;
            }
    
            if(req.params.status != 'undefined') {
                where.estado = req.params.status;
            }
    
            liquidacion.findAll({
                where,
                order: [['fecha', 'DESC']],
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
    }

    app.obtenerPrenominaDocumentos = (req, res) => {
        var camp = req.params.campo;

        prenominadocs.findAll({
            where: {
                [camp]: req.params.id
            }
        }).then(result => {
            var listadeitems = [];
            var lista;

            const pres = ['OTROS DOCUMENTOS', 'PENSIONES', 'PERMISOS DE CARGA', 'PRENOMINA', 'RESETEO', 'TALACHAS', 'TICKETS DE CASETAS', 'TICKETS DE DIESEL'];
            const liquis = ['ALCOHOLIMETRO', 'ANTIDOPING', 'CARATULA DE LIQUIDACION FIRMADA', 'CARGO PARA COBRO DE LIQUIDACIONES ANTERIORES', 'COMBUSTIBLE LIQUIDADO (KM COMPUTADORA)', 'CONFIRMACION DE DEPOSITO', 'FOTOS DE PRUEBA DE AGUA', 'FOTOS DE RELLENO', 'FOTOS DE TRACTO', 'INVENTARIO', 'OTROS DOCUMENTOS', 'REPORTE DE CRUCES DE PASE', 'REPORTE DE EXCEL MANIOBAS EXTRAS', 'REPORTE DE VALES DE COMBUSTIBLE', 'REPORTE DEDUCCIONES', 'REPORTE PAGINA ULTRAGAS', 'RESUMEN DE LA LIQUIDACION (ADVAN)', 'RESUMEN DE NOMINA DEL OPERADOR', 'VALES DE COMIDA NO REGISTRADAS', 'VALES DE GASTOS EXTRAS', 'VALES DE TAXIS'];

            if(camp === 'id_liquidacion') {
                lista = liquis;
            }
            else {
                lista = pres;
            }

            for(let index = 0; index < lista.length; index++) {
                const docu = result.find(aud => aud.nombre === lista[index]);

                let rd = ({
                    id_pd: docu != undefined ? docu.id_pd : 0,
                    id_prenomina: docu != undefined ? docu.id_prenomina : null,
                    id_liquidacion: docu != undefined ? docu.id_liquidacion : null,
                    nombre: lista[index],
                    descripcion: docu != undefined ? docu.descripcion : 'Sin Archivo',
                    tipo: docu != undefined ? docu.tipo : '',
                    archivo: docu != undefined ? docu.archivo : null,
                    comentario: docu != undefined ? docu.comentario : null,
                    comentario_rechazo: docu != undefined ? docu.comentario_rechazo : null,
                    fecha_creacion: docu != undefined ? docu.fecha_creacion : null,
                    usuario: docu != undefined ? docu.usuario : null,
                    verificado: docu != undefined ? docu.verificado : null,
                    verificado_por: docu != undefined ? docu.verificado_por : null
                });

                listadeitems.push(rd);
            }
            res.json({
                OK: true,
                PrenominasDocs: listadeitems
            });
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.registrarPrenomina = (req, res) => {
        let body = req.body;
        var documentos = body.docs;

        let nuevaPre = new prenomina({
            operador: body.operador,
            tracto: body.tracto,
            localidad: body.localidad,
            terminal: body.terminal,
            folio: body.folio,
            checklist: body.checklist,
            firma: body.firma,
            pago: body.pago,
            fecha: body.fecha,
            usuario: body.usuario,
            verificado_por: body.verificado_por,
            fecha_enviado_rev: body.fecha_enviado_rev,
            comentarios: body.comentarios,
            estado: body.estado
        });

        prenomina.create(nuevaPre.dataValues, {
            fields: [
                'operador',
                'tracto',
                'localidad',
                'terminal',
                'folio',
                'checklist',
                'firma',
                'pago',
                'fecha',
                'usuario',
                'verificado_por',
                'fecha_enviado_rev',
                'comentarios',
                'estado'
            ]
        })
        .then(result => {
            var directorio = 'documentos/';

            if(!fs.existsSync(directorio)) {
                fs.mkdirSync(directorio, {recursive: true});
            }

            for(let index = 0; index < documentos.length; index++) {
                const [, base64Content] = documentos[index].archivo.split(',');
                var big1 = Buffer.from(base64Content, 'base64');

                var fechacorta = documentos[index].fecha_creacion.replace('-', '').replace('-', '').replace(' ', '').replace(':', '').replace(':', '');

                fs.writeFileSync(directorio + documentos[index].usuario + '_' + fechacorta + result.dataValues.id_prenomina + '_' + documentos[index].nombre + '_' +  documentos[index].descripcion, big1);
                
                doc = directorio + documentos[index].usuario + '_' + fechacorta + result.dataValues.id_prenomina + '_' + documentos[index].nombre + '_' +  documentos[index].descripcion;

                let nuevaPre = new prenominadocs({
                    id_prenomina: result.dataValues.id_prenomina,
                    id_liquidacion: null,
                    nombre: documentos[index].nombre,
                    descripcion: documentos[index].descripcion,
                    tipo: documentos[index].tipo,
                    archivo: doc,
                    comentario: documentos[index].comentario,
                    comentario_rechazo: documentos[index].comentario_rechazo,
                    fecha_creacion: documentos[index].fecha_creacion,
                    usuario: documentos[index].usuario,
                    verificado: 0,
                    verificado_por: null,
                    rechazado_por: null
                });
        
                prenominadocs.create(nuevaPre.dataValues, {
                    fields: [
                        'id_prenomina',
                        'id_liquidacion',
                        'nombre',
                        'descripcion',
                        'tipo',
                        'archivo',
                        'comentario',
                        'comentario_rechazo',
                        'fecha_creacion',
                        'usuario',
                        'verificado',
                        'verificado_por',
                        'rechazado_por'
                    ]
                })
                .then(result => {
                    console.log('insertado');
                })
                .catch(error => {
                    console.log(error);
                });
            }

            res.json({
                OK: true,
                Prenomina: result
            })
        })
        .catch(error => {
            res.status(412).json({
                OK: false,
                msg: error.message
            });
        });
    }

    app.registrarLiquidacion = (req, res) => {
        let body = req.body;
        var documentos = body.docs;

        let nuevaLiq = new liquidacion({
            operador: body.operador,
            terminal: body.terminal,
            folio: body.folio,
            monto: body.monto,
            checklist: body.checklist,
            firma: body.firma,
            pago: body.pago,
            fecha: body.fecha,
            usuario: body.usuario,
            verificado_por: body.verificado_por,
            fecha_verificado: body.fecha_verificado,
            cargo_firma: body.cargo_firma,
            fecha_firma: body.fecha_firma,
            cargo_pago: body.cargo_pago,
            fecha_pago: body.fecha_pago,
            fecha_enviado_rev: body.fecha_enviado_rev,
            comentarios: body.comentarios,
            estado: body.estado
        });

        liquidacion.create(nuevaLiq.dataValues, {
            fields: [
                'operador',
                'terminal',
                'folio',
                'monto',
                'checklist',
                'firma',
                'pago',
                'fecha',
                'usuario',
                'verificado_por',
                'fecha_verificado',
                'cargo_firma',
                'fecha_firma',
                'cargo_pago',
                'fecha_pago',
                'fecha_enviado_rev',
                'comentarios',
                'estado'
            ]
        })
        .then(result => {
            var directorio = 'documentos/';

            if(!fs.existsSync(directorio)) {
                fs.mkdirSync(directorio, {recursive: true});
            }

            for(let index = 0; index < documentos.length; index++) {
                const [, base64Content] = documentos[index].archivo.split(',');
                var big1 = Buffer.from(base64Content, 'base64');

                var fechacorta = documentos[index].fecha_creacion.replace('-', '').replace('-', '').replace(' ', '').replace(':', '').replace(':', '');

                fs.writeFileSync(directorio + documentos[index].usuario + '_' + fechacorta + result.dataValues.id_liquidacion + '_' + documentos[index].nombre + '_' +  documentos[index].descripcion, big1);
                
                doc = directorio + documentos[index].usuario + '_' + fechacorta + result.dataValues.id_liquidacion + '_' + documentos[index].nombre + '_' +  documentos[index].descripcion;

                let nuevaPre = new prenominadocs({
                    id_prenomina: null,
                    id_liquidacion: result.dataValues.id_liquidacion,
                    nombre: documentos[index].nombre,
                    descripcion: documentos[index].descripcion,
                    tipo: documentos[index].tipo,
                    archivo: doc,
                    comentario: documentos[index].comentario,
                    comentario_rechazo: documentos[index].comentario_rechazo,
                    fecha_creacion: documentos[index].fecha_creacion,
                    usuario: documentos[index].usuario,
                    verificado: 0,
                    verificado_por: null,
                    rechazado_por: null
                });
        
                prenominadocs.create(nuevaPre.dataValues, {
                    fields: [
                        'id_prenomina',
                        'id_liquidacion',
                        'nombre',
                        'descripcion',
                        'tipo',
                        'archivo',
                        'comentario',
                        'comentario_rechazo',
                        'fecha_creacion',
                        'usuario',
                        'verificado',
                        'verificado_por',
                        'rechazado_por'
                    ]
                })
                .then(result => {
                    console.log('insertado');
                })
                .catch(error => {
                    console.log(error);
                });
            }

            res.json({
                OK: true,
                Liquidacion: result
            })
        })
        .catch(error => {
            res.status(412).json({
                OK: false,
                msg: error.message
            });
        });
    }

    app.verificarDocumento = (req, res) => {
        let deleteunidad = new prenominadocs({
            comentario : req.params.comentario == 'undefined' ? null : req.params.comentario,
            verificado : 1,
            verificado_por : req.params.usuario
        });

        prenominadocs.update(deleteunidad.dataValues, {
            where: {
                id_pd: req.params.id
            },
            fields: ['comentario', 'verificado', 'verificado_por']
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

    app.rechazarDocumento = (req, res) => {
        let data = new prenominadocs({
            comentario_rechazo : req.params.comentario == 'undefined' ? null : req.params.comentario,
            verificado : 2,
            rechazado_por : req.params.usuario
        });

        prenominadocs.update(data.dataValues, {
            where: {
                id_pd: req.params.id
            },
            fields: ['comentario_rechazo', 'verificado', 'rechazado_por']
        }).then(result => {
            if(req.params.tipo === 'liquidacion') {
                let data = new liquidacion({
                    estado: 'RECHAZADO',
                });
        
                liquidacion.update(data.dataValues, {
                    where: {
                        id_liquidacion: req.params.idpl
                    },
                    individualHooks: true,
                    fields: ['estado']
                }).then(result => {
                }).catch(err => {
                });
            }
            else {
                let data = new prenomina({
                    estado: 'RECHAZADO',
                });
        
                prenomina.update(data.dataValues, {
                    where: {
                        id_prenomina: req.params.idpl
                    },
                    individualHooks: true,
                    fields: ['estado']
                }).then(result => {
                }).catch(err => {
                });
            }
            
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

    app.verificarPrenomina = (req, res) => {
        var camp = req.params.campo;

        let deleteunidad = new prenomina({
           checklist : 1,
           estado : 'COMPLETO',
           verificado_por : req.params.usuario
        });

        prenomina.update(deleteunidad.dataValues, {
            where: {
                [camp]: req.params.id
            },
            individualHooks: true,
            fields: ['checklist', 'estado', 'verificado_por']
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

    app.verificarLiquidacion = (req, res) => {
        var camp = req.params.campo;

        var today = new Date();
        const hoy = moment(today).format('YYYY-MM-DD HH:mm:ss');
        let deleteunidad = new liquidacion({
           checklist: 1,
           verificado_por: req.params.usuario,
           fecha_verificado: hoy,
           estado: 'EN PROCESO'
        });

        liquidacion.update(deleteunidad.dataValues, {
            where: {
                [camp]: req.params.id
            },
            individualHooks: true,
            fields: ['checklist', 'verificado_por', 'fecha_verificado', 'estado']
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

    app.verificarFA = (req, res) => {
        var body = req.body;
        var directorio = 'documentos/';

        if(!fs.existsSync(directorio)) {
            fs.mkdirSync(directorio, {recursive: true});
        }
        var datos = body.docs;
    
        for(let index = 0; index < datos.length; index++) {
            const [, base64Content] = datos[index].archivo.split(',');
            var big1 = Buffer.from(base64Content, 'base64');
    
            var fechacorta = datos[index].fecha_creacion.replace('-', '').replace('-', '').replace(' ', '').replace(':', '').replace(':', '');
            fs.writeFileSync(directorio + datos[index].usuario + '_' + fechacorta + datos[index].idd + '_' + datos[index].nombre + '_' +  datos[index].descripcion, big1);
            doc = directorio + datos[index].usuario + '_' + fechacorta + datos[index].idd + '_' + datos[index].nombre + '_' +  datos[index].descripcion;
    
            let nuevaPre = new prenominadocs({
                id_prenomina: null,
                id_liquidacion: datos[index].idd,
                nombre: datos[index].nombre,
                descripcion: datos[index].descripcion,
                tipo: datos[index].tipo,
                archivo: doc,
                comentario: datos[index].comentario,
                fecha_creacion: datos[index].fecha_creacion,
                usuario: datos[index].usuario,
                verificado: 0,
                verificado_por: null
            });
    
            prenominadocs.create(nuevaPre.dataValues, {
                fields: [
                    'id_prenomina',
                    'id_liquidacion',
                    'nombre',
                    'descripcion',
                    'tipo',
                    'archivo',
                    'comentario',
                    'fecha_creacion',
                    'usuario',
                    'verificado',
                    'verificado_por'
                ]
            })
            .then(result => {
            })
            .catch(error => {
                res.status(412).json({
                    OK: false,
                    msg: error.message
                });
            });
        }


        var today = new Date();
        const hoy = moment(today).format('YYYY-MM-DD HH:mm:ss');
        let data = new liquidacion({
            firma: 1,
            cargo_firma: body.usuario,
            fecha_firma: hoy
        });

        liquidacion.update(data.dataValues, {
            where: {
                id_liquidacion: body.idd
            },
            individualHooks: true,
            fields: ['firma', 'cargo_firma', 'fecha_firma']
        }).then(result => {
        }).catch(err => {
        });
        
        res.json({
            OK: true,
            Documentos: result
        })
    }

    app.verificarFP = (req, res) => {
        var body = req.body;
        var directorio = 'documentos/';

        if(!fs.existsSync(directorio)) {
            fs.mkdirSync(directorio, {recursive: true});
        }

        const [, base64Content] = body.archivo.split(',');
        var big1 = Buffer.from(base64Content, 'base64');

        var fechacorta = body.fecha_creacion.replace('-', '').replace('-', '').replace(' ', '').replace(':', '').replace(':', '');
        fs.writeFileSync(directorio + body.usuario + '_' + fechacorta + '_' + body.nombre + '_' +  body.descripcion, big1);
        doc = directorio + body.usuario + '_' + fechacorta + '_' + body.nombre + '_' +  body.descripcion;

        let nuevaPre = new prenominadocs({
            id_prenomina: null,
            id_liquidacion: body.idd,
            nombre: body.nombre,
            descripcion: body.descripcion,
            tipo: body.tipo,
            archivo: doc,
            comentario: body.comentario,
            fecha_creacion: body.fecha_creacion,
            usuario: body.usuario,
            verificado: 0,
            verificado_por: null
        });

        prenominadocs.create(nuevaPre.dataValues, {
            fields: [
                'id_prenomina',
                'id_liquidacion',
                'nombre',
                'descripcion',
                'tipo',
                'archivo',
                'comentario',
                'fecha_creacion',
                'usuario',
                'verificado',
                'verificado_por'
            ]
        })
        .then(result => {
            if(body.quees === 'firma') {
                let data = new liquidacion({
                    firma: 1,
                });
        
                liquidacion.update(data.dataValues, {
                    where: {
                        id_liquidacion: body.idd
                    },
                    individualHooks: true,
                    fields: ['firma']
                }).then(result => {
                }).catch(err => {
                });
            }
            else {

                var today = new Date();
                const hoy = moment(today).format('YYYY-MM-DD HH:mm:ss');
                let data = new liquidacion({
                    pago: 1,
                    cargo_pago: body.usuario,
                    fecha_pago: hoy,
                    estado: 'COMPLETO'
                });
        
                liquidacion.update(data.dataValues, {
                    where: {
                        id_liquidacion: body.idd
                    },
                    individualHooks: true,
                    fields: ['pago', 'cargo_pago', 'fecha_pago', 'estado']
                }).then(result => {
                }).catch(err => {
                });
            }

            res.json({
                OK: true,
                Documentos: result
            })
        })
        .catch(error => {
            res.status(412).json({
                OK: false,
                msg: error.message
            });
        });
    }

    app.cancelacionLiquidacion = (req, res) => {
        let data = new liquidacion({
            estado: 'CANCELADO',
        });

        liquidacion.update(data.dataValues, {
            where: {
                id_liquidacion: req.params.id_liquidacion
            },
            individualHooks: true, 
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

    app.cancelacionPrenomina = (req, res) => {
        let data = new prenomina({
            estado: 'CANCELADO',
        });

        prenomina.update(data.dataValues, {
            where: {
                id_prenomina: req.params.id_prenomina
            },
            individualHooks: true, 
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

    app.cargaDeExtras = (req, res) => {
        var body = req.body;
        var directorio = 'documentos/';

        if(!fs.existsSync(directorio)) {
            fs.mkdirSync(directorio, {recursive: true});
        }
        
        if(body.quees === 'liquidacion') {
            if(body.tipo === 'agregar') {
                for(let bd of body.docs) { 
                    const [, base64Content] = bd.archivo.split(',');
                    var big1 = Buffer.from(base64Content, 'base64');
            
                    var fechacorta = bd.fecha_creacion.replace('-', '').replace('-', '').replace(' ', '').replace(':', '').replace(':', '');
                    fs.writeFileSync(directorio + bd.usuario + '_' + fechacorta + '_' + bd.nombre + '_' +  bd.descripcion, big1);
                    doc = directorio + bd.usuario + '_' + fechacorta + '_' + bd.nombre + '_' +  bd.descripcion;
            
                    let nuevaPre = new prenominadocs({
                        id_prenomina: null,
                        id_liquidacion: bd.idd,
                        nombre: bd.nombre,
                        descripcion: bd.descripcion,
                        tipo: bd.tipo,
                        archivo: doc,
                        comentario: bd.comentario,
                        comentario_rechazo: bd.comentario_rechazo,
                        fecha_creacion: bd.fecha_creacion,
                        usuario: bd.usuario,
                        verificado: 0,
                        verificado_por: null,
                        rechazado_por: null
                    });
            
                    prenominadocs.create(nuevaPre.dataValues, {
                        fields: [
                            'id_prenomina',
                            'id_liquidacion',
                            'nombre',
                            'descripcion',
                            'tipo',
                            'archivo',
                            'comentario',
                            'comentario_rechazo',
                            'fecha_creacion',
                            'usuario',
                            'verificado',
                            'verificado_por',
                            'rechazado_por'
                        ]
                    })
                    .then(result => {
            
                        res.json({
                            OK: true,
                            Documentos: result
                        })
                    })
                    .catch(error => {
                        res.status(412).json({
                            OK: false,
                            msg: error.message
                        });
                    });
                }
            }
            else {
                for(let bd of body.docs) { 
                    const [, base64Content] = bd.archivo.split(',');
                    var big1 = Buffer.from(base64Content, 'base64');
            
                    var fechacorta = bd.fecha_creacion.replace('-', '').replace('-', '').replace(' ', '').replace(':', '').replace(':', '');
                    fs.writeFileSync(directorio + bd.usuario + '_' + fechacorta + '_' + bd.nombre + '_' +  bd.descripcion, big1);
                    doc = directorio + bd.usuario + '_' + fechacorta + '_' + bd.nombre + '_' +  bd.descripcion;
            
                    let nuevaPre = new prenominadocs({
                        id_prenomina: null,
                        id_liquidacion: bd.idd,
                        nombre: bd.nombre,
                        descripcion: bd.descripcion,
                        tipo: bd.tipo,
                        archivo: doc,
                        comentario: bd.comentario,
                        comentario_rechazo: bd.comentario_rechazo,
                        fecha_creacion: bd.fecha_creacion,
                        usuario: bd.usuario,
                        verificado: 0,
                        verificado_por: null,
                        rechazado_por: null
                    });
            
                    prenominadocs.update(nuevaPre.dataValues, {
                        where: {
                            id_pd: body.paud
                        },
                        fields: [
                            'id_prenomina',
                            'id_liquidacion',
                            'nombre',
                            'descripcion',
                            'tipo',
                            'archivo',
                            'comentario',
                            'comentario_rechazo',
                            'fecha_creacion',
                            'usuario',
                            'verificado',
                            'verificado_por',
                            'rechazado_por'
                        ]
                    })
                    .then(result => {
            
                        res.json({
                            OK: true,
                            Documentos: result
                        })
                    })
                    .catch(error => {
                        res.status(412).json({
                            OK: false,
                            msg: error.message
                        });
                    });
                }
            }
        }
        else{
            if(body.tipo === 'agregar') {
                for(let bd of body.docs) { 
                    const [, base64Content] = bd.archivo.split(',');
                    var big1 = Buffer.from(base64Content, 'base64');
            
                    var fechacorta = bd.fecha_creacion.replace('-', '').replace('-', '').replace(' ', '').replace(':', '').replace(':', '');
                    fs.writeFileSync(directorio + bd.usuario + '_' + fechacorta + '_' + bd.nombre + '_' +  bd.descripcion, big1);
                    doc = directorio + bd.usuario + '_' + fechacorta + '_' + bd.nombre + '_' +  bd.descripcion;
            
                    let nuevaPre = new prenominadocs({
                        id_prenomina: bd.idd,
                        id_liquidacion: null,
                        nombre: bd.nombre,
                        descripcion: bd.descripcion,
                        tipo: bd.tipo,
                        archivo: doc,
                        comentario: bd.comentario,
                        comentario_rechazo: bd.comentario_rechazo,
                        fecha_creacion: bd.fecha_creacion,
                        usuario: bd.usuario,
                        verificado: 0,
                        verificado_por: null,
                        rechazado_por: null
                    });
            
                    prenominadocs.create(nuevaPre.dataValues, {
                        fields: [
                            'id_prenomina',
                            'id_liquidacion',
                            'nombre',
                            'descripcion',
                            'tipo',
                            'archivo',
                            'comentario',
                            'comentario_rechazo',
                            'fecha_creacion',
                            'usuario',
                            'verificado',
                            'verificado_por',
                            'rechazado_por'
                        ]
                    })
                    .then(result => {
            
                        res.json({
                            OK: true,
                            Documentos: result
                        })
                    })
                    .catch(error => {
                        res.status(412).json({
                            OK: false,
                            msg: error.message
                        });
                    });
                }
            }
            else {
                for(let bd of body.docs) { 
                    const [, base64Content] = bd.archivo.split(',');
                    var big1 = Buffer.from(base64Content, 'base64');
            
                    var fechacorta = bd.fecha_creacion.replace('-', '').replace('-', '').replace(' ', '').replace(':', '').replace(':', '');
                    fs.writeFileSync(directorio + bd.usuario + '_' + fechacorta + '_' + bd.nombre + '_' +  bd.descripcion, big1);
                    doc = directorio + bd.usuario + '_' + fechacorta + '_' + bd.nombre + '_' +  bd.descripcion;
            
                    let nuevaPre = new prenominadocs({
                        id_prenomina: bd.idd,
                        id_liquidacion: null,
                        nombre: bd.nombre,
                        descripcion: bd.descripcion,
                        tipo: bd.tipo,
                        archivo: doc,
                        comentario: bd.comentario,
                        comentario_rechazo: bd.comentario_rechazo,
                        fecha_creacion: bd.fecha_creacion,
                        usuario: bd.usuario,
                        verificado: 0,
                        verificado_por: null,
                        rechazado_por: null
                    });
            
                    prenominadocs.update(nuevaPre.dataValues, {
                        where: {
                            id_pd: body.paud
                        },
                        fields: [
                            'id_prenomina',
                            'id_liquidacion',
                            'nombre',
                            'descripcion',
                            'tipo',
                            'archivo',
                            'comentario',
                            'comentario_rechazo',
                            'fecha_creacion',
                            'usuario',
                            'verificado',
                            'verificado_por',
                            'rechazado_por'
                        ]
                    })
                    .then(result => {
            
                        res.json({
                            OK: true,
                            Documentos: result
                        })
                    })
                    .catch(error => {
                        res.status(412).json({
                            OK: false,
                            msg: error.message
                        });
                    });
                }
            }
        }

    }

    app.enviarAVerificarPrenomina = (req, res) => {
        var today = new Date();
        const hoy = moment(today).format('YYYY-MM-DD HH:mm:ss');
        let data = new prenomina({
            fecha_enviado_rev: hoy,
            estado: req.params.estado
        });

        prenomina.update(data.dataValues, {
            where: {
                id_prenomina: req.params.id
            },
            individualHooks: true,
            fields: ['fecha_enviado_rev', 'estado']
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

    app.enviarAVerificarLiquidacion = (req, res) => {
        var today = new Date();
        const hoy = moment(today).format('YYYY-MM-DD HH:mm:ss');

        let data = new liquidacion({
            fecha_enviado_rev: hoy,
            estado: req.params.estado
        });

        liquidacion.update(data.dataValues, {
            where: {
                id_liquidacion: req.params.id
            },
            individualHooks: true,
            fields: ['fecha_enviado_rev', 'estado']
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



    function getDatesArray(startDate, endDate) {
        const dates = [];
        let currentDate = new Date(startDate);
      
        while(currentDate <= new Date(endDate)) {
          dates.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }
      
        return dates;
    }

    async function obtenerBitacoras(operador, fecha) {
        try {
            let pool = await sql.connect(config);

            let result = await pool.request().query("SELECT BT.status_bitacora, FORMAT(BT.FECHA_BITACORA,'yyyy-MM-dd') as FECHA_BITACORA, BT.CLAVE_BITACORA, BT.PREFIJO, BT.FOLIO_BITACORA, BT.DOBLE_OPERADOR, BT.RANGO_BITACORA, BT.TERMINAL_BITACORA, BT.USR_CREA, BT.TRACTO_CLAVE, BT.TRACTO_NUM_ECO, BT.FCH_CREA, BT.FCH_MOD, BT.USR_MOD, FORMAT(BT.FECHA_SALIDA,'yyyy-MM-dd HH:mm:ss') as FECHA_SALIDA, BT.MONTO_ANTICIPO_SALIDA, BT.USR_CIERR, FORMAT(BT.FCH_CIERR,'yyyy-MM-dd HH:mm:ss') as FCH_CIERR, BT.OBSERVACIONES_OPERADOR, BT.INSTRUCCIONES_ESPECIALES, BT.NOTA_SISTEMA, BT.DIAS_SERVICIO, BT.kilometraje_inicial, BT.kilometraje_final, BT.terminal_cierre, BT.LITROS_DBL_OPERADOR, BT.MONTO_DIESEL_DBL_OPERADOR, BT.LIQ_DBL_OPR, BT.STATUS_VIAJE, BT.LECT_LITROS_COMP, BT.LECT_REND_COMP, BT.negocio_clave_bit, BT.LITROS_EXCESO, BT.LITROS_CIERRE, BT.difCombustible, BT.BAN_LIQUIDACION, BT.LIQUIDACION_CLAVE, OP.NEGOCIO_CLAVE, OP.OPERADOR_CLAVE, OP.OPERADOR_NOMBRE, KO.kilometros_carga1, KO.kilometros_vacio1, KO.total_kilometros1, RUT.ruta_min as ruta FROM BITACORAS AS BT \
                INNER JOIN bitacora_recorridos AS RUT ON RUT.CLAVE_BITACORA = BT.CLAVE_BITACORA \
                INNER JOIN vordenser_bit_1eros AS OB ON OB.CLAVE_BITACORA = BT.CLAVE_BITACORA \
                INNER JOIN OPERADOR AS OP ON OP.OPERADOR_CLAVE = BT.OPERADOR_CLAVE \
                INNER JOIN vKilometrosOperador00 AS KO ON KO.FOLIO_BITACORA = BT.FOLIO_BITACORA \
                WHERE BT.BAN_LIQUIDACION = 0 AND RUT.ruta_min != 'MOEY-MOEY' AND RUT.ruta_min != 'SACA-SACA' \
                AND OP.OPERADOR_NOMBRE = '" + operador + "' \
                AND KO.OPERADOR_NOMBRE = '" + operador + "' \
                AND OB.cartaporte is not null \
                AND KO.kilometros_carga1 > 1 \
                ORDER BY FECHA_BITACORA");
            sql.close();

            var kilos = [];
            var tractos = [];
            
            for(let index = 0; index < result['recordsets'][0].length; index++) {   
                kilos.push(result['recordsets'][0][index].kilometros_carga1);   
                tractos.push(result['recordsets'][0][index].TRACTO_NUM_ECO);   
            }

            const dateArray = getDatesArray(result['recordsets'][0][0].FECHA_BITACORA, fecha);

            const uniqueTypes = new Set(tractos);
            const countTypes = uniqueTypes.size;

            var datos = ({
                kilometraje: kilos.reduce((a, b) => a + b, 0),
                bitas: kilos.length,
                primera: result['recordsets'][0][0].FECHA_BITACORA,
                ultima: result['recordsets'][0][result['recordsets'][0].length - 1].FECHA_BITACORA,
                diasbita: dateArray.length,
                tractos: countTypes,
                ultimotracto: result['recordsets'][0][result['recordsets'][0].length - 1].TRACTO_NUM_ECO
            });

            return datos
        }
        catch (error) {
            
        }
    }

    return app;
}