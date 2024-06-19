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

    app.totalUnidades = (req, res) => {
        unidad.count({})
        .then(result => {
            res.json({
                OK: true,
                Total: result
            });
        })
        .catch(err => {
            res.json({
                OK: false,
                msg: err
            });
        });
    }

    app.totalUnidadesGobernadas = (req, res) => {
        unidad.count({
            where: {
                gobernada: 1
            }
        })
        .then(result => {
            res.json({
                OK: true,
                Total: result
            });
        })
        .catch(err => {
            res.json({
                OK: false,
                msg: err
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
        var fecha = moment(new Date()).format('YYYY-MM-DDTHH:mm:ss');
        var paraValidadfecha = moment(new Date()).format('YYYY-MM-DD');
        var fechahora = fecha + 'Z';

        Samsara.getVehicleStats({
            time: fechahora,
            tagIds: '4343814,4244687,4236332,4399105,4531263,3907109',
            types: 'ecuSpeedMph,gps,obdOdometerMeters'
        }).then(result => {
            result['data']['data'].forEach(async (element) => {
                var validarfecha = element['ecuSpeedMph'].time.split('T')[0];
                var miakm = Number(element['ecuSpeedMph'].value) * 1.609;

                var miakmparavalidad = miakm.toFixed();

                if(paraValidadfecha == validarfecha && miakmparavalidad >= 8) {
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
                    .then(result => {})
                    .catch(error => {
                        console.log(error.message);
                    });
                }
            });

            res.json({
                OK: true,
                fechayhora: fechahora,
            });
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.obtenerReporte = async (req, res) => {
        reporte.findAll({
            attributes: [
                'unidad',
                [reporte.sequelize.fn('COUNT', reporte.sequelize.col('km')), 'min'],
                [reporte.sequelize.fn('MAX', reporte.sequelize.col('km')), 'velocidad_maxima'],
                [Sequelize.fn('SUM', Sequelize.literal("CASE WHEN km BETWEEN 8 AND 93 THEN 1 ELSE 0 END")), 'dentro'],
                [Sequelize.fn('SUM', Sequelize.literal("CASE WHEN km BETWEEN 94 AND 250 THEN 1 ELSE 0 END")), 'fuera']
            ],
            where: {
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
        }).then(result => {
            res.json({
                OK: true,
                fechas: req.params.fechainicio + ' ' + req.params.fechafin,
                Total: result.length,
                Reporte: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.obtenerDetalleReporte = (req, res) => {
        reporte.findAll({
            where: {
                unidad: req.params.unidad,
                fechahorakm: {
                    [Op.between]: [req.params.fechainicio, req.params.fechafin],
                }
            }
        }).then(result => {
            res.json({
                OK: true,
                Detalle: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.obtenerEventos = (req, res) => {
        var fecha = moment(new Date()).format('YYYY-MM-DDTHH:mm:ss');
        var fechahora = fecha + 'Z';

        var dataCreate = [];

        Samsara.getSafetyActivityEventFeed({startTime: fechahora}).then(result => {
            
            // result['data']['data'].forEach(async (element) => {
            //     if(element.type == "CreateSafetyEventActivityType"){
            //         dataCreate.push(element);
            //     }
            // });

            res.json({
                OK: true,
                FechayHora: fechahora,
                // Eventos: dataCreate,
                Eventos: result['data']['data'],
            });
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }


    app.obtenerMarcasVehiculo = (req, res) => {
        unidad.findAll({
            attributes: ['make'],
            group: ['make'],
            order: [
                ['make', 'ASC']
            ],
        }).then(result => {
            res.json({
                OK: true,
                Marcas: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.obtenerModelosVehiculo = (req, res) => {
        unidad.findAll({
            attributes: ['model'],
            group: ['model'],
            order: [
                ['model', 'ASC']
            ],
        }).then(result => {
            res.json({
                OK: true,
                Modelos: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.obtenerAnnosVehiculo = (req, res) => {
        unidad.findAll({
            attributes: ['year'],
            group: ['year'],
            order: [
                ['year', 'ASC']
            ],
        }).then(result => {
            res.json({
                OK: true,
                Annos: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }
    
    return app;
}