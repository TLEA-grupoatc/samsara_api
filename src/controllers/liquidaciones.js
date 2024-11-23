const dotenv = require('dotenv').config();
const { result, forEach } = require('lodash');
const moment = require('moment');
const sql = require('mssql');

module.exports = app => {

    const operador = app.database.models.Operadores;

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
                                actividad: datosorder[i].actividad,
                                unidades: bitacoras != undefined ? bitacoras.tractos : 0
                            });

                            los150.push(da);
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

    function getDatesArray(startDate, endDate) {
        const dates = [];
        let currentDate = new Date(startDate);
      
        while(currentDate <= new Date(endDate)) {
          dates.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }
      
        return dates;
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

    async function obtenerBitacoras(operador, fecha, uni) {
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
                tractos: countTypes
            });

            return datos
        }
        catch (error) {
            
        }
    }

    return app;
}