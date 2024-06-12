const moment = require('moment');
const _ = require('lodash');

module.exports = app => {

    const Samsara = require("@api/samsara-dev-rel");
    Samsara.auth('samsara_api_hstw6FzOAtotyCJGFJmuIxmQfJPvhO');

    const unidad = app.database.models.Unidades;
    const reporte = app.database.models.Reportes;

    const Sequelize = require('sequelize');
    const { literal } = require('sequelize');
    const Op = Sequelize.Op;

    app.obtenerParaGuardarUnidades = (req, res) => {
        Samsara.listVehicles({limit: '512'}).then(result => {

            result['data']['data'].forEach(async (element) => {
                let nuevaUnidad = new unidad({
                    id_unidad: element.id,
                    auxInputType1: element.auxInputType1,
                    auxInputType2: element.auxInputType2,
                    auxInputType3: element.auxInputType3,
                    cameraSerial: element.cameraSerial,
                    samsara_serial: element['externalIds']['samsara.serial'],
                    samsara_vin:  element['externalIds']['samsara.vin'],
                    gateway_serial: null,
                    gateway_model: null,
                    harshAccelerationSettingType: element.harshAccelerationSettingType,
                    licensePlate: element.licensePlate,
                    make: element.make,
                    model: element.model,
                    name: element.name,
                    notes: element.notes,
                    serial: element.serial,
                    tagid: element['tags'][0]['id'],
                    tag: element['tags'][0]['name'],
                    gobernada: 0,
                    staticAssignedDriver_id: null,
                    staticAssignedDriver_name: null,
                    vin: element.vin,
                    year: element.year,
                    vehicleRegulationMode: element.vehicleRegulationMode,
                    createdAtTime: element.createdAtTime,
                    updatedAtTime: element.updatedAtTime,
                    esn: element.esn,
                });

                await unidad.create(nuevaUnidad.dataValues, {
                    fields: [
                        'id_unidad',
                        'auxInputType1',
                        'auxInputType2',
                        'auxInputType3',
                        'cameraSerial',
                        'samsara_serial',
                        'samsara_vin',
                        'gateway_serial',
                        'gateway_model',
                        'harshAccelerationSettingType',
                        'licensePlate',
                        'make',
                        'model',
                        'name',
                        'notes',
                        'serial',
                        'tagid',
                        'tag',
                        'gobernada',
                        'staticAssignedDriver_id',
                        'staticAssignedDriver_name',
                        'vin',
                        'year',
                        'vehicleRegulationMode',
                        'createdAtTime',
                        'updatedAtTime',
                        'esn'
                    ]
                })
                .then(result => {
                    console.log(result);
                })
                .catch(error => {
                    console.log(error.message);
                });
            });

            res.json({
                OK: true,
                Vehiculos: result['data']['data'],
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.obtenerVehiculos = (req, res) => {
        unidad.findAll({}).then(result => {
            res.json({
                OK: true,
                Unidades: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.obtenerInfo = async (req, res) => {
        const datos = await unidad.findAll({});

        const dataJSON = JSON.parse(JSON.stringify(datos));

        var lista = [];

        dataJSON.forEach((dj) => {
            lista.push(dj.id_unidad)
        });

        await Samsara.getVehicleStatsHistory({
            startTime: '2024-06-06T00:00:00-06:00',
            endTime: '2024-06-06T23:59:59-06:00',
            vehicleIds: '281474989947461',
            types: 'ecuSpeedMph,obdOdometerMeters',
            decorations: 'ecuSpeedMph,gps'
        }).then(result => {
            result['data']['data'][0]['ecuSpeedMph'].forEach(async (element) => {

                var miakm = Number(element.value) * 1.609

                let nuevoReporte = new reporte({
                    id_unidad: result['data']['data'][0].id,
                    unidad: result['data']['data'][0].name,
                    fechahorakm: element.time,
                    km: miakm.toFixed(),
                    fechahoragps: element.time,
                    latitud: element.decorations.gps.latitude,
                    longitud: element.decorations.gps.longitude,
                    location: element.decorations.gps.reverseGeo.formattedLocation,
                    fechaodo: result['data']['data'][0]['obdOdometerMeters'][0]['time'],
                    odometer: result['data']['data'][0]['obdOdometerMeters'][0]['value']
                });

                await reporte.create(nuevoReporte.dataValues, {
                    fields: [
                        'id_unidad',
                        'unidad',
                        'fechahorakm',
                        'km',
                        'fechahoragps',
                        'latitud',
                        'longitud',
                        'location',
                        'fechaodo',
                        'odometer'
                    ]
                })
                .then(result => {
                    // console.log('indsertado');
                })
                .catch(error => {
                    console.log(error.message);
                });
            });

            res.json({
                OK: true
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.obtenerSnapshot = (req, res) => {
        console.log("ha paso un min");
        var fecha = moment(new Date()).format('YYYY-MM-DDTHH:mm:ss');
        var fechahora = fecha + 'Z';

        Samsara.getVehicleStats({
            time: fechahora,
            tagIds: '4343814,4244687,4236332,4399105,4531263,3907109',
            types: 'ecuSpeedMph,gps,obdOdometerMeters'
        })
        .then(result => {
            result['data']['data'].forEach(async (element) => {

                var miakm = Number(element['ecuSpeedMph'].value) * 1.609

                let nuevoReporte = new reporte({
                    id_unidad: element.id,
                    unidad: element.name,
                    fechahorakm: element['ecuSpeedMph'].time,
                    km: miakm.toFixed(),
                    fechahoragps: element['gps'].time,
                    latitud: element['gps'].latitude,
                    longitud: element['gps'].longitude,
                    location: element['gps'].reverseGeo.formattedLocation,
                    fechaodo: element['obdOdometerMeters'].time,
                    odometer: element['obdOdometerMeters'].value
                });

                await reporte.create(nuevoReporte.dataValues, {
                    fields: [
                        'id_unidad',
                        'unidad',
                        'fechahorakm',
                        'km',
                        'fechahoragps',
                        'latitud',
                        'longitud',
                        'location',
                        'fechaodo',
                        'odometer'
                    ]
                })
                .then(result => {
                    // console.log('indsertado');
                })
                .catch(error => {
                    console.log(error.message);
                });
            });

            res.json({
                OK: true,
                fechayhora: fechahora,
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.obtenerReporte = async (req, res) => {
        try {
            const datos = await unidad.findAll({});
            const dataJSON = JSON.parse(JSON.stringify(datos));
            let dataRows = [];
    
            for(const value of dataJSON) {
                const result = await reporte.findOne({
                    attributes: [
                        'unidad',
                        [reporte.sequelize.fn('COUNT', reporte.sequelize.col('km')), 'min'],
                        [reporte.sequelize.fn('MAX', reporte.sequelize.col('km')), 'velocidad_maxima'],
                        [reporte.sequelize.literal(`(SELECT COUNT(km) FROM reporte WHERE unidad = '` + value.name + `' AND km BETWEEN 8 AND 93 AND fechahorakm BETWEEN '` + req.params.fechainicio + `' AND '` + req.params.fechafin + `')`),'dentro'],
                        [reporte.sequelize.literal(`(SELECT COUNT(km) FROM reporte WHERE unidad = '` + value.name + `' AND km BETWEEN 94 AND 250 AND fechahorakm BETWEEN '` + req.params.fechainicio + `' AND '` + req.params.fechafin + `')`),'fuera']
                    ],
                    where: {
                        unidad: value.name,
                        fechahorakm: {
                            [Op.between]: [req.params.fechainicio, req.params.fechafin],
                        },
                        km: {
                            [Op.gte]: 8,
                        }
                    },
                    group: ['unidad'],
                    order: [
                        ['unidad', 'ASC']
                    ],
                });
    
                if(result) {
                    dataRows.push({
                        unidad: result.unidad,
                        min: result.dataValues.min,
                        velocidad_maxima: result.dataValues.velocidad_maxima,
                        dentro: result.dataValues.dentro,
                        fuera: result.dataValues.fuera
                    });
                }
            }
    
            res.json({
                OK: true,
                fechas: req.params.fechainicio + ' ' + req.params.fechafin,
                Total: dataRows.length,
                Reporte: dataRows
            });
        } catch (error) {
            console.error("Error al obtener el reporte:", error);
            res.status(500).json({
                OK: false,
                error: "Error al obtener el reporte"
            });
        }
    }
    
    return app;
}