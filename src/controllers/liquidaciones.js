const dotenv = require('dotenv').config();
const { result, forEach } = require('lodash');
const moment = require('moment');
const fs = require("fs");
const path = require("path");
const sql = require('mssql');
const nodemailer = require('nodemailer');

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

    app.obtenerPrenominaTotal = (req, res) => {
        prenomina.findAll({
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

        if(req.params.usuario != 'undefined') {
            where.usuario = req.params.usuario;
        }

        prenomina.findAll({
            where,
            limit: 50,
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

    app.obtenerPrenominaXAnno = (req, res) => { 
        prenomina.findAll({
            where: {
                fecha: {
                    [Op.between]: [`${req.params.anno}-01-01 00:00:00`, `${req.params.anno}-12-31 23:59:59`]
                }
            },
            order: [['fecha', 'DESC']],
        }).then(result => {
            res.json({
                OK: true,
                Prenominas: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }


    app.obtenerLiquidacionTotal = (req, res) => { 
        liquidacion.findAll({
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


    app.obtenerLiquidacionXAnno = (req, res) => { 
        liquidacion.findAll({
            where: {
                fecha: {
                    [Op.between]: [`${req.params.anno}-01-01 00:00:00`, `${req.params.anno}-12-31 23:59:59`]
                }
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

    app.obtenerLiquidacion = (req, res) => {
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

        if(req.params.folio != 'undefined') {
            where.folio = req.params.folio;
        }

        if(req.params.negocio != 'undefined') {
            where.terminal = req.params.negocio;
        }
        
        
        if(req.params.status != 'undefined') {
            where.estado = req.params.status;
        }

        if(req.params.usuario != 'undefined') {
            where.usuario = req.params.usuario;
        }
        
        liquidacion.findAll({
            where,
            limit: 50,
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

    app.obtenerPrenominaDocumentos = (req, res) => {
        var camp = req.params.campo;

        prenominadocs.findAll({
            where: {
                [camp]: req.params.id
            }
        }).then(result => {
            var listadeitems = [];
            var lista;

            const pres = [
                '1 CARATULA DE PRENOMINA', 
                '2 RESETEO', 
                '3 TICKETS DE DIESEL',
                '4 TICKETS DE CASETAS', 
                '5 UREA', 
                '6 CARTAS PORTE', 
                '7 OTROS DOCUMENTOS', 
                '8 PENSIONES', 
                '9 PERMISOS DE CARGA', 
                '10 TALACHAS',
                '11 CONTRARECIBO'
            ];

            const liquis = [
                '1 LIQUIDACION DEL OPERADOR',
                '2 RECIBO DE SALARIOS DEVENGADOS Y PAGADOS',
                '3 RESUMEN DE LA NOMINA DEL OPERADOR',
                '4 PRENOMINAS',
                '5 COMBUSTIBLE LIQUIDADO (KM COMPUTADORA)',
                '6 REPORTE DE VALES DE COMBUSTIBLE',
                '7 REPORTE PAGINA ULTRAGAS',
                '8 REPORTE DEDUCCIONES',
                '9 REPORTE DE CRUCES DE PASE',
                '10 VALES DE COMIDA NO REGISTRADAS',
                '11 VALES DE INCIDENCIA',
                '12 VALES DE GASTOS EXTRAS',
                '13 VALES DE TAXIS',
                '14 CARGO PARA COBRO DE LIQUIDACIONES ANTERIORES',
                '15 REPORTE DE EXCEL MANIOBAS EXTRAS',
                '16 OTROS DOCUMENTOS',
                '17 ANTICIPOS NO  MAYORES A 30 DÍAS',
                '18 BITACORAS ANTERIORES A LA LIQUIDACIÓN'
            ];

            if(camp === 'id_liquidacion') {
                lista = liquis;
            }
            else {
                lista = pres;
            }
 
            let nombresProcesados = {};
             
            for(let index = 0; index < lista.length; index++) {
                const documentos = result.filter(aud => aud.nombre === lista[index]);
                let nombreBase = lista[index] || "Sin Nombre";
             
                if(documentos.length === 0) {
                    let nombreFinal = nombreBase;
                    if (nombresProcesados[nombreBase]) {
                        nombresProcesados[nombreBase]++;
                        nombreFinal = `${nombreBase} ${nombresProcesados[nombreBase]}`;
                    } 
                    else {
                        nombresProcesados[nombreBase] = 1;
                    }
             
                    listadeitems.push({
                        id_pd: 0,
                        id_prenomina: null,
                        id_liquidacion: null,
                        nombre: nombreFinal,
                        descripcion: 'Sin Archivo',
                        tipo: '',
                        archivo: null,
                        comentario: null,
                        comentario_rechazo: null,
                        fecha_creacion: null,
                        usuario: null,
                        verificado: null,
                        verificado_por: null,
                        rechazado_por: null
                    });
                } 
                else {
                    documentos.forEach((docu, idx) => {
                        let nombreFinal = docu.nombre || nombreBase;
                        if(nombresProcesados[nombreBase]) {
                            nombresProcesados[nombreBase]++;
                            nombreFinal = `${nombreBase} ${nombresProcesados[nombreBase]}`;
                        } 
                        else {
                            nombresProcesados[nombreBase] = 1;
                        }   
             
                        listadeitems.push({
                            id_pd: docu.id_pd || 0,
                            id_prenomina: docu.id_prenomina || null,
                            id_liquidacion: docu.id_liquidacion || null,
                            nombre: nombreFinal,
                            descripcion: docu.descripcion || 'Sin Archivo',
                            tipo: docu.tipo || '',
                            archivo: docu.archivo || null,
                            comentario: docu.comentario || null,
                            comentario_rechazo: docu.comentario_rechazo || null,
                            fecha_creacion: docu.fecha_creacion || null,
                            usuario: docu.usuario || null,
                            verificado: docu.verificado,
                            verificado_por: docu.verificado_por || null,
                            rechazado_por: docu.rechazado_por || null
                        });
                    });
                }
            }

            res.json({
                OK: true,
                Parapruebas: result,
                PrenominasDocs: listadeitems
            });
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.obtenerPrenominaDocumentosRendimientos = (req, res) => {
        var camp = req.params.campo;

        prenominadocs.findAll({
            where: {
                [camp]: req.params.id
            }
        }).then(result => {
            res.json({
                OK: true,
                Documentos: result,
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
            folio: null,
            checklist: body.checklist,
            firma: body.firma,
            pago: body.pago,
            fecha: body.fecha,
            usuario: body.usuario,
            verificado_por: body.verificado_por,
            fecha_enviado_rev: body.fecha_enviado_rev,
            diferencia_diesel: body.diferencia_diesel,
            comentarios: body.comentarios,
            estado: body.estado
        });

        prenomina.create(nuevaPre.dataValues, {
            individualHooks: true,
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
                'diferencia_diesel',
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
                if(documentos[index].comentario) {
                    let nuevaPre = new prenominadocs({
                        id_prenomina: result.dataValues.id_prenomina,
                        id_liquidacion: null,
                        nombre: documentos[index].nombre,
                        descripcion: null,
                        tipo: null,
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
                else {
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

    app.registrarSoloComentario = (req, res) => {
        let body = req.body
        var quees = body.quesehara;

        if(quees === 'agregar') {
            let nuevaPre = new prenominadocs({
                id_prenomina: body.id_prenomina,
                id_liquidacion: body.id_liquidacion,
                nombre: body.nombre,
                descripcion: null,
                tipo: null,
                archivo: null,
                comentario: body.comentario,
                comentario_rechazo: body.comentario_rechazo,
                fecha_creacion: body.fecha_creacion,
                usuario: body.usuario,
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
        else {
            // if(tipoes === 'liquidacion') {
            //     let nuevaPre = new prenominadocs({
            //         id_prenomina: body.id_prenomina,
            //         id_liquidacion: body.id_liquidacion,
            //         nombre: body.nombre,
            //         descripcion: body.descripcion,
            //         tipo: body.tipo,
            //         archivo: body.archivo,
            //         comentario: body.comentario,
            //         comentario_rechazo: body.comentario_rechazo,
            //         fecha_creacion: body.fecha_creacion,
            //         usuario: body.usuario,
            //         verificado: 0,
            //         verificado_por: null,
            //         rechazado_por: null
            //     });

            //     prenominadocs.update(nuevaPre.dataValues, {
            //         where: {
            //             id_pd: body.id_pd
            //         },
            //         fields: [
            //             'id_prenomina',
            //             'id_liquidacion',
            //             'nombre',
            //             'descripcion',
            //             'tipo',
            //             'archivo',
            //             'comentario',
            //             'comentario_rechazo',
            //             'fecha_creacion',
            //             'usuario',
            //             'verificado',
            //             'verificado_por',
            //             'rechazado_por'
            //         ]
            //     })
            //     .then(result => {
            //         res.json({
            //             OK: true,
            //             Prenomina: result
            //         })
            //     })
            //     .catch(error => {
            //         res.status(412).json({
            //             OK: false,
            //             msg: error.message
            //         });
            //     });
            // }
            // else {
                let nuevaPre = new prenominadocs({
                    id_prenomina: body.id_prenomina,
                    id_liquidacion: body.id_liquidacion,
                    nombre: body.nombre,
                    descripcion: body.descripcion,
                    tipo: body.tipo,
                    archivo: body.archivo,
                    comentario: body.comentario,
                    comentario_rechazo: body.comentario_rechazo,
                    fecha_creacion: body.fecha_creacion,
                    usuario: body.usuario,
                    verificado: 0,
                    verificado_por: null,
                    rechazado_por: null
                });

                prenominadocs.update(nuevaPre.dataValues, {
                    where: {
                        id_pd: body.id_pd
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
        // }
    }

    app.obtenerPrenominasLigadas = (req, res) => {
        prenomina.findAll({
            where: {
                folio: req.params.folio
            },
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

    app.matrixDieselOperador = async (req, res) => {
        var an = req.params.ano;
        var me = req.params.mes;
        var di = req.params.dia;

        var pres = await prenomina.findAll({
            where: {
                estado: {
                    [Op.ne]: 'CANCELADO',
                },
                fecha: {
                    [Op.between]: [`${an}-${me}-01 00:00:00`, `${an}-${me}-${di} 23:59:59`]
                }
            },
            order: [['operador', 'ASC']],
        });

        const agrupados = {};

        pres.forEach((item) => {
            const operador = item.operador;
            const dia = parseInt(item.fecha.split(' ')[0].split('-')[2], 10);
        
            if(!agrupados[operador]) {
                agrupados[operador] = { operador };
                for(let i = 1; i <= 31; i++) {
                    agrupados[operador][`diferencia${i}`] = null;
                }
            }
            
            agrupados[operador][`diferencia${dia}`] = item.diferencia_diesel;
        });
        
        const resultado = Object.values(agrupados);

        res.json({
            OK: true,
            Diferencias: resultado
        });
    }



    app.matrixDieselOperadorReporte = async (req, res) => {
        var an = req.params.ano;
        var me = req.params.mes;
        var di = req.params.dia;

        var pres = await prenomina.findAll({
            where: {
                estado: {
                    [Op.ne]: 'CANCELADO',
                },
                fecha: {
                    [Op.between]: [`2025-01-01 00:00:00`, `${an}-${me}-${di} 23:59:59`]
                }
            },
            order: [['operador', 'ASC']],
        });

        const agrupados = {};

        pres.forEach((item) => {
            const operador = item.operador;
            const dia = parseInt(item.fecha.split(' ')[0].split('-')[2], 10);
        
            if(!agrupados[operador]) {
                agrupados[operador] = { operador };
                for(let i = 1; i <= 31; i++) {
                    agrupados[operador][`diferencia${i}`] = null;
                }
            }
            
            agrupados[operador][`diferencia${dia}`] = item.diferencia_diesel;
        });
        
        const resultado = Object.values(agrupados);

        res.json({
            OK: true,
            Diferencias: resultado
        });
    }






    app.resumenMatrisOperador = async (req, res) => {
        var pres = await prenomina.findAll({
            attributes: [
                'operador',
                [liquidacion.sequelize.fn('DATEDIFF', liquidacion.sequelize.fn('NOW'), liquidacion.sequelize.col('fecha')), 'dias'],
                // [literal(`(SELECT MAX(fecha) FROM prenomina AS p2 WHERE p2.estado != 'CANCELADO' AND p2.operador = Prenominas.operador)`), 'fecha'],
                [liquidacion.sequelize.fn('COUNT', liquidacion.sequelize.col('fecha')), '7dias'],
                'estado',
            ],
            where: {
                estado: {
                    [Op.ne]: 'CANCELADO',
                },
                fecha: {
                    // [Op.between]: [`${an}-${me}-01 00:00:00`, `${an}-${me}-${di} 23:59:59`]
                    [Op.between]: [sevenDaysAgo, today]
                }
            },
        });




        prenomina.count({
            where: {
                fecha: {
                [Op.between]: [sevenDaysAgo, today]
                },
                estado: {
                [Op.ne]: 'CANCELADO'
                }
            }
        })

        console.log(pres);

        res.json({
            OK: true,
            Resumen: pres
        });
    }


    app.ultimaFecha = async (req, res) => {
        var pres = await prenomina.findAll({
            attributes: [
                'operador',
                [literal(`(SELECT MAX(fecha) FROM prenomina WHERE estado != 'CANCELADO')`), 'fecha']
            ],
            where: {
                estado: {
                    [Op.ne]: 'CANCELADO',
                },
                operador: req.params.operador
            },
            limit: 1
        });

        res.json({
            OK: true,
            Dato: pres
        });
    }




    app.matrixDieselTracto = async (req, res) => {
        var an = req.params.ano;
        var me = req.params.mes;
        var di = req.params.dia;

       var pres = await prenomina.findAll({
            where: {
                estado: {
                    [Op.ne]: 'CANCELADO',
                },
                fecha: {
                    [Op.between]: [`${an}-${me}-01 00:00:00`, `${an}-${me}-${di} 23:59:59`]
                }
            },
            order: [['tracto', 'ASC']],
        });

        const agrupados = {};

        pres.forEach((item) => {
            const tracto = item.tracto;
            const dia = parseInt(item.fecha.split(' ')[0].split('-')[2], 10);
        
            if(!agrupados[tracto]) {
                agrupados[tracto] = { tracto };
                for(let i = 1; i <= 31; i++) {
                    agrupados[tracto][`diferencia${i}`] = null;
                }
            }
        
            agrupados[tracto][`diferencia${dia}`] = item.diferencia_diesel;
        });
        
        const resultado = Object.values(agrupados);

        res.json({
            OK: true,
            Diferencias: resultado
        });
    }

    app.verFirmaLiquidacion = (req, res) => {
        prenominadocs.findAll({
            where: {
                id_liquidacion: req.params.id,
                nombre: {
                    [Op.or]: ['1 ANTIDOPING', '2 CARATULA DE LIQUIDACION FIRMADA'], 
                }
            },
            order: [['fecha_creacion', 'DESC']],
        }).then(result => {
            res.json({
                OK: true,
                Firma: result,
            });
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.verPagoLiquidacion = (req, res) => {
        prenominadocs.findAll({
            where: {
                id_liquidacion: req.params.id,
                nombre: '1 CONFIRMACION DE DEPOSITO'
            }
        }).then(result => {
            res.json({
                OK: true,
                Pago: result,
            });
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.editarPrenomina = (req, res) => {
        let body = req.body;

        let editarPre = new prenomina({
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
            diferencia_diesel: body.diferencia_diesel,
            comentarios: body.comentarios,
            estado: body.estado
        });

        prenomina.update(editarPre.dataValues, {
            where: {
                id_prenomina: req.params.id_prenomina
            },
            individualHooks: true,
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
                'diferencia_diesel',
                'comentarios',
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
            diferencia_diesel: body.diferencia_diesel,
            verificado_diesel_por: null,
            fecha_verificado_diesel: null,
            aplica_cobro_diesel: null,
            aplica_cobro_por: null,
            diferenciakilometros: null,
            estado: body.estado
        });

        liquidacion.create(nuevaLiq.dataValues, {
            individualHooks: true,
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
                'diferencia_diesel',
                'verificado_diesel_por',
                'fecha_verificado_diesel',
                'aplica_cobro_diesel',
                'aplica_cobro_por',
                'diferenciakilometros',
                'estado'
            ]
        })
        .then(async result => {
            var directorio = 'documentos/';
            var pres = body.prenominas;

            if(!fs.existsSync(directorio)) {
                fs.mkdirSync(directorio, {recursive: true});
            }

            for(let index = 0; index < documentos.length; index++) {
                if(documentos[index].comentario) {
                    let nuevaPre = new prenominadocs({
                        id_prenomina: null,
                        id_liquidacion: result.dataValues.id_liquidacion,
                        nombre: documentos[index].nombre,
                        descripcion: null,
                        tipo: null,
                        archivo: null,
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
                else {
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
            }

            if(pres.length > 0) {       
                for(let indexPre = 0; indexPre < pres.length; indexPre++) {
                    let editarPre = new prenomina({
                        folio: body.folio
                    });

                    prenomina.update(editarPre.dataValues, {
                        where: {
                            id_prenomina: pres[indexPre]
                        },
                        individualHooks: true,
                        fields: [
                            'folio',
                        ]
                    }).then(result => {
                    }).catch(error => {
                    });
                }
            }

            setTimeout(async () => {
                if(body.diferencia_diesel == 1) {
                    var listadocumentosporemail = [];

                    const losdocs = await prenominadocs.findAll({
                        where: {
                            id_liquidacion: result.dataValues.id_liquidacion
                        }
                    });
                    
                    for(let index = 0; index < losdocs.length; index++) {
                        listadocumentosporemail.push('https://apisamsara.tlea.online/' + losdocs[index].archivo)
                    }

                    let transporter = nodemailer.createTransport({
                        host: "smtp-mail.outlook.com",
                        port: 587,
                        secure: false,
                        auth: {
                          user: process.env.CORREOFLUJO,
                          pass: process.env.CONTRACORREOFLUJO
                        },
                        tls: {
                          ciphers: 'SSLv3'
                        }
                    });

                    let itemsHtml = listadocumentosporemail.map(item => `<li>${item}</li>`);

                    let mailOptions = {
                        from: '"Flujo de Liquidaciones" <' + process.env.CORREOFLUJO + '>',
                        to: 'david.martinez@tlea.com.mx, jaime.olivares@tlea.com.mx, luz.medina@tlea.com.mx, abraham.rodriguez@tlea.com.mx',
                        subject: 'Diferencia de Diesel',
                        html: `<h3>Folio: ${body.folio}, Operador: ${body.operador}</h3><br><h4>Liquidador: ${body.usuario}</h4><br><h4>Documentos</h4><br><ul>${itemsHtml}</ul>`
                    };
                    
                    
                    transporter.sendMail(mailOptions, (error, info) => {
                        if(error) {
                            return console.log(error);
                        }
                    });
                }
            }, 10000);
 
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
    
    app.editarLiquidacion = (req, res) => {
        let body = req.body;

        let editarLiq = new liquidacion({
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
            diferencia_diesel: body.diferencia_diesel,
            verificado_diesel_por: body.verificado_diesel_por,
            fecha_verificado_diesel: body.fecha_verificado_diesel,
            aplica_cobro_diesel: body.aplica_cobro_diesel,
            aplica_cobro_por: body.aplica_cobro_por,
            diferenciakilometros: body.diferenciakilometros,
            estado: body.estado
        });

        liquidacion.update(editarLiq.dataValues, {
            where: {
                id_liquidacion: req.params.id_liquidacion
            },
            individualHooks: true,
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
                'diferencia_diesel',
                'verificado_diesel_por',
                'fecha_verificado_diesel',
                'aplica_cobro_diesel',
                'aplica_cobro_por',
                'diferenciakilometros',
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

    app.verificarDocumento = (req, res) => {
        let deleteunidad = new prenominadocs({
            comentario_rechazo : req.params.comentario == 'undefined' ? null : req.params.comentario,
            verificado : 1,
            verificado_por : req.params.usuario
        });

        prenominadocs.update(deleteunidad.dataValues, {
            where: {
                id_pd: req.params.id
            },
            fields: ['comentario_rechazo', 'verificado', 'verificado_por']
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
            comentario_rechazo: req.params.comentario,
            verificado: 2,
            rechazado_por: req.params.usuario
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
           estado: 'PENDIENTE DE FIRMA'
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
                comentario_rechazo: datos[index].comentario_rechazo,
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
                    'comentario_rechazo',
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
            fecha_firma: hoy,
            estado: 'PENDIENTE DE PAGO'
        });

        liquidacion.update(data.dataValues, {
            where: {
                id_liquidacion: body.idd
            },
            individualHooks: true,
            fields: ['firma', 'cargo_firma', 'fecha_firma', 'estado']
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
            comentario_rechazo: body.comentario_rechazo,
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
                'comentario_rechazo',
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
                        verificado_por: bd.verificado_por,
                        rechazado_por: bd.rechazado_por
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
                        verificado_por: bd.verificado_por,
                        rechazado_por: bd.rechazado_por
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

    app.obtenerPrenominaCompleto = (req, res) => {
        prenomina.findAll({
            where: {
                checklist: 1,
                estado: 'COMPLETO',
                folio: {
                    [Op.is]: null,
                },
                fecha: {
                    [Op.between]: [`${req.params.fechas.split(' ')[0]} 00:00:00`, `${req.params.fechas.split(' ')[1]} 23:59:59`],
                }
            },
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

    app.obtenerInfoOperador = (req, res) => {
        liquidacion.findAll({
            where: {
                operador: req.params.operador,
            },
            order: [['fecha', 'DESC']],
        }).then(result => {
            res.json({
                OK: true,
                Liquidaciones : result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.agregarDiferenciaHechas = (req, res) => {

        var body = req.body;
        let data = new liquidacion({
            diferencia_diesel: 1,
            estado: 'REVISION DE DIFERENCIA'
        });

        liquidacion.update(data.dataValues, {
            where: {
                id_liquidacion: req.params.id_liquidacion
            },
            individualHooks: true, 
            fields: ['diferencia_diesel', 'estado']
        }).then(result => {
  
            setTimeout(async () => {

                    let transporter = nodemailer.createTransport({
                        host: "smtp-mail.outlook.com",
                        port: 587,
                        secure: false,
                        auth: {
                            user: process.env.CORREOFLUJO,
                            pass: process.env.CONTRACORREOFLUJO
                        },
                        tls: {
                          ciphers: 'SSLv3'
                        }
                    });


                    let mailOptions = {
                        from: '"Flujo de Liquidaciones" <' + process.env.CORREOFLUJO + '>',
                        to: 'david.martinez@tlea.com.mx, jaime.olivares@tlea.com.mx, luz.medina@tlea.com.mx, abraham.rodriguez@tlea.com.mx',
                        subject: 'Diferencia de Diesel',
                        html: `<h3>Folio: ${body.folio}, Operador: ${body.operador}</h3><br><h4>Liquidador: ${body.usuario}</h4>`
                    };
                    
                    
                    transporter.sendMail(mailOptions, (error, info) => {
                        if(error) {
                            return console.log(error);
                        }
                    });
                
            }, 5000);

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

    app.obtenerLiquidacionesPorEstatus = (req, res) => {
        liquidacion.findAll({
            where: {
                estado: req.params.estado,
            },
            order: [['fecha', 'DESC']],
        }).then(result => {
            res.json({
                OK: true,
                Liquidaciones : result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.obtenerPrenominasPorEstatus = (req, res) => {
        prenomina.findAll({
            where: {
                estado: req.params.estado,
            },
            order: [['fecha', 'DESC']],
        }).then(result => {
            res.json({
                OK: true,
                Prenominas : result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.obtenerPrenominaDocumentosParaFirma = (req, res) => {
        var camp = req.params.campo;

        prenominadocs.findAll({
            where: {
                [camp]: req.params.id
            },
        }).then(result => {
            var listadeitems = [];
            var lista;

            const pres = [
                '1 CARATULA DE PRENOMINA', 
                '2 RESETEO', 
                '3 TICKETS DE DIESEL',
                '4 TICKETS DE CASETAS', 
                '5 UREA', 
                '6 CARTAS PORTE', 
                '7 OTROS DOCUMENTOS', 
                '8 PENSIONES', 
                '9 PERMISOS DE CARGA', 
                '10 TALACHAS'
            ];

            const liquis = [
                '1 LIQUIDACION DEL OPERADOR',
                '2 RECIBO DE SALARIOS DEVENGADOS Y PAGADOS',
                '3 RESUMEN DE LA NOMINA DEL OPERADOR',
                '4 PRENOMINAS',
                '5 COMBUSTIBLE LIQUIDADO (KM COMPUTADORA)',
                '6 REPORTE DE VALES DE COMBUSTIBLE',
                '7 REPORTE PAGINA ULTRAGAS',
                '8 REPORTE DEDUCCIONES',
                '9 REPORTE DE CRUCES DE PASE',
                '10 VALES DE COMIDA NO REGISTRADAS',
                '11 VALES DE INCIDENCIA',
                '12 VALES DE GASTOS EXTRAS',
                '13 VALES DE TAXIS',
                '14 CARGO PARA COBRO DE LIQUIDACIONES ANTERIORES',
                '15 REPORTE DE EXCEL MANIOBAS EXTRAS',
                '16 OTROS DOCUMENTOS',
                // '17 FOTOS DE PRUEBA DE AGUA',
                // '18 FOTOS DE RELLENO',
                // '19 FOTOS DE TRACTO',
                // '20 FOTOS DE INVENTARIO',
                '21 ALCOHOLIMETRO'
            ];

            if(camp === 'id_liquidacion') {
                lista = liquis;
            }
            else {
                lista = pres;
            }
 
            let nombresProcesados = {};
             
            for(let index = 0; index < 3; index++) {
                const documentos = result.filter(aud => aud.nombre === lista[index]);
                let nombreBase = lista[index] || "Sin Nombre";
             
                if(documentos.length === 0) {
                    let nombreFinal = nombreBase;
                    if (nombresProcesados[nombreBase]) {
                        nombresProcesados[nombreBase]++;
                        nombreFinal = `${nombreBase} ${nombresProcesados[nombreBase]}`;
                    } 
                    else {
                        nombresProcesados[nombreBase] = 1;
                    }
             
                    listadeitems.push({
                        id_pd: 0,
                        id_prenomina: null,
                        id_liquidacion: null,
                        nombre: nombreFinal,
                        descripcion: 'Sin Archivo',
                        tipo: '',
                        archivo: null,
                        comentario: null,
                        comentario_rechazo: null,
                        fecha_creacion: null,
                        usuario: null,
                        verificado: null,
                        verificado_por: null,
                        rechazado_por: null
                    });
                } 
                else {
                    documentos.forEach((docu, idx) => {
                        let nombreFinal = docu.nombre || nombreBase;
                        if(nombresProcesados[nombreBase]) {
                            nombresProcesados[nombreBase]++;
                            nombreFinal = `${nombreBase} ${nombresProcesados[nombreBase]}`;
                        } 
                        else {
                            nombresProcesados[nombreBase] = 1;
                        }   
             
                        listadeitems.push({
                            id_pd: docu.id_pd || 0,
                            id_prenomina: docu.id_prenomina || null,
                            id_liquidacion: docu.id_liquidacion || null,
                            nombre: nombreFinal,
                            descripcion: docu.descripcion || 'Sin Archivo',
                            tipo: docu.tipo || '',
                            archivo: docu.archivo || null,
                            comentario: docu.comentario || null,
                            comentario_rechazo: docu.comentario_rechazo || null,
                            fecha_creacion: docu.fecha_creacion || null,
                            usuario: docu.usuario || null,
                            verificado: docu.verificado,
                            verificado_por: docu.verificado_por || null,
                            rechazado_por: docu.rechazado_por || null
                        });
                    });
                }
            }

            res.json({
                OK: true,
                Parapruebas: result,
                PrenominasDocs: listadeitems
            });
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.ligarNuevasPrenominas = (req, res) => {
        var body = req.body; 

        var pres = body.prenominas;
        
        if(pres.length > 0) {       
            for(let indexPre = 0; indexPre < pres.length; indexPre++) {
                let editarPre = new prenomina({
                    folio: req.params.folio
                });

                prenomina.update(editarPre.dataValues, {
                    where: {
                        id_prenomina: pres[indexPre]
                    },
                    fields: [
                        'folio',
                    ]
                }).then(result => {
                    res.json({
                        OK: true,
                        rows_affected: result[0]
                    });
                }).catch(error => {
                    res.status(412).json({
                        OK: false,
                        msg: error
                    });
                });
            }
        }
    }

    app.quitarPrenominasLigadas = (req, res) => {
        var body = req.body; 

        var pres = body.prenominas;
        
        if(pres.length > 0) {       
            for(let indexPre = 0; indexPre < pres.length; indexPre++) {
                let editarPre = new prenomina({
                    folio: null
                });

                prenomina.update(editarPre.dataValues, {
                    where: {
                        id_prenomina: pres[indexPre]
                    },
                    fields: [
                        'folio',
                    ]
                }).then(result => {
                    res.json({
                        OK: true,
                        rows_affected: result[0]
                    });
                }).catch(error => {
                    res.status(412).json({
                        OK: false,
                        msg: error
                    });
                });
            }
        }
    }


    // rendimientos
    app.cargarEvidenciaRendimientos = (req, res) => {
            let data = new liquidacion({
                aplica_cobro_diesel: body.aplica_cobro_diesel,
                aplica_cobro_por: body.aplica_cobro_por,
                estado: 'EN PROCESO'
            });
    
            liquidacion.update(data.dataValues, {
                where: {
                    id_liquidacion: body.idd
                },
                individualHooks: true,
                fields: ['fecha_verificado_diesel', 'aplica_cobro_por', 'estado']
            }).then(result => {

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

    app.verEvidenciadeRendimientos = (req, res) => {
        prenominadocs.findAll({
            where: {
                id_liquidacion: req.params.id,
                nombre: '1 EVIDENCIA DIFERENCIA'
            }
        }).then(result => {
            res.json({
                OK: true,
                Evidencia: result,
            });
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.guardarDiferenciaKM = (req, res) => {
        let data = new liquidacion({
            diferenciakilometros: req.params.diferenciakm,
        });

        liquidacion.update(data.dataValues, {
            where: {
                id_liquidacion: req.params.id_liquidacion
            },
            individualHooks: true,
            fields: ['diferenciakilometros']
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

    app.guardarDiferenciaKMPrenomina = (req, res) => {
        let data = new prenomina({
            diferenciakilometros: req.params.diferenciakm,
        });

        prenomina.update(data.dataValues, {
            where: {
                id_prenomina: req.params.id_prenomina
            },
            individualHooks: true,
            fields: ['diferenciakilometros']
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

    app.autorizacionDeCobro = (req, res) => {
        var body = req.body;

        let data = new liquidacion({
            verificado_diesel_por: body.verificado_diesel_por,
            fecha_verificado_diesel: body.fecha_verificado_diesel,
            
            dieselrendimientos: body.dieselrendimientos,
            fecha_inicio_rendimientos: body.fecha_inicio_rendimientos,
            fecha_fin_rendimientos: body.fecha_fin_rendimientos,
            dias_rendimientos: body.dias_rendimientos,
            investigacion_rendimientos: body.investigacion_rendimientos,

            aplicaautorizacion: body.aplicaautorizacion,
            aplica_cobro_diesel: body.aplica_cobro_diesel,
            aplica_cobro_por: body.aplica_cobro_por,
            estado: body.estado
        });

        liquidacion.update(data.dataValues, {
            where: {
                id_liquidacion: req.params.id_liquidacion
            },
            individualHooks: true, 
            fields: ['verificado_diesel_por', 'fecha_verificado_diesel', 'dieselrendimientos', 'fecha_inicio_rendimientos', 'fecha_fin_rendimientos', 'dias_rendimientos', 'investigacion_rendimientos', 'aplicaautorizacion', 'aplica_cobro_diesel', 'aplica_cobro_por', 'estado']
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

    app.respuestaDeAutorizacion = (req, res) => {
        var body = req.body;

        let data = new liquidacion({
            aplica_cobro_diesel: body.aplica_cobro_diesel,
            aplica_cobro_por: body.aplica_cobro_por,
            comentarioautorizacion: body.comentarioautorizacion,
            estado: body.estado
        });

        liquidacion.update(data.dataValues, {
            where: {
                id_liquidacion: req.params.id_liquidacion
            },
            individualHooks: true, 
            fields: ['aplica_cobro_diesel', 'aplica_cobro_por', 'comentarioautorizacion', 'estado']
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

    app.cargarDocumentosRendimientos = (req, res) => {
        var body = req.body;
        var directorio = 'documentos/';

        if(!fs.existsSync(directorio)) {
            fs.mkdirSync(directorio, {recursive: true});
        }

        for(let bd of body.docs) { 
            const [, base64Content] = bd.archivo.split(',');
            var big1 = Buffer.from(base64Content, 'base64');
    
            var fechacorta = bd.fecha_creacion.replace('-', '').replace('-', '').replace(' ', '').replace(':', '').replace(':', '');
            fs.writeFileSync(directorio + bd.usuario + '_' + fechacorta + '_' + bd.nombre + '_' +  bd.descripcion, big1);
            doc = directorio + bd.usuario + '_' + fechacorta + '_' + bd.nombre + '_' +  bd.descripcion;
    
            let nuevaPre = new prenominadocs({
                id_prenomina: null,
                id_liquidacion: bd.id_liquidacion,
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
                    DocumentosExtras: result
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







    // especiales
    app.eliminarPermanentePrenominas = (req, res) => {
        prenomina.findByPk(req.params.id_prenomina).then(result => {
            if(!result) {
                return res.status(404).json({
                    OK: false,
                    msg: 'Prenomina not found'
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
    
    app.eliminarPermanenteLiquidaciones = (req, res) => {
        liquidacion.findByPk(req.params.id_liquidacion).then(result => {
            if(!result) {
                return res.status(404).json({
                    OK: false,
                    msg: 'Liquidacion not found'
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
    
    app.eliminarPermanenteDocumentos = (req, res) => {
        prenominadocs.findByPk(req.params.id_pd).then(result => {
            if(!result) {
                return res.status(404).json({
                    OK: false,
                    msg: 'Documento not found'
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

    app.listaDeFolios = (req, res) => {
        liquidacion.findAll({
            where: {
                fecha: {
                    [Op.between]: [`${req.params.fechas.split(' ')[0]} 00:00:00`, `${req.params.fechas.split(' ')[1]} 23:59:59`],
                }
            },
            order: [['fecha', 'DESC']],
        }).then(result => {
            res.json({
                OK: true,
                Folios: result,
            });
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    // docuemntos extras en pres
    app.cargarDocumentosExtra = (req, res) => {
        var body = req.body;
        var directorio = 'documentos/';

        if(!fs.existsSync(directorio)) {
            fs.mkdirSync(directorio, {recursive: true});
        }

        for(let bd of body.docs) { 
            const [, base64Content] = bd.archivo.split(',');
            var big1 = Buffer.from(base64Content, 'base64');
    
            var fechacorta = bd.fecha_creacion.replace('-', '').replace('-', '').replace(' ', '').replace(':', '').replace(':', '');
            fs.writeFileSync(directorio + bd.usuario + '_' + fechacorta + '_' + bd.nombre + '_' +  bd.descripcion, big1);
            doc = directorio + bd.usuario + '_' + fechacorta + '_' + bd.nombre + '_' +  bd.descripcion;
    
            let nuevaPre = new prenominadocs({
                id_prenomina: bd.id_prenomina,
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
                    DocumentosExtras: result
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

    app.cargarDocumentosExtraLiquidacion = (req, res) => {
        var body = req.body;
        var directorio = 'documentos/';

        if(!fs.existsSync(directorio)) {
            fs.mkdirSync(directorio, {recursive: true});
        }

        for(let bd of body.docs) { 
            const [, base64Content] = bd.archivo.split(',');
            var big1 = Buffer.from(base64Content, 'base64');
    
            var fechacorta = bd.fecha_creacion.replace('-', '').replace('-', '').replace(' ', '').replace(':', '').replace(':', '');
            fs.writeFileSync(directorio + bd.usuario + '_' + fechacorta + '_' + bd.nombre + '_' +  bd.descripcion, big1);
            doc = directorio + bd.usuario + '_' + fechacorta + '_' + bd.nombre + '_' +  bd.descripcion;
    
            let nuevaPre = new prenominadocs({
                id_prenomina: null,
                id_liquidacion: bd.id_liquidacion,
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
                    DocumentosExtras: result
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

    app.reactivarPrenomina = (req, res) => {
        let data = new prenomina({
            estado: 'EN PROCESO',
            checklist: 0
            
        });

        prenomina.update(data.dataValues, {
            where: {
                id_prenomina: req.params.id_prenomina
            },
            individualHooks: true, 
            fields: ['estado', 'checklist']
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

    app.reactivarLiquidacion = (req, res) => {
        let data = new liquidacion({
            estado: 'EN PROCESO',
            checklist: 0   
        });

        liquidacion.update(data.dataValues, {
            where: {
                id_liquidacion: req.params.id_liquidacion
            },
            individualHooks: true, 
            fields: ['estado', 'checklist']
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

    app.reactivarLiquidacionEnRendimientos = (req, res) => {
        let data = new liquidacion({
            estado: 'EN PROCESO',
            diferencia_diesel: 0
        });

        liquidacion.update(data.dataValues, {
            where: {
                id_liquidacion: req.params.id_liquidacion
            },
            individualHooks: true, 
            fields: ['estado', 'diferencia_diesel']
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

    app.resumenLiquidaciones = (req, res) => {
        var today = new Date();
        const hoy = moment(today).format('YYYY-MM-DD');
        const hoydia = ' 00:00:00';
        const hoynoche = ' 23:59:59';
        liquidacion.findAll({
            attributes: [
                'terminal',
                'estado',
                [liquidacion.sequelize.fn('COUNT', liquidacion.sequelize.col('estado')), 'total'],
            ],
            where: {
                // fecha: {
                //     [Op.between]: [hoy + hoydia, hoy + hoynoche],
                // },
                estado: {
                    [Op.ne]: 'OCULTO'
                }
            },
            group: ['terminal', 'estado'],
            order: [['terminal', 'ASC'], ['estado', 'ASC']],
        }).then(result => {
            res.json({
                OK: true,
                Resumen : result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }




    app.obtenerTotalLocalidadDiario = (req, res) => {
        prenomina.findAll({
            attributes: [
                'localidad',
                [Sequelize.fn('COUNT', Sequelize.col('localidad')), 'total']
            ],
            where: { 
                fecha: {
                    [Op.between]: [`${req.params.fecha} 00:00:00`, `${req.params.fecha} 23:59:59`]
                }
            },
            group: ['localidad'],
            order: ['localidad']
        }).then(result => {
            res.json({
                OK: true,
                Totales: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.obtenerTotalEstatusPrenomina = (req, res) => {
        if(req.params.localidad === 'Todas') {
            prenomina.findAll({
                attributes: [
                    'estado',
                    [Sequelize.fn('COUNT', Sequelize.col('estado')), 'total']
                ],
                where: {
                    estado: {
                        [Op.notIn]: ['COMPLETO', 'CANCELADO'],  
                    }
                },
                group: ['estado'],
                order: ['estado']
            }).then(result => {
                res.json({
                    OK: true,
                    Totales: result
                })
            })
            .catch(error => {
                res.status(412).json({
                    msg: error.message
                });
            });
        }
        else {
            prenomina.findAll({
                attributes: [
                    'estado',
                    [Sequelize.fn('COUNT', Sequelize.col('estado')), 'total']
                ],
                where: {
                    localidad: req.params.localidad,
                    estado: {
                        [Op.notIn]: ['COMPLETO', 'CANCELADO'],  
                    }
                },
                group: ['estado'],
                order: ['estado']
            }).then(result => {
                res.json({
                    OK: true,
                    Totales: result
                })
            })
            .catch(error => {
                res.status(412).json({
                    msg: error.message
                });
            }); 
        }
    }



    app.obtenerTotalEstatusLiquidacion = (req, res) => {
        liquidacion.findAll({
            attributes: [
                'estado',
                [Sequelize.fn('COUNT', Sequelize.col('estado')), 'total']
            ],
            where: {
                estado: {
                    [Op.notIn]: ['OCULTO', 'COMPLETO', 'CANCELADO'],  
                },
                fecha: {
                    [Op.between]: [`${req.params.fecha} 00:00:00`, `${req.params.fecha} 23:59:59`]
                }
            },
            group: ['estado'],
            order: ['estado']
        }).then(result => {
            res.json({
                OK: true,
                Totales: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.obtenerTotalEstatusLiquidacionXUnidad = (req, res) => {
        liquidacion.findAll({
            attributes: [
                'estado',
                [Sequelize.fn('COUNT', Sequelize.col('estado')), 'total']
            ],
            where: {
                terminal: req.params.terminal,
                estado: {
                    [Op.notIn]: ['OCULTO', 'COMPLETO', 'CANCELADO'],  
                }
            },
            group: ['estado'],
            order: ['estado']
        }).then(result => {
            res.json({
                OK: true,
                Totales: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    


    function getDatesArray(startDate, endDate) {
        const dates = [];
        let currentDate = new Date(startDate);
      
        let a = 0; // Declarar a fuera del bucle para que sea persistente
        while (currentDate <= new Date(endDate)) {
            a++; // Incrementar a en cada iteración
            dates.push({
                dia: a,
                fecha: new Date(currentDate),
                datos: []
            });
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