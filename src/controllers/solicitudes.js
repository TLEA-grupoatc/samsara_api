const dotenv = require('dotenv').config();
const moment = require('moment');
const sql = require('mssql');
const _ = require('lodash');

module.exports = app => {
    const valediesel = app.database.models.ValesDiesel;

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

    app.obtenerSolicitudes = (req, res) => {
        valediesel.findAll({
            where: {
                fecha_creacion: {
                    [Op.between]: [req.params.fechaInicio, req.params.fechaFin],
                }
            },
            order: [
                ['fecha_creacion', 'DESC']
            ],
        }).then(result => {
            res.json({
                OK: true,
                Solicitudes: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.createSolicitud = (req, res) => {
        let body = req.body;

        let nuevoRegistro = new valedielse({
            bitacora: body.bitacora,
            terminal: body.terminal,
            operador: body.operador,
            tracto: body.tracto,
            placas: body.placas,
            ruta: body.ruta,
            id_gasolinera: body.id_gasolinera,
            gasolinera: body.gasolinera,
            litros: body.litros,
            precio: body.precio,
            importe: body.importe,
            fecha_creacion: body.fecha_creacion,
            fecha_uso: body.fecha_uso,
            estado: body.estado
        });

        valedielse.create(nuevoRegistro.dataValues, {
            fields: [
                'bitacora', 
                'terminal', 
                'operador', 
                'tracto', 
                'placas', 
                'ruta', 
                'id_gasolinera', 
                'gasolinera', 
                'litros', 
                'precio', 
                'importe', 
                'fecha_creacion', 
                'fecha_uso', 
                'estado'
            ]
        })
        .then(async result => {
            res.json({
                OK: true,
                Solicitud: result
            })
        })
        .catch(error => {
            res.status(412).json({
                OK: false,
                msg: error.message
            });
        });
    }

    app.obtenerInfoBitacora = async (req, res) => {
        try {
            let pool = await sql.connect(config);

            let result = await pool.request().query("SELECT BT.CLAVE_BITACORA, BT.FOLIO_BITACORA, BT.FECHA_BITACORA, BT.TERMINAL_BITACORA, BT.TRACTO_NUM_ECO, OP.NEGOCIO_CLAVE, OP.OPERADOR_NOMBRE, RUT.ruta_min as ruta FROM BITACORAS AS BT\
                INNER JOIN bitacora_recorridos AS RUT ON RUT.CLAVE_BITACORA = BT.CLAVE_BITACORA \
                INNER JOIN OPERADOR AS OP ON OP.OPERADOR_CLAVE = BT.OPERADOR_CLAVE \
                WHERE BT.FOLIO_BITACORA = " + req.params.folio);

                // for(let index = 0; index < result['recordsets'][0].length; index++) {   
                //     console.log(result['recordsets'][0][index]);
                // }
    
            sql.close();
            
            res.json({
                OK: true,
                Info: result['recordsets'][0]
            });
        }
        catch (err) {
            console.error('Error al conectar o hacer la consulta:', err);
            sql.close();
        }
    }

    return app;
}