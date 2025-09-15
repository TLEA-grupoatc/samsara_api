const dotenv = require('dotenv').config();
const moment = require('moment');
const sql = require('mssql');
const _ = require('lodash');
const { log, logger } = require('handlebars');

module.exports = app => {
    const Samsara = require("@api/samsara-dev-rel");
    Samsara.auth(process.env.KEYSAM);

    const unidad = app.database.models.Unidades;
    const geogaso = app.database.models.GeoGaso;
    const itine = app.database.models.Itinerarios;
    const axios = require('axios');

    const config = {
        user: process.env.USERADVAN,
        password: process.env.PASSWORDADVAN,
        server: process.env.SERVERADVAN,
        database: process.env.DATABASEADVAN,
        options: {
            encrypt: false
        }
    };

    app.connectToDatabase = async (req, res) => {
        try {
            let pool = await sql.connect(config);
            // let result = await pool.request().query("SELECT TOP(1) BT.FOLIO_BITACORA, FORMAT(BT.FECHA_BITACORA,'yyyy-MM-dd') as FECHA_BITACORA, OP.OPERADOR_CLAVE, OP.OPERADOR_NOMBRE, BT.TRACTO_NUM_ECO, BT.STATUS_BITACORA FROM BITACORAS AS BT\
            //     INNER JOIN OPERADOR AS OP ON OP.OPERADOR_CLAVE = BT.OPERADOR_CLAVE\
            //     WHERE BT.TRACTO_NUM_ECO = '" + req.unidad + "' AND STATUS_BITACORA = 0\
            //     ORDER BY BT.FECHA_BITACORA DESC");
            let result = await pool.request().query("SELECT * FROM BITACORAS AS BT\
                INNER JOIN OPERADOR AS OP ON OP.OPERADOR_CLAVE = BT.OPERADOR_CLAVE\
                WHERE BT.FECHA_BITACORA BETWEEN '2024-10-01' AND '2024-10-19' AND BT.TRACTO_NUM_ECO = '" + req.unidad + "'\
                ORDER BY BT.FECHA_BITACORA DESC");

            sql.close();
            
            res.json({
                OK: true,
                Operador: result['recordset'][0],
            });
        }
        catch (err) {
            console.error('Error al conectar o hacer la consulta:', err);
            sql.close();
        }
    }

    app.obtenerBitacoras = async (req, res) => {
        try {
            let pool = await sql.connect(config);

            let result = await pool.request().query("SELECT BT.status_bitacora, FORMAT(BT.FECHA_BITACORA,'yyyy-MM-dd') as FECHA_BITACORA, BT.CLAVE_BITACORA, BT.PREFIJO, BT.FOLIO_BITACORA, BT.DOBLE_OPERADOR, BT.RANGO_BITACORA, BT.TERMINAL_BITACORA, BT.USR_CREA, BT.TRACTO_CLAVE, BT.TRACTO_NUM_ECO, BT.FCH_CREA, BT.FCH_MOD, BT.USR_MOD, FORMAT(BT.FECHA_SALIDA,'yyyy-MM-dd HH:mm:ss') as FECHA_SALIDA, BT.MONTO_ANTICIPO_SALIDA, BT.USR_CIERR, FORMAT(BT.FCH_CIERR,'yyyy-MM-dd HH:mm:ss') as FCH_CIERR, BT.OBSERVACIONES_OPERADOR, BT.INSTRUCCIONES_ESPECIALES, BT.NOTA_SISTEMA, BT.DIAS_SERVICIO, BT.kilometraje_inicial, BT.kilometraje_final, BT.terminal_cierre, BT.LITROS_DBL_OPERADOR, BT.MONTO_DIESEL_DBL_OPERADOR, BT.LIQ_DBL_OPR, BT.STATUS_VIAJE, BT.LECT_LITROS_COMP, BT.LECT_REND_COMP, BT.negocio_clave_bit, BT.LITROS_EXCESO, BT.LITROS_CIERRE, BT.difCombustible, BT.BAN_LIQUIDACION, BT.LIQUIDACION_CLAVE, OP.NEGOCIO_CLAVE, OP.OPERADOR_CLAVE, OP.OPERADOR_NOMBRE, KO.kilometros_carga1, KO.kilometros_vacio1, KO.total_kilometros1, RUT.ruta_min as ruta FROM BITACORAS AS BT\
                INNER JOIN bitacora_recorridos AS RUT ON RUT.CLAVE_BITACORA = BT.CLAVE_BITACORA \
                INNER JOIN OPERADOR AS OP ON OP.OPERADOR_CLAVE = BT.OPERADOR_CLAVE \
                INNER JOIN vKilometrosOperador00 AS KO ON KO.FOLIO_BITACORA = BT.FOLIO_BITACORA \
                WHERE BT.BAN_LIQUIDACION = 0 \
                AND OP.OPERADOR_NOMBRE = '" + req.params.operador + "' \
                AND KO.OPERADOR_NOMBRE = '" + req.params.operador + "' \
                ORDER BY FECHA_SALIDA");
                // AND BT.LIQUIDACION_CLAVE = null \
                // WHERE BT.FECHA_BITACORA BETWEEN '" + req.params.fechaInicio + "' AND '" + req.params.fechaFin + "'\
                // AND BT.TRACTO_NUM_ECO = '" + req.params.tracto + "'\
            sql.close();
            
            res.json({
                OK: true,
                Bitacoras: result['recordsets'][0]
            });
        }
        catch (err) {
            console.error('Error al conectar o hacer la consulta:', err);
            sql.close();
        }
    }

    app.obtenerDieselReport = (req, res) => {
        Samsara.getFuelEnergyVehicleReports({
            startDate: req.params.fechaInicio,
            endDate: req.params.fechaFin,
            vehicleIds: req.params.id_unidad,
            energyType: 'fuel'
        }).then(result => {
            res.json({
                OK: true,
                Reporte: result['data']['data']['vehicleReports'],
            });
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.obtenerGPS = (req, res) => {
        Samsara.getVehicleStatsHistory({
            startTime: req.params.fechaInicio,
            endTime: req.params.fechaFin,
            vehicleIds: req.params.id_unidad,
            types: 'obdOdometerMeters'
        }).then(result => {

            var registros = [result['data']['data'][0]['obdOdometerMeters'][0], result['data']['data'][0]['obdOdometerMeters'][result['data']['data'][0]['obdOdometerMeters'].length -1]];
            res.json({
                OK: true,
                Reporte: registros
            });
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.obtenerGPS = (req, res) => {
        Samsara.getVehicleStatsHistory({
            startTime: req.params.fechaInicio,
            endTime: req.params.fechaFin,
            tagIds: '4343814,4244687,4236332,4399105,4531263,3907109',
            types: 'obdOdometerMeters'
        }).then(result => {

            var registros = [result['data']['data'][0]['obdOdometerMeters'][0], result['data']['data'][0]['obdOdometerMeters'][result['data']['data'][0]['obdOdometerMeters'].length -1]];
            res.json({
                OK: true,
                Reporte: registros
            });
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.obtenerCombustible = async (req, res) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request().query("SELECT OV.CLAVE_BITACORA, OV.VALE_FOLIO, OV.LITROS, FORMAT(OV.VALE_FECHA,'yyyy-MM-dd') as VALE_FECHA, FORMAT(OV.FCH_CREA,'yyyy-MM-dd HH:mm:ss') as FCH_CREA, OV.IMPORTE, GASO.GASOLINERA_DESCRIP AS GASOLINERA_CLAVE, OV.VALE_TERMINAL, OV.PRECIO FROM ORDEN_VALES AS OV \
                INNER JOIN GASOLINERA AS GASO ON GASO.GASOLINERA_CLAVE = OV.GASOLINERA_CLAVE \
                WHERE OV.CLAVE_BITACORA IN (" + req.params.claves + ") AND OV.LITROS > 0 \
                ORDER BY OV.VALE_FECHA ASC");
                
                // AND FCH_CREA BETWEEN '" + req.params.fechaInicio + "' AND '" + req.params.fechaFin + "'\
            sql.close();
            
            res.json({
                OK: true,
                Combustible: result['recordsets'][0]
            });
        }
        catch (err) {
            console.error('Error al conectar o hacer la consulta:', err);
            sql.close();
        }
    }

    app.obtenerCasetas = async (req, res) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request().query("SELECT OC.RUTA_CLAVE, OC.CLAVE_BITACORA, C.CASETA_DESCRIP AS CASETA_CLAVE, OC.NUM_ORDEN, FORMAT(OC.CASETA_FECHA,'yyyy-MM-dd') as CASETA_FECHA, OC.CARGO_EMPRESA, OC.VALE_FOLIO, OC.CARGO_OPERADOR, OC.VALE_RANGO, OC.REFERENCIA, OC.BAN_CONVENIO, OC.cruzo_rastreo, OC.fch_cruzo_rastreo, OC.FOLIO_VALE, OC.CalculoRuta, OC.tra_nodo_a, OC.tra_nodo_b, OC.tra_orden_paso, OC.orden_ruta FROM orden_casetas AS OC \
                INNER JOIN CASETA AS C ON C.CASETA_CLAVE = OC.CASETA_CLAVE \
                WHERE OC.CLAVE_BITACORA IN (" + req.params.claves + ") \
                ORDER BY OC.CASETA_FECHA");

            sql.close();
            
            res.json({
                OK: true,
                Casetas: result['recordsets'][0]
            });
        }
        catch (err) {
            console.error('Error al conectar o hacer la consulta:', err);
            sql.close();
        }
    }

    app.obtenerGastos = async (req, res) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request().query("SELECT OC.CLAVE_BITACORA, OC.IMPORTE, OC.REFERENCIA, CON.CONCEPTO_DESCRIP, OC.VALE_TERMINAL, OC.VALE_FOLIO, FORMAT(OC.VALE_FECHA,'yyyy-MM-dd') as VALE_FECHA, FORMAT(OC.FCH_CREA,'yyyy-MM-dd HH:mm:ss') as FCH_CREA, OC.PREFIJO FROM ORDEN_CONCEPTO AS OC \
                INNER JOIN CONCEPTO AS CON ON CON.CONCEPTO_CLAVE = OC.CONCEPTO_CLAVE\
                WHERE CLAVE_BITACORA IN (" + req.params.claves + ") ORDER BY FCH_CREA ASC");

            sql.close();
            
            res.json({
                OK: true,
                Gastos: result['recordsets'][0]
            });
        }
        catch (err) {
            console.error('Error al conectar o hacer la consulta:', err);
            sql.close();
        }
    }

    app.obtenerViajesCortsLargos = async (req, res) => {
        try {
            let pool = await sql.connect(config);
            const today = new Date();
            const primerDiaMes = moment(today).startOf('month').format('YYYY-MM-DD');
            const ultimoDiaMes = moment(today).endOf('month').format('YYYY-MM-DD');

            console.log(primerDiaMes);
            console.log(ultimoDiaMes);
            // Primero agrupamos la tabla BITACORAS por operador y clave_bitacora
            let subquery = `
                SELECT 
                    BT.CLAVE_BITACORA,
                    OP.OPERADOR_NOMBRE as operador
                FROM vorden_bitacoras AS BT
                INNER JOIN OPERADOR AS OP ON OP.OPERADOR_CLAVE = BT.OPERADOR_CLAVE
                WHERE BT.STATUS_BITACORA IN (0,1) 
                AND BT.FECHA_BITACORA BETWEEN '${primerDiaMes}T00:00:00.000Z' AND '${ultimoDiaMes}T23:59:59.000Z'
                GROUP BY BT.CLAVE_BITACORA, OP.OPERADOR_NOMBRE
            `;

            // Luego, con ese resultado, agrupamos y contamos los viajes cortos y largos usando SUM
            let query = `
                SELECT 
                    sub.operador,
                    SUM(CASE WHEN BTD.km > 100 AND BTD.km <= 500 THEN 1 ELSE 0 END) as viajeCorto,
                    SUM(CASE WHEN BTD.km > 501 THEN 1 ELSE 0 END) as viajeLargo
                FROM (${subquery}) AS sub
                INNER JOIN vbitacora_detalle AS BTD ON BTD.CLAVE_BITACORA = sub.CLAVE_BITACORA
                GROUP BY sub.operador
                ORDER BY sub.operador
            `;

            let result = await pool.request().query(query);

            sql.close();
            
            res.json({
                OK: true,
                total: result['recordsets'][0].length,
                Registros: result['recordsets'][0]
            });
        }
        catch (err) {
            console.error('Error al conectar o hacer la consulta:', err);
            sql.close();
        }
    }

    app.reporteTanquesDiesel = async (req, res) => {
        try {
            let pool = await sql.connect(config);

            let tractos = await pool.request().query("SELECT BT.TRACTO_NUM_ECO FROM vvalescomb AS BT \
                WHERE VALE_FECHA >= '2024-11-13T00:00:00.000Z' \
                AND liquidacion = 's/l' \
                GROUP BY BT.TRACTO_NUM_ECO");
            
            var lista = [];

            for(let tracto of tractos['recordsets'][0]) {
                if(tracto.TRACTO_NUM_ECO.split('-')[0] != 'PHES') {
                    var fechaCierre = await getFechaCierre(tracto.TRACTO_NUM_ECO);
                    var porcecierre = await getPorceDieselCierre(fechaCierre, tracto.TRACTO_NUM_ECO.replace('C', 'C-'))
                    var porceHoy = await getPorceDieselHoy(fechaCierre, tracto.TRACTO_NUM_ECO.replace('C', 'C-'))
                    var lit = await getCombustible(fechaCierre, tracto.TRACTO_NUM_ECO);
                    var litrosSam = await getDieselSamsara(fechaCierre, tracto.TRACTO_NUM_ECO.replace('C', 'C-'))
                    var cargassam = await getCargasSamsara(fechaCierre, tracto.TRACTO_NUM_ECO.replace('C', 'C-'))

                    var registro = ({
                        eco_tracto: tracto.TRACTO_NUM_ECO.replace('C', 'C-'),
                        fecha_cierre: fechaCierre,
                        porce_cierre: porcecierre,
                        porce_aldia: porceHoy,
                        litros: lit,
                        litrosSamsara: litrosSam,
                        cargasSamsara: cargassam
                    });
    
                    lista.push(registro);
                }
            }

            sql.close();
            
            res.json({
                OK: true,
                Registros: lista
            });
        }
        catch (err) {
            console.error('Error al conectar o hacer la consulta:', err);
            sql.close();
        }
    }

    async function getFechaCierre(tracto) {
        try {
            let pool = await sql.connect(config);
            let bita = await pool.request().query("SELECT TOP(1) FORMAT(BT.FCH_CIERR,'yyyy-MM-dd HH:mm:ss') as FCH_CIERR FROM BITACORAS AS BT \
                INNER JOIN bitacora_recorridos AS RUT ON RUT.CLAVE_BITACORA = BT.CLAVE_BITACORA \
                WHERE BT.BAN_LIQUIDACION = 1 AND RUT.ruta_min != 'MOEY-MOEY' AND  RUT.ruta_min != 'SACA-SACA'\
                AND TRACTO_NUM_ECO = '" + tracto + "'\
                ORDER BY BT.FCH_CIERR DESC");

            return bita['recordsets'][0][0]['FCH_CIERR'];
        }
        catch(error) {
            console.log(error.message);
            return 0;
        }
    }

    async function getPorceDieselCierre(fecha, tracto) {
        try {
            var fe = fecha.split(' ')[0] + 'T' + fecha.split(' ')[1] + 'Z';
            var fe2 = fecha.split(' ')[0] + 'T23:59:59Z';
            var idunidad;
            var porce = 0;

            await unidad.findAll({
                where: {
                    name: tracto
                },
            }).then(result => {
                idunidad = result[0]['id_unidad'];
            }).catch(error => {
                console.log(error.message);
            });

            var result = await Samsara.getVehicleStatsHistory({
                startTime: fe,
                endTime: fe2,
                vehicleIds: idunidad,
                types: 'fuelPercents'
            });

            var data = result['data']['data'][0]['fuelPercents'].length > 0 ? result['data']['data'][0]['fuelPercents'][result['data']['data'][0]['fuelPercents'].length -1]['value'] : 0;
            porce = data;

            return porce;
        }
        catch(error) {
            console.log(error.message);
            return 0;
        }
    }

    async function getCombustible(fecha, tracto) {
        try {
            let pool = await sql.connect(config);

            let result = await pool.request().query("SELECT BT.TRACTO_NUM_ECO, BT.VALE_FOLIO, FORMAT(BT.VALE_FECHA,'yyyy-MM-dd') as VALE_FECHA, BT.litros, BT.status_vale FROM vvalescomb AS BT \
                WHERE TRACTO_NUM_ECO = '" + tracto + "' \
                AND VALE_FECHA >= '" + fecha + "' \
                AND liquidacion = 's/l' \
                AND status_vale = 0 \
                ORDER BY BT.VALE_FECHA DESC");

            var lista = [];
            var vale = [];
            var litros = 0;

            for(let litro of result['recordsets'][0]) {
                lista.push(litro.litros);
                vale.push(litro);
            }

            litros = lista.reduce((a, b) => a + b, 0);
                
            return vale
        }
        catch(error) {
            console.log(error.message);
            return 0;
        }
    }

    async function getPorceDieselHoy(fecha, tracto) {
        try {
            var today = new Date();
            const hoy = moment(today).format('YYYY-MM-DD');
            var fe = hoy.split(' ')[0] + 'T07:00:00Z';
            var fe2 = hoy.split(' ')[0] + 'T23:59:59Z';
            var idunidad;

            var porce = 0;

            await unidad.findAll({
                where: {
                    name: tracto
                },
            }).then(result => {
                idunidad = result[0]['id_unidad'];
            })
            .catch(error => {
                console.log(error.message);
            });

            var result = await Samsara.getVehicleStatsHistory({
                startTime: fe,
                endTime: fe2,
                vehicleIds: idunidad,
                types: 'fuelPercents'
            })
            // .then(async result => {
                var data = result['data']['data'][0]['fuelPercents'].length > 0 ? result['data']['data'][0]['fuelPercents'][result['data']['data'][0]['fuelPercents'].length -1]['value'] : 0;
                porce = data;

                return porce;
            // })
            // .catch(error => {
            //     console.log(error.message);
            // });
            
        }
        catch(error) {
            console.log(error.message);
            return 0;
        }
    }

    async function getDieselSamsara(fecha, tracto) {
        try {
            var today = new Date();
            const hoy = moment(today).format('YYYY-MM-DD');
            var fe = fecha.toString().split(' ')[0] + 'T00:00:00-06:00';
            var fe2 = hoy.split(' ')[0] + 'T23:59:59-06:00';
            var idunidad;
            
            var litros = 0;
            
            var resu = await unidad.findAll({
                where: {
                    name: tracto
                },
            });

            idunidad = resu[0]['id_unidad'];
            
            var result = await Samsara.getFuelEnergyVehicleReports({
                startDate: fe,
                endDate: fe2,
                vehicleIds: idunidad,
                energyType: 'fuel'
            });

            litros = result['data']['data']['vehicleReports'][0]['fuelConsumedMl'];

            return litros;
        }
        catch(error) {
            console.log(error.message);
            return 0;
        }
    }

    async function getCargasSamsara(fecha, tracto) {
        try {
            var resultado = await geogaso.findAll({
                where: {
                    tracto: tracto,
                    fecha_entrada: {
                        [Op.gte]: fecha
                    }
                },
                order: [
                    ['fecha_entrada', 'DESC']
                ]
            });

        } 
        catch (error) {
            
        }
    } 






    app.repopueba = async (req, res) => {
        try {

            var litros = 0;
            var result = await Samsara.getVehicleStatsHistory({
                startTime: '2024-11-07T07:00:00Z',
                endTime: '2024-11-07T23:59:59Z',
                tagIds: '4343814',
                types: 'fuelPercents'
            });


            // var data = result['data']['data'][0]['fuelPercents'].length > 0 ? result['data']['data'][0]['fuelPercents'][result['data']['data'][0]['fuelPercents'].length -1]['value'] : 0;
            // litros = data;

    
            return litros;

            
        }
        catch (error){
            console.log(error.message);
            return 0;
        }
    }

    app.pruebasItinerarios = async (req, res) => {
        try {
            let pool = await sql.connect(config);

            const today = new Date();

            let result = await pool.request().query(`SELECT Top(500)* FROM bitacoras;`);
            // let result = await pool.request().query("SELECT concepto_clave, concepto_descrip from ordenconcepto_cto group by concepto_clave, concepto_descrip ;");
            // let result = await pool.request()/.query("SELECT TOP(10)* vos.ordenser_folio, vos.clave_bitacora, vos.terminal_clave, vos.fecha_orden, vos.origen_nom, vos.origen_dom, vos.destinatario_nom, vos.destinatario_dom, vos.operador_nombre, vos.cliente_nombre, vos.unidad FROM vordenser AS vos ");

            sql.close();

            // result['recordsets'][0].forEach(async rr => {
            //     const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
                               
            //     var existe = await itine.findAll({
            //         where: {
            //             operador: rr.operador_nombre,
            //             economico: rr.unidad,
            //             origen: rr.origen_nom,
            //             destino: rr.destinatario_nom
            //         }
            //     });

            //     if(existe.length === 0) {
            //         try {
            //             const responseUno = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            //                 params: {
            //                     address: rr.origen_dom,
            //                     key: process.env.GOOGLE_MAPS_KEY
            //                 }
            //             });

            //             const responseDos = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            //                 params: {
            //                     address: rr.destinatario_dom,
            //                     key: process.env.GOOGLE_MAPS_KEY
            //                 }
            //             });

            //             if(responseUno.data.status !== 'OK') {
            //                 return res.status(400).json({ error: 'No se pudo geocodificar la dirección' });
            //             }

            //             if(responseDos.data.status !== 'OK') {
            //                 return res.status(400).json({ error: 'No se pudo geocodificar la dirección' });
            //             }

            //             const locationUno = responseUno.data.results[0].geometry.location;
            //             const locationDos = responseDos.data.results[0].geometry.location;

            //             let nuevoRegistro = new itine({
            //                 folio_orden: rr.ordenser_folio, 
            //                 unidad: rr.terminal_clave, 
            //                 numero_empleado: rr.numero_empleado, 
            //                 operador: rr.operador_nombre, 
            //                 economico: rr.unidad, 
            //                 origen: rr.origen_nom, 
            //                 destino: rr.destinatario_nom, 
            //                 origen_direccion: rr.origen_dom, 
            //                 destino_direccion: rr.destinatario_dom, 
            //                 origen_longitud: locationUno.lng, 
            //                 origen_latitud: locationUno.lat, 
            //                 destino_longitud: locationDos.lng, 
            //                 destino_latitud: locationDos.lat, 
            //                 fecha: moment(rr.fecha_orden).format('YYYY-MM-DD')
            //             });

            //             itine.create(nuevoRegistro.dataValues, {
            //                 fields: [
            //                     'folio_orden', 
            //                     'unidad', 
            //                     'numero_empleado', 
            //                     'operador', 
            //                     'economico',
            //                     'origen',
            //                     'destino',
            //                     'origen_direccion',
            //                     'destino_direccion',
            //                     'origen_longitud',
            //                     'origen_latitud',
            //                     'destino_longitud',
            //                     'destino_latitud', 
            //                     'fecha'
            //                 ]
            //             })
            //             .then(result => {
            //                 // console.log('ok');
            //             })
            //             .catch(error => {
            //                 console.log(error);
            //             });

            //         } catch (error) {
            //             console.error(error);
            //             res.status(500).json({ error: 'Error interno del servidor' });
            //         }
            //     } 
            //     else {
            //         console.log('Ya existe el folio:', existe[0].folio_orden);
            //     }
                               
            //     await sleep(3000);
            // });
            
            res.json({
                OK: true,
                total: result['recordsets'][0].length,
                Registros: result['recordsets'][0]
            });
        }
        catch (err) {
            console.error('Error al conectar o hacer la consulta:', err);
            sql.close();
        }
    }

    app.itinerariosVOPruebas = async (req, res) => {
        try {
            let pool = await sql.connect(config);
            
            const today = new Date();
            const fifteenDaysAgo = new Date();
            fifteenDaysAgo.setDate(today.getDate() - 5);
            
            let result = await pool.request().query("SELECT vos.ordenser_folio, vos.clave_bitacora, vos.terminal_clave, vos.fecha_orden, vos.origen_nom, vos.origen_dom, vos.destinatario_nom, vos.destinatario_dom, vos.operador_nombre, vos.cliente_nombre, vos.fecha_carga, vos.unidad, vos.origen_desc, vos.destino_desc, vos.ruta_destino_os, vos.ruta_origen_os, vos.fecha_reporte_entrega FROM vordenser AS vos \
                INNER JOIN bitacoras AS bt on bt.clave_bitacora = vos.clave_bitacora \
                WHERE vos.fecha_orden BETWEEN '" + moment(fifteenDaysAgo).format('YYYY-MM-DD') + "T10:00:00.000Z' AND '" + moment(today).format('YYYY-MM-DD') + "T23:59:59.000Z' \
                AND vos.clave_bitacora IS NOT NULL AND vos.fch_can IS NULL");

            sql.close();
            
            res.json({
                OK: true,
                total: result['recordsets'][0].length,
                fechai: moment(fifteenDaysAgo).format('YYYY-MM-DD') + "T10:00:00.000Z'",
                fechaf: moment(today).format('YYYY-MM-DD') + "T23:59:59.000Z",
                Registros: result['recordsets'][0]
            });
        }
        catch (err) {
            console.error('Error al conectar o hacer la consulta:', err);
            sql.close();
        }
    }

    app.listadoOperadores = async (req, res) => {
        try {
            let pool = await sql.connect(config);

            // let result = await pool.request().query("SELECT ope.OPERADOR_CLAVE, ope.operador_num_externo, ope.OPERADOR_NOMBRE, ope.NUM_LICENCIA, ope.STATUS, ope.OPERADOR_TELEFONO, ope.CELULAR, ope.operador_terminal, ost.SUBTIPO_DESCRIP FROM voperador as ope\
            let result = await pool.request().query("SELECT ope.OPERADOR_CLAVE, ope.operador_num_externo, ope.OPERADOR_NOMBRE, ope.NUM_LICENCIA, ope.FECHA_VIGENCIA, ope.STATUS, ope.OPERADOR_TELEFONO, ope.CELULAR, ope.negocio_clave as operador_terminal, ost.SUBTIPO_DESCRIP, ope.OPERADOR_RFC, ope.NUM_IMSS, ope.NUM_LICENCIA, ope.FCH_INGRESO FROM voperador as ope\
                INNER JOIN OPERADOR_SUBTIPO AS ost ON ost.SUBTIPO_CLAVE = ope.SUBTIPO_CLAVE\
                WHERE ope.STATUS = 1 AND ost.SUBTIPO_DESCRIP != 'ACADEMIA' AND (ope.negocio_clave IS NOT NULL AND ope.negocio_clave NOT IN ('DEF')) ORDER BY ope.OPERADOR_NOMBRE ASC;");
                // ORDER BY ope.OPERADOR_NOMBRE ASC;");

            sql.close();
            
            res.json({
                OK: true,
                total: result['recordsets'][0].length,
                Registros: result['recordsets'][0]
            });
        }
        catch (err) {
            console.error('Error al conectar o hacer la consulta:', err);
            sql.close();
        }
    }
    
    app.folios = async (req, res) => {
        try {
            let pool = await sql.connect(config);

            let result = await pool.request().query("SELECT BT.BAN_LIQUIDACION, BT.FECHA_BITACORA, BT.TERMINAL_BITACORA, BT.TRACTO_NUM_ECO, BRS.NUM_ORDEN, BRS.BITACORA, BRS.ORIGEN_DESC, BRS.cliente_nombre, BRS.DESTINO_DESC, OP.OPERADOR_NOMBRE FROM bitacoras AS BT \
                INNER JOIN vBitacora_ruta_sld AS BRS ON BRS.clave_bitacora = BT.clave_bitacora \
                INNER JOIN operador AS OP ON OP.OPERADOR_CLAVE = BT.OPERADOR_CLAVE \
                WHERE BT.BAN_LIQUIDACION = 0 AND BT.STATUS_BITACORA = 0 AND BT.TERMINAL_BITACORA != 'PHES' \
                AND BRS.NUM_ORDEN = (SELECT MAX(BRS2.NUM_ORDEN) FROM vBitacora_ruta_sld AS BRS2 WHERE BRS2.clave_bitacora = BT.clave_bitacora);"
            );
            
            sql.close();
            
            res.json({
                OK: true,
                total: result['recordsets'][0].length,
                Registros: result['recordsets'][0]
            });
        }
        catch (err) {
            console.error('Error al conectar o hacer la consulta:', err);
            sql.close();
        }
    }

    app.foliosReparto = async (req, res) => {
        try {
            var fecha = moment(new Date()).format('YYYY-MM-DD');
            let pool = await sql.connect(config);


            let result = await pool.request().query("SELECT BT.BAN_LIQUIDACION, BT.FECHA_BITACORA, BT.TERMINAL_BITACORA, BT.TRACTO_NUM_ECO, BRS.NUM_ORDEN, BRS.BITACORA, BRS.ORIGEN_DESC, BRS.cliente_nombre, BRS.DESTINO_DESC, OP.OPERADOR_NOMBRE FROM bitacoras AS BT \
                INNER JOIN vBitacora_ruta_sld AS BRS ON BRS.clave_bitacora = BT.clave_bitacora \
                INNER JOIN operador AS OP ON OP.OPERADOR_CLAVE = BT.OPERADOR_CLAVE \
                WHERE BT.BAN_LIQUIDACION = 0 AND BT.STATUS_BITACORA = 0 AND BT.TERMINAL_BITACORA != 'PHES';"
            );

            sql.close();
            
            res.json({
                OK: true,
                total: result['recordsets'][0].length,
                Registros: result['recordsets'][0]
            });
        }
        catch (err) {
            console.error('Error al conectar o hacer la consulta:', err);
            sql.close();
        }
    }

    app.operadoresCriticosUL  = async (req, res) => {
        try {
            let pool = await sql.connect(config);
            
            const today = new Date();
            const fifteenDaysAgo = new Date();
            fifteenDaysAgo.setDate(today.getDate() - 14);

            yearactual = moment(today).format('YYYY');

            let result = await pool.request().query(
                "SELECT OP.OPERADOR_NOMBRE as operador, MAX(OP.negocio_clave) AS unidad, MAX(BT.FECHA_BITACORA) AS fechaBitacora, DATEDIFF(DAY, MAX(BT.FECHA_BITACORA), GETDATE()) AS diasDesdeUltimaBitacora FROM bitacoras AS BT \
                INNER JOIN vbitacora_detalle AS BD ON BD.clave_bitacora = BT.clave_bitacora \
                INNER JOIN voperador AS OP ON OP.OPERADOR_CLAVE = BT.OPERADOR_CLAVE \
                WHERE BD.KM > 100 AND BT.FECHA_BITACORA > '" + moment(yearactual + '-01-01').format('YYYY-MM-DD') + "T23:59:59.000Z' AND OP.STATUS = 1 \
                GROUP BY OP.OPERADOR_NOMBRE ORDER BY OP.OPERADOR_NOMBRE"
            );

            sql.close();
            
            res.json({
                OK: true,
                total: result['recordsets'][0].length,
                Registros: result['recordsets'][0]
            });
        }
        catch (err) {
            console.error('Error al conectar o hacer la consulta:', err);
            sql.close();
        }
    }

    app.bitacorasParaComidaAut = async (req, res) => {
        try {
            let pool = await sql.connect(config);
            
            const today = new Date();
            const fifteenDaysAgo = new Date();
            fifteenDaysAgo.setDate(today.getDate() - 1);
            
            // let result = await pool.request().query(
            //     "SELECT BT.*, OP.*, VOS.* FROM bitacoras AS BT \
            //     INNER JOIN operador AS OP ON OP.OPERADOR_CLAVE = BT.OPERADOR_CLAVE \
            //     INNER JOIN vordenser AS VOS ON VOS.clave_bitacora = BT.clave_bitacora \
            //     WHERE BT.STATUS_BITACORA = 0 \
            //     AND BT.FECHA_BITACORA BETWEEN '" + moment(fifteenDaysAgo).format('YYYY-MM-DD') + "T00:00:00.000Z' AND '" + moment(today).format('YYYY-MM-DD') + "T23:59:59.000Z' ORDER BY OP.OPERADOR_NOMBRE"
            // );

            
            //   let result = await pool.request().query(
            //     "SELECT BT.FECHA_BITACORA, BT.TERMINAL_BITACORA, MAX(BT.FOLIO_BITACORA) as FOLIO_BITACORA, OP.operador_nombre, MAX(VOS.ordenser_folio) as ordenser_folio, MAX(VOS.consec_os) as consec_os, BT.TRACTO_NUM_ECO, MAX(BRS.NUM_ORDEN) AS NUM_ORDEN, VOS.origen_desc, VOS.destino_desc, VOS.cliente_nombre FROM bitacoras AS BT \
            //     INNER JOIN operador AS OP ON OP.OPERADOR_CLAVE = BT.OPERADOR_CLAVE \
            //     INNER JOIN vordenser AS VOS ON VOS.clave_bitacora = BT.clave_bitacora \
            //     INNER JOIN vBitacora_ruta_sld AS BRS ON BRS.clave_bitacora = BT.clave_bitacora \
            //     WHERE BT.STATUS_BITACORA = 0 AND VOS.fch_can is null \
            //      GROUP BY BT.FECHA_BITACORA, BT.TERMINAL_BITACORA, OP.operador_nombre, BT.TRACTO_NUM_ECO, VOS.origen_desc, VOS.destino_desc, VOS.cliente_nombre ORDER BY OP.OPERADOR_NOMBRE"
            // );





            let result = await pool.request().query("SELECT BT.BAN_LIQUIDACION, BT.FECHA_BITACORA, BT.TERMINAL_BITACORA, BT.TRACTO_NUM_ECO, BRS.NUM_ORDEN, BRS.BITACORA, BRS.ORIGEN_DESC, BRS.cliente_nombre, BRS.DESTINO_DESC, OP.OPERADOR_NOMBRE FROM bitacoras AS BT \
                INNER JOIN vBitacora_ruta_sld AS BRS ON BRS.clave_bitacora = BT.clave_bitacora \
                INNER JOIN operador AS OP ON OP.OPERADOR_CLAVE = BT.OPERADOR_CLAVE \
                WHERE BT.BAN_LIQUIDACION = 0 AND BT.STATUS_BITACORA = 0 AND BT.TERMINAL_BITACORA != 'PHES' \
                AND BRS.NUM_ORDEN = (SELECT MAX(BRS2.NUM_ORDEN) FROM vBitacora_ruta_sld AS BRS2 WHERE BRS2.clave_bitacora = BT.clave_bitacora) \
                AND BT.FECHA_BITACORA BETWEEN '" + moment(today).format('YYYY-MM-DD') + "T00:00:00.000Z' AND '" + moment(today).format('YYYY-MM-DD') + "T23:59:59.000Z'"
            );














                       
            // let result = await pool.request().query("SELECT BT.BAN_LIQUIDACION, BT.FECHA_BITACORA, BT.TERMINAL_BITACORA, BT.TRACTO_NUM_ECO, BRS.NUM_ORDEN, BRS.BITACORA, BRS.ORIGEN_DESC, BRS.cliente_nombre, BRS.DESTINO_DESC, OP.OPERADOR_NOMBRE FROM bitacoras AS BT \
            //     INNER JOIN vBitacora_ruta_sld AS BRS ON BRS.clave_bitacora = BT.clave_bitacora \
            //     INNER JOIN operador AS OP ON OP.OPERADOR_CLAVE = BT.OPERADOR_CLAVE \
            //     WHERE BT.BAN_LIQUIDACION = 0 AND BT.STATUS_BITACORA = 0 AND BT.TERMINAL_BITACORA != 'PHES' \
            //     AND BRS.NUM_ORDEN = (SELECT MAX(BRS2.NUM_ORDEN) FROM vBitacora_ruta_sld AS BRS2 WHERE BRS2.clave_bitacora = BT.clave_bitacora);"
            // );
            sql.close();
            
            res.json({
                OK: true,
                total: result['recordsets'][0].length,
                Registros: result['recordsets'][0]
            });
        }
        catch (err) {
            console.error('Error al conectar o hacer la consulta:', err);
            sql.close();
        }
    }

    app.obtenerBitacorasQuinceDias = async (req, res) => {
        try {
            let pool = await sql.connect(config);
            
            const today = new Date();
            const fifteenDaysAgo = new Date();
            fifteenDaysAgo.setDate(today.getDate() - 14);

            let result = await pool.request().query(
                "SELECT MAX(BT.FECHA_BITACORA) AS fechaBitacora, MAX(BT.TRACTO_NUM_ECO) AS economico, OP.OPERADOR_NOMBRE as operador FROM bitacoras AS BT \
                INNER JOIN operador AS OP ON OP.OPERADOR_CLAVE = BT.OPERADOR_CLAVE \
                WHERE BT.STATUS_BITACORA IN (0,1) \
                AND BT.FECHA_BITACORA BETWEEN '" + moment(fifteenDaysAgo).format('YYYY-MM-DD') + "T00:00:00.000Z' AND '" + moment(today).format('YYYY-MM-DD') + "T23:59:59.000Z' \
                GROUP BY OP.OPERADOR_NOMBRE ORDER BY OP.OPERADOR_NOMBRE"
            );

            sql.close();
            
            res.json({
                OK: true,
                total: result['recordsets'][0].length,
                Registros: result['recordsets'][0]
            });
        }
        catch (err) {
            console.error('Error al conectar o hacer la consulta:', err);
            sql.close();
        }
    }




































































































    // PRUEBA INSERT




    // tipos de datos  <CLAVE_BITACORA, numeric(10,0),>
//  ,<CONSECUTIVO, numeric(10,0),>
//  ,<CONCEPTO_CLAVE, numeric(4,0),>
//  ,<VALE_RANGO, numeric(4,0),>
//  ,<IMPORTE, decimal(20,6),>
//  ,<REFERENCIA, varchar(50),>
//  ,<VALE_TERMINAL, varchar(5),>
//  ,<VALE_FOLIO, numeric(10,0),>
//  ,<VALE_FECHA, smalldatetime,>
//  ,<POLIZA_CB, varchar(20),>
//  ,<POLIZA_CXP, varchar(20),>
//  ,<PERIODO_CB, smalldatetime,>
//  ,<PERIODO_CXP, smalldatetime,>
//  ,<STATUS_VALE, numeric(1,0),>
//  ,<PREFIJO, varchar(10),>
//  ,<CUENTA_BAN, varchar(50),>
//  ,<BENEFICIARIO, varchar(70),>
//  ,<USR_AUTORIZA, varchar(12),>
//  ,<IMPRESO, numeric(2,0),>
//  ,<USR_FIRMO, varchar(12),>
//  ,<OPERADOR_CLAVE, numeric(4,0),>
//  ,<LIQUIDACION_CLAVE, numeric(10,0),>
//  ,<PAGADO, numeric(1,0),>
//  ,<USR_CREA, varchar(12),>
//  ,<FCH_CREA, datetime,>
//  ,<USR_MOD, varchar(12),>
//  ,<FCH_MOD, datetime,>
//  ,<USR_PAG, varchar(12),>
//  ,<FCH_PAG, datetime,>
//  ,<USR_CAN, varchar(12),>
//  ,<FCH_CAN, datetime,>
//  ,<vale_saldo, numeric(20,6),>
//  ,<tmp_pago_tes, numeric(20,6),>
//  ,<importe_pagado, numeric(20,6),>
//  ,<OBSERV_VALE, varchar(70),>
//  ,<TRACTO_NUM_ECO_PROV, varchar(30),>
//  ,<GASTO_CLAVE, numeric(10,0),>
//  ,<deduccion_clave, numeric(10,0),>
//  ,<VALE_FOLIO_SUST, numeric(10,0),>
//  ,<ban_ayudante, numeric(1,0),>
//  ,<NO_GEN_POL, numeric(1,0),>
//  ,<TIPO_ANTICIPO_CLAVE, numeric(5,0),>
//  ,<CONSEC_OS_MNIOB, numeric(10,0),>
//  ,<maniobra_clave, numeric(5,0),>
//  ,<es_maniobra, numeric(1,0),>
//  ,<PERMISIONARIO_LIQ_CLAVE, numeric(10,0),>
//  ,<PRELIQUIDACION_CLAVE, numeric(10,0),>
//  ,<BAN_PRELIQUIDA, numeric(1,0),>
//  ,<tipoValeSalida, numeric(1,0),>
//  ,<banAutorizaLayoutLiq, numeric(1,0),>
//  ,<ID_LAYOUT, numeric(10,0),>
//  ,<egresoLayout, char(20),>
//  ,<periodoLayout, smalldatetime,>
//  ,<fechaLayout, smalldatetime,>
//  ,<idProcAut, numeric(1,0),>
//  ,<flagNotifCan, numeric(1,0),>

    // datos       205478	9	12	26	860.000000	GASTO DE VIAJE	MTY3	48425	2025-09-05 00:00:00	1569	NULL	2025-09-30 00:00:00	NULL	0	CMTY		FERRUZCA MONDRAGON ROBERTO CARLOS		0		2576	NULL	1	002358	2025-09-05 08:04:58.000	NULL	NULL	002358	2025-09-05 08:05:03.000	NULL	NULL	0.000000	0.000000	860.000000	GASTO DE VIAJE	TLEA-273	NULL	NULL	NULL	NULL	NULL	NULL	NULL	NULL	0	NULL	NULL	NULL	2	NULL	NULL	NULL	NULL	NULL	0	0

    app.pruebainsert = async (req, res) => {
        try {
            var body = req.body;

            const today = new Date();
            var year = today.getFullYear();
            var mes = today.getMonth() + 1;
            var lastDay = new Date(year, mes, 0);
            var conceptos = [
                {

                "concepto_clave": 12,
                "concepto_descrip": "ANTICIPO DE GASTOS"

                },
                {

                    "concepto_clave": 13,
                    "concepto_descrip": "CASETA"

                },
                {

                    "concepto_clave": 28,
                    "concepto_descrip": "COMIDA"

                },
                {

                    "concepto_clave": 29,
                    "concepto_descrip": "GUIA"

                },
                {

                    "concepto_clave": 30,
                    "concepto_descrip": "DESCARGAS"

                },
                {

                    "concepto_clave": 41,
                    "concepto_descrip": "PERMISO"

                },
                {

                    "concepto_clave": 44,
                    "concepto_descrip": "TALACHA"

                },
                {

                    "concepto_clave": 46,
                    "concepto_descrip": "HOTEL"

                },
                {

                    "concepto_clave": 48,
                    "concepto_descrip": "BASCULAS"

                },
                {

                    "concepto_clave": 49,
                    "concepto_descrip": "TAXI"

                },
                {

                    "concepto_clave": 51,
                    "concepto_descrip": "REFACCIONES"

                },
                {

                    "concepto_clave": 53,
                    "concepto_descrip": "COMPLEMENTO DE VIAJE"

                },
                {

                    "concepto_clave": 55,
                    "concepto_descrip": "PENSION"

                },
                {

                    "concepto_clave": 76,
                    "concepto_descrip": "Seguro de USA"

                },
                {

                    "concepto_clave": 92,
                    "concepto_descrip": "Gasolina"

                },
                {

                    "concepto_clave": 93,
                    "concepto_descrip": "Gratificacion"

                },
                {

                    "concepto_clave": 105,
                    "concepto_descrip": "PRESTAMO"

                },
                {

                    "concepto_clave": 163,
                    "concepto_descrip": "GASTOS NO COMPROBABLES"

                },
                {

                    "concepto_clave": 179,
                    "concepto_descrip": "REEMBOLSO"

                },
                {

                    "concepto_clave": 287,
                    "concepto_descrip": "CASA"
                }
            ];

            let conceptoEncontrado = conceptos.find(c => c.concepto_descrip.toUpperCase() === body.REFERENCIA.toUpperCase()) || { concepto_clave: 12 };

            const pool = await sql.connect(config);
            let result = await pool.request().query(
                `SELECT * FROM bitacoras WHERE folio_bitacora = ${body.CLAVE_BITACORA} AND STATUS_BITACORA = 0`
            );
            
            
            if(result.recordset.length > 0) {
                let resultConseVT = await pool.request().query(
                    `SELECT TOP(1) * FROM orden_concepto WHERE VALE_TERMINAL = '${body.VALE_TERMINAL}' ORDER BY fch_crea DESC`
                );

                let resultConse = await pool.request().query(
                    `SELECT TOP(1) * FROM orden_concepto WHERE CLAVE_BITACORA = ${body.CLAVE_BITACORA} AND VALE_TERMINAL = '${body.VALE_TERMINAL}' ORDER BY fch_crea DESC`
                );

                let nuevoAdj = ({
                    CLAVE_BITACORA: Number(body.CLAVE_BITACORA),
                    CONSECUTIVO: Number(resultConse.recordset[0].CONSECUTIVO) + 1,
                    CONCEPTO_CLAVE: conceptoEncontrado.concepto_clave, 
                    VALE_RANGO: body.VALE_RANGO,
                    IMPORTE: body.IMPORTE,
                    REFERENCIA: body.REFERENCIA,
                    VALE_TERMINAL: body.VALE_TERMINAL,
                    VALE_FOLIO: Number(resultConseVT.recordset[0].VALE_FOLIO) + 1,
                    VALE_FECHA: moment(today).format('YYYY-MM-DD') + "T00:00:00.000Z",
                    POLIZA_CB: body.POLIZA_CB,
                    POLIZA_CXP: body.POLIZA_CXP,
                    PERIODO_CB: moment(lastDay).format('YYYY-MM-DD') + " 00:00:00",
                    PERIODO_CXP: body.PERIODO_CXP,
                    STATUS_VALE: body.STATUS_VALE,
                    PREFIJO: body.PREFIJO,
                    CUENTA_BAN: body.CUENTA_BAN,
                    BENEFICIARIO: body.BENEFICIARIO,
                    USR_AUTORIZA: body.USR_AUTORIZA,
                    IMPRESO: body.IMPRESO,
                    USR_FIRMO: body.USR_FIRMO,
                    OPERADOR_CLAVE: result.recordset[0].OPERADOR_CLAVE,
                    LIQUIDACION_CLAVE: body.LIQUIDACION_CLAVE,
                    PAGADO: body.PAGADO,
                    USR_CREA: '002358',
                    FCH_CREA: moment(today).format('YYYY-MM-DDTHH:mm:ss') + ".000Z",
                    USR_MOD: body.USR_MOD,
                    FCH_MOD: body.FCH_MOD,
                    USR_PAG: body.USR_PAG,
                    FCH_PAG: body.FCH_PAG,
                    USR_CAN: body.USR_CAN,
                    FCH_CAN: body.FCH_CAN,
                    vale_saldo: body.vale_saldo,
                    tmp_pago_tes: body.tmp_pago_tes,
                    importe_pagado: body.importe_pagado,
                    OBSERV_VALE: body.OBSERV_VALE,
                    TRACTO_NUM_ECO_PROV: body.TRACTO_NUM_ECO_PROV,
                    GASTO_CLAVE: body.GASTO_CLAVE,
                    deduccion_clave: body.deduccion_clave,
                    VALE_FOLIO_SUST: body.VALE_FOLIO_SUST,
                    ban_ayudante: body.ban_ayudante,
                    NO_GEN_POL: body.NO_GEN_POL,
                    TIPO_ANTICIPO_CLAVE: body.TIPO_ANTICIPO_CLAVE,
                    CONSEC_OS_MNIOB: body.CONSEC_OS_MNIOB,
                    maniobra_clave: body.maniobra_clave,
                    es_maniobra: body.es_maniobra,
                    PERMISIONARIO_LIQ_CLAVE: body.PERMISIONARIO_LIQ_CLAVE,
                    PRELIQUIDACION_CLAVE: body.PRELIQUIDACION_CLAVE,
                    BAN_PRELIQUIDA: body.BAN_PRELIQUIDA,
                    tipoValeSalida: body.tipoValeSalida,
                    banAutorizaLayoutLiq: body.banAutorizaLayoutLiq,
                    ID_LAYOUT: body.ID_LAYOUT,
                    egresoLayout: body.egresoLayout,
                    periodoLayout: body.periodoLayout,
                    fechaLayout: body.fechaLayout,
                    idProcAut: body.idProcAut,
                    flagNotifCan: body.flagNotifCan
                });
                console.log(nuevoAdj);
                

                     // let result = await pool.request().query("INSERT INTO ORDEN_CONCEPTO (CLAVE_BITACORA,CONSECUTIVO,CONCEPTO_CLAVE,VALE_RANGO,IMPORTE,REFERENCIA,VALE_TERMINAL,VALE_FOLIO,VALE_FECHA,POLIZA_CB,POLIZA_CXP,PERIODO_CB,PERIODO_CXP,STATUS_VALE,PREFIJO,CUENTA_BAN,BENEFICIARIO,USR_AUTORIZA,IMPRESO,USR_FIRMO,OPERADOR_CLAVE,LIQUIDACION_CLAVE,PAGADO,USR_CREA,FCH_CREA,USR_MOD,FCH_MOD,USR_PAG,FCH_PAG,USR_CAN,FCH_CAN,vale_saldo,tmp_pago_tes,importe_pagado,OBSERV_VALE,TRACTO_NUM_ECO_PROV,GASTO_CLAVE,deduccion_clave,VALE_FOLIO_SUST,ban_ayudante,NO_GEN_POL,TIPO_ANTICIPO_CLAVE,CONSEC_OS_MNIOB,maniobra_clave,es_maniobra,PERMISIONARIO_LIQ_CLAVE,PRELIQUIDACION_CLAVE,BAN_PRELIQUIDA,tipoValeSalida,banAutorizaLayoutLiq,ID_LAYOUT,egresoLayout,periodoLayout,fechaLayout,idProcAut,flagNotifCan) \
            // VALUES (205478, 
            // 9, 
            // 12, 
            // 26, 
            // 1.000000, 
            // 'GASTO DE VIAJE', 
            // 'MTY3', 
            // 400000, 
            // '2025-09-05 00:00:00', 
            // 1569, 
            // NULL, 
            // '2025-09-30 00:00:00', 
            // NULL, 
            // 0, 
            // 'CMTY', 
            // '', 
            // 'FERRUZCA MONDRAGON ROBERTO CARLOS', 
            // '', 
            // 0, 
            // '', 
            // 2576, 
            // NULL, 
            // 1, 
            // '002358', 
            // '2025-09-05 08:04:58.000', 
            // NULL, 
            // NULL, 
            // '002358', 
            // '2025-09-05 08:05:03.000', 
            // NULL, 
            // NULL, 
            // 0.000000, 
            // 0.000000, 
            // 1.000000, 
            // 'GASTO DE VIAJE', 
            // 'TLEA-273', 
            // NULL, 
            // NULL, 
            // NULL, 
            // NULL, 
            // NULL, 
            // NULL, 
            // NULL, 
            // NULL, 
            // 0, 
            // NULL, 
            // NULL, 
            // NULL, 
            // 2, 
            // NULL, 
            // NULL, 
            // NULL, 
            // NULL, 
            // NULL, 
            // 0, 
            // 0);");
            
            // let result = await pool.request().query("update ORDEN_CONCEPTO set VALE_FOLIO = 204534 where VALE_FOLIO = 400006;");
            // await sql.close();
            
                res.json({
                    OK: true,
                    datos: nuevoAdj,
                    result: `Bitácora: ${body.CLAVE_BITACORA} Abierta`
                });
            }
            else {
                res.json({
                    OK: false,
                    result: `Bitácora: ${body.CLAVE_BITACORA} Cerrada o no Encontrada`
                });
            }
        }
        catch (err) {
            console.error('Error al conectar o hacer la consulta:', err);
            sql.close();
        }
    }

    return app;
}