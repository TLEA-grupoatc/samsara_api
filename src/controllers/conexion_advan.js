const dotenv = require('dotenv').config();
const moment = require('moment');
const sql = require('mssql');
const _ = require('lodash');

module.exports = app => {
    const Samsara = require("@api/samsara-dev-rel");
    Samsara.auth(process.env.KEYSAM);

    const unidad = app.database.models.Unidades;
    const geogaso = app.database.models.GeoGaso;

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
        console.log(fecha);
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

            console.log(resultado);
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

            console.log(result['data']['data'][0]['fuelPercents']);
            

            return litros;

            
        }
        catch (error){
            console.log(error.message);
            return 0;
        }
    }

    app.pruebas = async (req, res) => {
        try {
            let pool = await sql.connect(config);

            // let result = await pool.request().query("SELECT * FROM vruta_completa WHERE CLAVE_BITACORA IN (169438, 169343, 168968, 168888, 168639, 168314, 168073)");
            // let result = await pool.request().query("SELECT * FROM ORDEN_CONCEPTO WHERE CLAVE_BITACORA in (169438, 169343, 168968, 168888, 168639, 168314, 168073)");
            // let result = await pool.request().query("SELECT TOP(OM bitacoras WHERE BAN_LIQUIDACION = 1 AND OPERADOR_CLAVE = 602 ORDER BY FECHA_BITACORA DESC1) * FROM bitacoras WHERE BAN_LIQUIDACION = 1 AND OPERADOR_CLAVE = 602 ORDER BY FECHA_BITACORA DESC");
            // let result = await pool.request().query("SELECT * FROM TRACTO");

            // let result = await pool.request().query("SELECT TOP(5) * FROM vKilometrosOperador00");
            let result = await pool.request().query("SELECT TOP(2) * FROM BITACORAS");
            // 
            // let result = await pool.request().query("SELECT Top(100) BT.TRACTO_NUM_ECO, BT.VALE_FECHA, BT.litros FROM vvalescomb AS BT \
            //     ORDER BY BT.VALE_FECHA DESC");


            // let result = await pool.request().query("SELECT BT.TRACTO_NUM_ECO FROM vvalescomb AS BT \
            //     WHERE VALE_FECHA >= '" + '2024-11-01T00:00:00.000Z' + "' \
            //     AND liquidacion = 's/l' \
            //     GROUP BY BT.TRACTO_NUM_ECO");
            // let result = await pool.request().query("SELECT BT.status_bitacora, FORMAT(BT.FECHA_BITACORA,'yyyy-MM-dd') as FECHA_BITACORA, BT.CLAVE_BITACORA, BT.PREFIJO, BT.FOLIO_BITACORA, BT.DOBLE_OPERADOR, BT.RANGO_BITACORA, BT.TERMINAL_BITACORA, BT.USR_CREA, BT.TRACTO_CLAVE, BT.TRACTO_NUM_ECO, BT.FCH_CREA, BT.FCH_MOD, BT.USR_MOD, FORMAT(BT.FECHA_SALIDA,'yyyy-MM-dd HH:mm:ss') as FECHA_SALIDA, BT.MONTO_ANTICIPO_SALIDA, BT.USR_CIERR, FORMAT(BT.FCH_CIERR,'yyyy-MM-dd HH:mm:ss') as FCH_CIERR, BT.OBSERVACIONES_OPERADOR, BT.INSTRUCCIONES_ESPECIALES, BT.NOTA_SISTEMA, BT.DIAS_SERVICIO, BT.kilometraje_inicial, BT.kilometraje_final, BT.terminal_cierre, BT.LITROS_DBL_OPERADOR, BT.MONTO_DIESEL_DBL_OPERADOR, BT.LIQ_DBL_OPR, BT.STATUS_VIAJE, BT.LECT_LITROS_COMP, BT.LECT_REND_COMP, BT.negocio_clave_bit, BT.LITROS_EXCESO, BT.LITROS_CIERRE, BT.difCombustible, BT.BAN_LIQUIDACION, BT.LIQUIDACION_CLAVE, OP.NEGOCIO_CLAVE, OP.OPERADOR_CLAVE, OP.OPERADOR_NOMBRE, KO.kilometros_carga1, KO.kilometros_vacio1, KO.total_kilometros1, RUT.ruta_min as ruta FROM BITACORAS AS BT\
            //     INNER JOIN bitacora_recorridos AS RUT ON RUT.CLAVE_BITACORA = BT.CLAVE_BITACORA \
            //     INNER JOIN OPERADOR AS OP ON OP.OPERADOR_CLAVE = BT.OPERADOR_CLAVE \
            //     INNER JOIN vKilometrosOperador00 AS KO ON KO.FOLIO_BITACORA = BT.FOLIO_BITACORA \
            //     WHERE BT.BAN_LIQUIDACION = 0 AND RUT.ruta_min != 'MOEY-MOEY' AND  RUT.ruta_min != 'SACA-SACA'\
            //     AND OP.OPERADOR_NOMBRE = '" + 'GONZALEZ LEGORRETA ENRIQUE' + "' \
            //     AND KO.OPERADOR_NOMBRE = '" + 'GONZALEZ LEGORRETA ENRIQUE' + "' \
            //     ORDER BY FECHA_BITACORA");

            // let result = await pool.request().query("SELECT BT.CLAVE_BITACORA, BT.FOLIO_BITACORA, BT.TRACTO_NUM_ECO, BT.BAN_LIQUIDACION, BT.FCH_CIERR, RUT.ruta_min  FROM bitacoras AS BT \
            //     INNER JOIN bitacora_recorridos AS RUT ON RUT.CLAVE_BITACORA = BT.CLAVE_BITACORA \
            //     WHERE BT.BAN_LIQUIDACION = 0 AND RUT.ruta_min != 'MOEY-MOEY' AND  RUT.ruta_min != 'SACA-SACA'\
            //     AND BT.FCH_CIERR >= '2024-01-01T00:00:00.000Z' ORDER BY BT.FCH_CIERR DESC");

                



            // let result = await pool.request().query("SELECT * FROM LIQUIDACION_GASTOS WHERE CLAVE_BITACORA IN (169438, 169343, 168968, 168888, 168639, 168314, 168073)");
            // let result = await pool.request().query("SELECT * FROM orden_casetas WHERE CLAVE_BITACORA IN (168375,168826,167987,168140)");
            // let result = await pool.request().query("SELECT * FROM concepto where concepto_clave = 29;");
            // let result = await pool.request().query("SELECT CONCEPTO_DESCRIP FROM concepto GROUP BY CONCEPTO_DESCRIP;");
            // let result = await pool.request().query("SELECT CLAVE_BITACORA, VALE_FOLIO, LITROS, VALE_FECHA FROM ORDEN_VALES WHERE CLAVE_BITACORA IN (168375,168826,167987)");
            // let result = await pool.request().query("SELECT * FROM BITACORAS WHERE CLAVE_BITACORA = 171830");
            // let result = await pool.request().query("SELECT CLAVE_BITACORA, IMPORTE, REFERENCIA FROM ORDEN_VALES WHERE CLAVE_BITACORA IN (169438, 169343, 168968, 168888, 168639, 168314, 168073)");
            // let result = await pool.request().query("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES where TABLE_TYPE = 'BASE TABLE'");
            // let result = await pool.request().query("SELECT * FROM BITACORAS AS BT\
            //     INNER JOIN bitacora_recorridos AS RUT ON RUT.CLAVE_BITACORA = BT.CLAVE_BITACORA \
            //     INNER JOIN OPERADOR AS OP ON OP.OPERADOR_CLAVE = BT.OPERADOR_CLAVE \
            //     INNER JOIN vKilometrosOperador00 AS KO ON KO.FOLIO_BITACORA = BT.FOLIO_BITACORA \
            //     AND OP.OPERADOR_NOMBRE = '" + 'GONZALEZ CORTES JORGE ISMAEL' + "' \
            //     AND KO.OPERADOR_NOMBRE = '" + 'GONZALEZ CORTES JORGE ISMAEL' + "';");


            
            // let claves = await pool.request().query("SELECT CLAVE_BITACORA FROM BITACORAS WHERE FCH_CREA BETWEEN '2024-01-01T00:00:00.000Z' AND '2024-11-03T23:59:59.000Z'");
                
            //     var clave = []
                
            //     claves['recordsets'][0].forEach(element => {
            //         clave.push(element.CLAVE_BITACORA);
            //     });

 
                
                // let result = await pool.request().query("SELECT OC.CLAVE_BITACORA, BT.FOLIO_BITACORA, OC.IMPORTE, OC.REFERENCIA, CON.CONCEPTO_DESCRIP, OC.VALE_TERMINAL, OC.VALE_FOLIO, FORMAT(OC.VALE_FECHA,'yyyy-MM-dd') as VALE_FECHA, FORMAT(OC.FCH_CREA,'yyyy-MM-dd HH:mm:ss') as FCH_CREA, OP.OPERADOR_CLAVE, OP.OPERADOR_NOMBRE, OC.PREFIJO FROM ORDEN_CONCEPTO AS OC \
                // let result = await pool.request().query("SELECT OC.CLAVE_BITACORA, OC.FOLIO_BITACORA, OP.OPERADOR_CLAVE, OP.OPERADOR_NOMBRE, OC.VALE_TERMINAL, OC.VALE_FOLIO, OC.VALE_FECHA, OC.CONCEPTO_DESCRIP, OC.IMPORTE  FROM liquidacion_anticipos AS OC \
                // INNER JOIN OPERADOR AS OP ON OP.OPERADOR_CLAVE = OC.OPERADOR_CLAVE \
                // WHERE OC.CLAVE_BITACORA IN (" + clave.toString().replace('[', '').replace(']', '') + ")");
                // INNER JOIN CONCEPTO AS CON ON CON.CONCEPTO_CLAVE = OC.CONCEPTO_CLAVE \
                // INNER JOIN BITACORAS AS BT ON BT.CLAVE_BITACORA = OC.CLAVE_BITACORA \


            
            // Checar
            // let result = await pool.request().query("SELECT * FROM bitacora_recorridos WHERE CLAVE_BITACORA IN (168375,168826,167987,168140)");

            // vorden_casetas_km
            // orden_casetas
            // vruta_completa
            // ruta
            // vcons_liq_gastos_viaje
            // voperador_examen
            // deduccion_operador

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
    
    return app;
}