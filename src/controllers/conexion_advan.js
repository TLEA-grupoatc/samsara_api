const dotenv = require('dotenv').config();
const moment = require('moment');
const sql = require('mssql');
const _ = require('lodash');

module.exports = app => {
    const Samsara = require("@api/samsara-dev-rel");
    Samsara.auth(process.env.KEYSAM);

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

            let result = await pool.request().query("SELECT BT.status_bitacora, FORMAT(BT.FECHA_BITACORA,'yyyy-MM-dd') as FECHA_BITACORA, BT.CLAVE_BITACORA, BT.PREFIJO, BT.FOLIO_BITACORA, BT.RANGO_BITACORA, BT.TERMINAL_BITACORA, BT.USR_CREA, BT.TRACTO_CLAVE, BT.TRACTO_NUM_ECO, BT.FCH_CREA, BT.FCH_MOD, BT.USR_MOD, FORMAT(BT.FECHA_SALIDA,'yyyy-MM-dd HH:mm:ss') as FECHA_SALIDA, BT.MONTO_ANTICIPO_SALIDA, BT.USR_CIERR, BT.FCH_CIERR, BT.OBSERVACIONES_OPERADOR, BT.INSTRUCCIONES_ESPECIALES, BT.LIQUIDACION_CLAVE, BT.NOTA_SISTEMA, BT.DIAS_SERVICIO, BT.kilometraje_inicial, BT.kilometraje_final, BT.terminal_cierre, BT.LITROS_DBL_OPERADOR, BT.MONTO_DIESEL_DBL_OPERADOR, BT.LIQ_DBL_OPR, BT.STATUS_VIAJE, BT.LECT_LITROS_COMP, BT.LECT_REND_COMP, BT.negocio_clave_bit, BT.LITROS_EXCESO, BT.LITROS_CIERRE, BT.difCombustible, BT.BAN_LIQUIDACION, BT.LIQUIDACION_CLAVE, OP.NEGOCIO_CLAVE, OP.OPERADOR_CLAVE, OP.OPERADOR_NOMBRE, KO.kilometros_carga1, KO.kilometros_vacio1, KO.total_kilometros1, RUT.ruta_min as ruta FROM BITACORAS AS BT\
                INNER JOIN bitacora_recorridos AS RUT ON RUT.CLAVE_BITACORA = BT.CLAVE_BITACORA\
                INNER JOIN OPERADOR AS OP ON OP.OPERADOR_CLAVE = BT.OPERADOR_CLAVE\
                INNER JOIN vKilometrosOperador00 AS KO ON KO.FOLIO_BITACORA = BT.FOLIO_BITACORA\
                AND OP.OPERADOR_NOMBRE = '" + req.params.operador + "'\
                AND KO.OPERADOR_NOMBRE = '" + req.params.operador + "'\
                AND BT.BAN_LIQUIDACION = 0\
                AND BT.LIQUIDACION_CLAVE = null\
                ORDER BY BT.FECHA_BITACORA ASC");
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
            let result = await pool.request().query("SELECT CLAVE_BITACORA, VALE_FOLIO, LITROS, FORMAT(VALE_FECHA,'yyyy-MM-dd') as VALE_FECHA, FORMAT(FCH_CREA,'yyyy-MM-dd HH:mm:ss') as FCH_CREA, IMPORTE, GASOLINERA_CLAVE, VALE_TERMINAL, PRECIO FROM ORDEN_VALES \
                WHERE CLAVE_BITACORA IN (" + req.params.claves + ") \
                AND LITROS > 0 \
                ORDER BY VALE_FECHA ASC");
                
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
            let result = await pool.request().query("SELECT RUTA_CLAVE, CLAVE_BITACORA, CASETA_CLAVE, NUM_ORDEN, FORMAT(CASETA_FECHA,'yyyy-MM-dd') as CASETA_FECHA, CARGO_EMPRESA, VALE_FOLIO, CARGO_OPERADOR, VALE_RANGO, REFERENCIA, BAN_CONVENIO, cruzo_rastreo, fch_cruzo_rastreo, FOLIO_VALE, CalculoRuta, tra_nodo_a, tra_nodo_b, tra_orden_paso, orden_ruta FROM orden_casetas WHERE CLAVE_BITACORA IN (" + req.params.claves + ") ORDER BY CASETA_FECHA ASC");

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



    app.pruebas = async (req, res) => {
        try {
            let pool = await sql.connect(config);

            // let result = await pool.request().query("SELECT * FROM vruta_completa WHERE CLAVE_BITACORA IN (169438, 169343, 168968, 168888, 168639, 168314, 168073)");
            // let result = await pool.request().query("SELECT * FROM ORDEN_CONCEPTO WHERE CLAVE_BITACORA in (169438, 169343, 168968, 168888, 168639, 168314, 168073)");
            // let result = await pool.request().query("SELECT * FROM vKilometrosOperador00 WHERE FOLIO_BITACORA = 6243");
            // let result = await pool.request().query("SELECT * FROM LIQUIDACION_GASTOS WHERE CLAVE_BITACORA IN (169438, 169343, 168968, 168888, 168639, 168314, 168073)");
            // let result = await pool.request().query("SELECT * FROM orden_casetas WHERE CLAVE_BITACORA IN (168375,168826,167987,168140)");
            // let result = await pool.request().query("SELECT * FROM concepto where concepto_clave = 29;");
            // let result = await pool.request().query("SELECT CLAVE_BITACORA, VALE_FOLIO, LITROS, VALE_FECHA FROM ORDEN_VALES WHERE CLAVE_BITACORA IN (168375,168826,167987)");
            let result = await pool.request().query("SELECT * FROM BITACORAS WHERE CLAVE_BITACORA = 171830");
            // let result = await pool.request().query("SELECT CLAVE_BITACORA, IMPORTE, REFERENCIA FROM ORDEN_VALES WHERE CLAVE_BITACORA IN (169438, 169343, 168968, 168888, 168639, 168314, 168073)");
            // let result = await pool.request().query("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES where TABLE_TYPE = 'BASE TABLE'");
            
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