const dotenv = require('dotenv').config();
const moment = require('moment');
const sql = require('mssql');
const _ = require('lodash');

module.exports = app => {
    const valediesel = app.database.models.ValesDiesel;
    const reseteoSamsaraHora = app.database.models.ReseteoSamsaraXHora;

    const Sequelize = require('sequelize');
    const { literal } = require('sequelize');
    const Op = Sequelize.Op;



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

    // samsaraDevRel.auth('samsara_api_hstw6FzOAtotyCJGFJmuIxmQfJPvhO');
    // samsaraDevRel.createDriverVehicleAssignment(
    //     {driverId: '54564', vehicleId: '48484919198981651'}
    // ).then(({ data }) => console.log(data)).catch(err => console.error(err));

    
  
  
  
  
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














































    app.obtenerReporteporHora = async (req, res) => {
          try {
            const hoy = new Date();
            const formato = moment(hoy).format('YYYY-MM-DD HH:mm:ss');

            Samsara.listVehicles().then(({ data }) => {
                const vehicles = data.data;
                
                vehicles.forEach(async (vehicle) => {
                    console.log(`economico: ${vehicle.name}, id_samsara: ${vehicle.id}`);
                    
                    // ecos.forEach(async (unidad) => {
                        const registro = await reseteoSamsaraHora.findAll({
                            where: { 
                                id_samsara: vehicle.id
                            },
                            order: [['fecha_fin', 'DESC']],
                            limit: 1
                        });

                        if(registro.length > 0) {
                            var ubi = await ultimaubi(vehicle.id);

                            Samsara.getVehicleStatsHistory({
                                startTime: registro[0].fecha_fin.replace(' ', 'T') + 'Z',
                                endTime: formato.replace(' ', 'T') + 'Z',
                                vehicleIds: vehicle.id,
                                types: 'fuelConsumedMilliliters,gpsDistanceMeters,gpsOdometerMeters'
                            })
                            .then(({ data }) => {
                                const resumen = buildVehicleSummary(data.data[0]);

                                let nuevaAlerta = new reseteoSamsaraHora({
                                    id_samsara: vehicle.id,
                                    economico: vehicle.name,
                                    diesel: resumen.fuelLiters,
                                    km: resumen.distanceKm,
                                    direccion: ubi.location,
                                    geocerca: ubi.geocerca,
                                    ultimoreseteo: registro[0].fecha_fin,
                                    fecha_inicio: formato,
                                    fecha_fin: formato,
                                    fecha_creacion: formato
                                });
                                reseteoSamsaraHora.create(nuevaAlerta.dataValues, {
                                    fields: [
                                    'id_samsara',
                                    'economico',
                                    'diesel',
                                    'km',
                                    'direccion',
                                    'geocerca',
                                    'ultimoreseteo',
                                    'fecha_inicio',
                                    'fecha_fin',
                                    'fecha_creacion'
                                    ]
                                });
                            }).catch(err => console.error(err));
                        }  
                        
                        
                        await new Promise(resolve => setTimeout(resolve, 4000));
                    // });
                });








                
            })
            .catch(err => console.error(err));
            

            


        }
        catch (error) {
            console.error('Error ', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }

        function getDeltaFromTimeSeries(series = []) {
            if (!Array.isArray(series) || series.length < 2) {
            return null;
            }

            const first = series[0];
            const last = series[series.length - 1];

            if (first?.value == null || last?.value == null) {
            return null;
            }

            return {
            startTime: first.time,
            endTime: last.time,
            delta: last.value - first.value
            };
        }

        function buildVehicleSummary(vehicle) {
            const fuel = getDeltaFromTimeSeries(vehicle.fuelConsumedMilliliters);
            const odo  = getDeltaFromTimeSeries(vehicle.gpsDistanceMeters); // usamos odómetro GPS

            const fuelMl     = fuel ? fuel.delta : null;
            const fuelLiters = fuel ? fuel.delta / 1000 : null;        // ml → L
            const distMeters = odo  ? odo.delta  : null;
            const distKm     = odo  ? odo.delta  / 1000 : null;        // m → km

            const kmPerLiter = fuelLiters && fuelLiters > 0 && distKm != null ? distKm / fuelLiters : null;

            return {
            id: vehicle.id,
            name: vehicle.name,
            fuelMl,          // consumo en mililitros
            fuelLiters,      // consumo en litros
            distanceMeters: distMeters,
            distanceKm: distKm,
            kmPerLiter,      // rendimiento aproximado
            startTime: fuel?.startTime ?? odo?.startTime ?? null,
            endTime:   fuel?.endTime   ?? odo?.endTime   ?? null
            };
        }
    }





   app.obtenerReseteoSamsaraporhora = (req, res) => {
        const hoy = new Date();
        const formato = moment(hoy).format('YYYY-MM-DD');
        reseteoSamsaraHora.findAll({
            where: {
                fecha_creacion: {
                    [Op.between]: [formato + ' 00:00:00', formato + ' 23:59:59']
                }
            },
            order: [['fecha_fin', 'DESC']]
        }).then(result => {
            res.json({
                OK: true,
                Reseteos: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }








    async function ultimaubi(iduni) {
    try {
        const result = await Samsara.getVehicleStats({
        vehicleIds: iduni,
        types: 'ecuSpeedMph,gps,obdOdometerMeters,fuelPercents'
        });

        // }).then(async result => {



            
        if(result && result.data && result.data.data.length > 0) {
            const elements = result['data']['data'];
            var resultados = [];
            var operador = '';
            
            for(const element of elements) {
                // Samsara.getVehicle({id: element.id}).then(vehicle => {
                //     console.log('Información del vehículo:', vehicle['data']['data']['staticAssignedDriver']['name']);
                //     operador = vehicle['data']['data']['staticAssignedDriver']['name'];
                // });

                // console.log('Información del vehículo:', element.name, 'ID:', element.id);
                
                var miakm = Number(element['ecuSpeedMph'].value) * 1.609;
                const momentFechaKm = moment(element['ecuSpeedMph'].time).subtract(6, 'hours');
                const momentFechaGps = moment(element['gps'].time).subtract(6, 'hours');
                const momentFechaOdo = moment(element['obdOdometerMeters'].time).subtract(6, 'hours');
                const fechaActualMX = moment().utcOffset('-06:00');
                const fechaGpsMX = moment(momentFechaGps).utcOffset('-06:00');
                const horasTranscurridas = fechaActualMX.diff(fechaGpsMX, 'hours', true);
                var horasfinales = horasTranscurridas - 6;

                resultados.push({
                    id_unidad: element.id,
                    unidad: element.name,
                    operador: operador,
                    fechahorakm: momentFechaKm.toISOString().replace('.000Z', 'Z'),
                    km: miakm.toFixed(),
                    fechahoragps: momentFechaGps.toISOString().replace('.000Z', 'Z'),
                    latitud: element['gps'].latitude,
                    longitud: element['gps'].longitude,
                    location: element['gps'].reverseGeo?.formattedLocation ?? null,
                    geocerca: element['gps'].address?.name ?? 'SIN GEOCERCA',
                    fechaodo: momentFechaOdo.toISOString().replace('.000Z', 'Z'),
                    odometer: element['obdOdometerMeters'].value,
                    estadounidad: miakm.toFixed() >= 10 ? 'En Movimiento' : 'Detenido',
                    fuelpercent: element['fuelPercent']?.value ?? 0,
                    horas: horasfinales.toFixed(2)
                });

            }

        return resultados[0]
        } 
        else {
        console.error('No GPS data found for the given vehicle ID.');
        return null;
        }
        // });
    }
    catch (error) {
        console.error('Error fetching vehicle stats:', error.message);
        return null;
    }
    }





    return app;
}