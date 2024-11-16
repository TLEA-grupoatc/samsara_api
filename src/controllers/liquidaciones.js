const dotenv = require('dotenv').config();
const { result } = require('lodash');
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
            
            const dateArray = getDatesArray(req.params.fechaInicio, req.params.fechaFin);


            // var ops = await operador.findAll({
            //     where: {
            //         estado: 'A'
            //     },
            //     // limit: 10
            // });

            let ops = await pool.request().query("SELECT OPERADOR_NOMBRE FROM OPERADOR WHERE STATUS = 1");

            var datos = [];
            var enorder = [];
            var los150 = [];
            
            for(let index = 0; index < ops['recordsets'][0].length; index++) {
                let result = await pool.request().query("SELECT TOP(1) VRPD.TERMINAL_CLAVE, FORMAT(VRPD.FCH_LIQUIDACION,'yyyy-MM-dd') as FCH_LIQUIDACION, DATEDIFF(DAY, VRPD.FCH_LIQUIDACION, '" + req.params.fechaInicio + "') AS DIAS, VRPD.OPERADOR_NOMBRE, VRPD.TRACTO_NUM_ECO, VRPD.MONTO FROM vRepDedPer_sueldo AS VRPD\
                    WHERE VRPD.OPERADOR_NOMBRE = '" + ops['recordsets'][0][index].OPERADOR_NOMBRE + "' \
                    AND VRPD.TRACTO_NUM_ECO NOT LIKE 'PHES%' \
                    ORDER BY FCH_LIQUIDACION DESC");
                    // WHERE VRPD.OPERADOR_NOMBRE = '" + ops[index].nombre + "' \
                
                datos.push(result['recordsets'][0][0]);
            }

            var datosorder = datos.sort((a, b) => b.DIAS - a.DIAS);

            for(let i = 0; i <= 149; i++) {
                var unidad;

                var sinexpacio = datosorder[i].TERMINAL_CLAVE.trim();

                if(sinexpacio === 'MTY') {
                    unidad = 'UNIDAD 1';
                }
                else {
                    unidad = sinexpacio.replace('MTY', 'UNIDAD ');
                }

                if(datosorder[i].DIAS > 13 && datosorder[i].DIAS <= 60) {
                    let da = ({
                        TERMINAL_CLAVE: unidad,
                        FCH_LIQUIDACION: datosorder[i].FCH_LIQUIDACION,
                        DIAS: datosorder[i].DIAS,
                        OPERADOR_NOMBRE: datosorder[i].OPERADOR_NOMBRE,
                        MONTO: datosorder[i].MONTO
                    });
                    los150.push(da);
                }
            }

            enorder = los150;
            
            const subarraySize = Math.ceil(enorder.length / 5);

            const array1 = enorder.slice(0, subarraySize);
            const array2 = enorder.slice(subarraySize, subarraySize * 2);
            const array3 = enorder.slice(subarraySize * 2, subarraySize * 3);
            const array4 = enorder.slice(subarraySize * 3, subarraySize * 4);
            const array5 = enorder.slice(subarraySize * 4, enorder.length);

            var registros = [];

            registros.push(
                {"uno": array1},
                {"dos": array2},
                {"tres": array3},
                {"cuatro": array4},
                {"cinco": array5}
            )
            
            sql.close();
            
            res.json({
                OK: true,
                Datos: registros
                // Datos: result['recordsets'][0]
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
            
            const dateArray = getDatesArray(req.params.fechaInicio, req.params.fechaFin);

            // var ops = await operador.findAll({
            //     where: {
            //         estado: 'A'
            //     },
            //     // limit: 10
            // });

            let ops = await pool.request().query("SELECT OPERADOR_NOMBRE FROM OPERADOR WHERE STATUS = 1");

            var datos = [];
            var enorder = [];
            var los150 = [];
            
            for(let index = 0; index < ops['recordsets'][0].length; index++) {
                let result = await pool.request().query("SELECT TOP(1) VRPD.TERMINAL_CLAVE, FORMAT(VRPD.FCH_LIQUIDACION,'yyyy-MM-dd') as FCH_LIQUIDACION, DATEDIFF(DAY, VRPD.FCH_LIQUIDACION, '" + req.params.fechaInicio + "') AS DIAS, VRPD.OPERADOR_NOMBRE, VRPD.TRACTO_NUM_ECO, VRPD.MONTO FROM vRepDedPer_sueldo AS VRPD\
                    WHERE VRPD.OPERADOR_NOMBRE = '" + ops['recordsets'][0][index].OPERADOR_NOMBRE + "' \
                    AND VRPD.TRACTO_NUM_ECO NOT LIKE 'PHES%' \
                    ORDER BY FCH_LIQUIDACION DESC");
                    // WHERE VRPD.OPERADOR_NOMBRE = '" + ops[index].nombre + "' \
                
                    if(result['recordsets'][0].length > 0) {

                        datos.push(result['recordsets'][0][0]);
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
                    
                    if(datosorder[i].DIAS > 13 && datosorder[i].DIAS <= 50) {
                        let da = ({
                            TERMINAL_CLAVE: unidad,
                            FCH_LIQUIDACION: datosorder[i].FCH_LIQUIDACION,
                            DIAS: datosorder[i].DIAS,
                            OPERADOR_NOMBRE: datosorder[i].OPERADOR_NOMBRE,
                            MONTO: datosorder[i].MONTO
                        });
                        los150.push(da);
                    }
                }
            }

            enorder = los150;
            
            const subarraySize = Math.ceil(enorder.length / 5);

            const array1 = enorder.slice(0, subarraySize);
            const array2 = enorder.slice(subarraySize, subarraySize * 2);
            const array3 = enorder.slice(subarraySize * 2, subarraySize * 3);
            const array4 = enorder.slice(subarraySize * 3, subarraySize * 4);
            const array5 = enorder.slice(subarraySize * 4, enorder.length);

            var registros = [];

            registros.push(
                {"uno": array1},
                {"dos": array2},
                {"tres": array3},
                {"cuatro": array4},
                {"cinco": array5}
            )
            
            sql.close();
            
            res.json({
                OK: true,
                Datos: registros
                // Datos: result['recordsets'][0]
            });
        }
        catch (err) {
            console.error('Error al conectar o hacer la consulta:', err);
            sql.close();
        }
    }

    return app;
}