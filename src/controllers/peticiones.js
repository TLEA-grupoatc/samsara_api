const dotenv = require('dotenv').config();
const cron = require('node-cron');
const moment = require('moment');
const _ = require('lodash');
const fs = require("fs");

module.exports = app => {
    const Samsara = require("@api/samsara-dev-rel");
    Samsara.auth(process.env.KEYSAM);

    const unidad = app.database.models.Unidades;
    const docunidad = app.database.models.DocsUnidades;
    const historalgob = app.database.models.HistorialGobenadas;
    const reporte = app.database.models.Reportes;
    const alerta = app.database.models.Alertas;
    const seguimiento = app.database.models.Seguimientos;
    const ope = app.database.models.Operadores;
    const ubiporeco = app.database.models.UBICACIONESPORECONOMICO;

    const Sequelize = require('sequelize');
    const { literal } = require('sequelize');
    const Op = Sequelize.Op;
    const axios = require('axios');

    const { parseISO, format,  startOfWeek, differenceInCalendarWeeks, endOfDay, es } = require('date-fns');

    app.reporteInmovilizadores = async (req, res) => {
        var listatractos = [
            '281474983153054',
            '281474983153055',
            '281474983153056',
            '281474983153919',
            '281474986276846',
            '281474986277769',
            '281474986342766',
            '281474986343418',
            '281474986344183',
            '281474986344653',
            '281474986345232',
            '281474986346077',
            '281474986389542',
            '281474986459989',
            '281474986474380',
            '281474986475533',
            '281474986511784',
            '281474986618174',
            '281474986618333',
            '281474986618649',
            '281474986668160',
            '281474986723697',
            '281474986769420',
            '281474986769821',
            '281474986866803',
            '281474986867401',
            '281474986875752',
            '281474986875788',
            '281474986987819',
            '281474987116567',
            '281474987116740',
            '281474987118224',
            '281474987118390',
            '281474987119299',
            '281474987119414',
            '281474987171333',
            '281474987171437',
            '281474987172105',
            '281474987172126',
            '281474987173095',
            '281474987248141',
            '281474987248459',
            '281474987262015',
            '281474987262730',
            '281474987262924',
            '281474987263224',
            '281474987288211',
            '281474987288937',
            '281474987289621',
            '281474987290459',
            '281474987290475',
            '281474987371159',
            '281474987372575',
            '281474987373640',
            '281474987375124',
            '281474987375848',
            '281474987376634',
            '281474987377322',
            '281474987386323',
            '281474987386882',
            '281474987396083',
            '281474987454558',
            '281474987454753',
            '281474987455044',
            '281474987455208',
            '281474987488411',
            '281474987488609',
            '281474987532863',
            '281474987533981',
            '281474987535490',
            '281474987537550',
            '281474987547710',
            '281474987549216',
            '281474987552404',
            '281474987571639',
            '281474987571812',
            '281474987572072',
            '281474987572228',
            '281474987572429',
            '281474987572577',
            '281474987572742',
            '281474987572860',
            '281474987573000',
            '281474987573159',
            '281474987591732',
            '281474987604275',
            '281474987608346',
            '281474987610600',
            '281474987611025',
            '281474987611652',
            '281474987626879',
            '281474987640910',
            '281474987641186',
            '281474987641803',
            '281474987641851',
            '281474987642695',
            '281474987642993',
            '281474987643314',
            '281474987644855',
            '281474987645131',
            '281474987657388',
            '281474987657939',
            '281474987658797',
            '281474987659113',
            '281474987659722',
            '281474987664336',
            '281474987684281',
            '281474987684834',
            '281474987685316',
            '281474987685818',
            '281474987704285',
            '281474987720813',
            '281474987722887',
            '281474987752702',
            '281474987753968',
            '281474987754308',
            '281474987754953',
            '281474987755203',
            '281474987755524',
            '281474987755821',
            '281474987784636',
            '281474987798161',
            '281474987809747',
            '281474987811203',
            '281474987813689',
            '281474987814701',
            '281474987815196',
            '281474987847114',
            '281474987872655',
            '281474987883494',
            '281474987884548',
            '281474987885312',
            '281474987886147',
            '281474987887319',
            '281474987888190',
            '281474987889442',
            '281474987889506',
            '281474987890428',
            '281474987890445',
            '281474987891138',
            '281474987900335',
            '281474987900994',
            '281474987921001',
            '281474987921339',
            '281474987921493',
            '281474987941713',
            '281474987941810',
            '281474987941965',
            '281474987942085',
            '281474987942221',
            '281474987971048',
            '281474987971604',
            '281474987972456',
            '281474987973878',
            '281474987974896',
            '281474987975345',
            '281474988005872',
            '281474988006086',
            '281474988006606',
            '281474988007367',
            '281474988007751',
            '281474988008930',
            '281474988030924',
            '281474988030968',
            '281474988031137',
            '281474988031284',
            '281474988031462',
            '281474988059179',
            '281474988110598',
            '281474988161494',
            '281474988162938',
            '281474988225644',
            '281474988227800',
            '281474988248441',
            '281474988248700',
            '281474988249206',
            '281474988260144',
            '281474988260610',
            '281474988261558',
            '281474988261714',
            '281474988297302',
            '281474988302571',
            '281474988343459',
            '281474988454992',
            '281474988538064',
            '281474988538113',
            '281474988538121',
            '281474988538467',
            '281474988538503',
            '281474988538647',
            '281474988538927',
            '281474988539208',
            '281474988539249',
            '281474988539480',
            '281474988539482',
            '281474988539486',
            '281474988539499',
            '281474988540388',
            '281474988540472',
            '281474988540576',
            '281474988580652',
            '281474988782191',
            '281474988837966',
            '281474988949372',
            '281474988949643',
            '281474988949926',
            '281474988950157',
            '281474988950348',
            '281474988995735',
            '281474989006904',
            '281474989107051',
            '281474989107103',
            '281474989107387',
            '281474989107424',
            '281474989107681',
            '281474989107694',
            '281474989107858',
            '281474989107868',
            '281474989112351',
            '281474989112358',
            '281474989112520',
            '281474989112548',
            '281474989112694',
            '281474989112753',
            '281474989112909',
            '281474989112954',
            '281474989126310',
            '281474989146026',
            '281474989269431',
            '281474989296293',
            '281474989301846',
            '281474989313403',
            '281474989313611',
            '281474989313614',
            '281474989359721',
            '281474989360038',
            '281474989360683',
            '281474989361841',
            '281474989362451',
            '281474989362938',
            '281474989363208',
            '281474989471567',
            '281474989479502',
            '281474989480041',
            '281474989480852',
            '281474989481444',
            '281474989482546',
            '281474989483168',
            '281474989483791',
            '281474989595073',
            '281474989774589',
            '281474989890292',
            '281474989947461',
            '281474989983319',
            '281474990069178',
            '281474991149028',
            '281474991224412',
            '281474991447223',
            '281474991449338',
            '281474991450084',
            '281474991451123',
            '281474991451532',
            '281474991451951',
            '281474991730607',
            '281474991838226',
            '281474991862656',
            '281474991876766',
            '281474991877451',
            '281474991878022',
            '281474991879693',
            '281474991894096',
            '281474991931769',
            '281474991932804',
            '281474992144250',
            '281474992144719',
            '281474992160335',
            '281474992219388',
            '281474992226486',
            '281474992486686',
            '281474992549798',
            '281474992568977',
            '281474992569501',
            '281474992573060',
            '281474992573641',
            '281474992607329',
            '281474992865497',
            '281474992903253',
            '281474992903450',
            '281474992940817',
            '281474992941480',
            '281474992942075',
            '281474997217669',
            '281474997218824',
            '281474997219217',
            '281474997220390',
            '281474997220664',
            '281474997224987',
            '281474997225229',
            '281474997225630',
            '281474997225905',
            '281474997226116',
            '281474997226444',
            '281474997227034',
            '281474997270046',
            '281474997271107',
            '281474997272294'
        ];
        let allResults = [];

        const pstartDate = moment().subtract(7, 'days').format('YYYY-MM-DD');
        const pendDate = moment().format('YYYY-MM-DD');
        const startDate = pstartDate.toString() + 'T00:00:00Z';
        const endDate = pendDate.toString() + 'T23:59:59Z';

        var vueltas = 0;

        for(let i = 0; i < listatractos.length; i += 1) {
            vueltas += 1;
            const batch = listatractos.slice(i, i + 1);

            try {
                console.log(batch);

                const params = {
                    vehicleIds: batch,
                    startTime: startDate,
                    endTime: endDate
                };

                const response = await Samsara.getEngineImmobilizerStates(params);

                let grouped = {};
                if(response.data && Array.isArray(response.data.data)) {
                    response.data.data.forEach(item => {
                        const id = item.vehicleId;
                        const fecha = new Date(item.happenedAtTime);
                        if(!grouped[id] || new Date(grouped[id].happenedAtTime) < fecha) {
                            grouped[id] = item;
                        }
                    });
                }

                allResults.push(...Object.values(grouped));
            }
            catch (error) {
                console.error(`Error con tractos ${batch.join(',')}:`, error);
            }

            if(vueltas % 5 === 0) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }


        res.json({
            OK: true,
            Resultados: allResults,
            Total: allResults.length
        });
    }

    app.obtenerReporteUltimaLocacion = async (req, res) => {
        Samsara.getVehicleStats({
            tagIds: '4343814,4244687,4236332,4399105,4531263,3907109',
            types: 'ecuSpeedMph,gps,obdOdometerMeters,fuelPercents'
        }).then(async result => {
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

            res.json({
                OK: true,
                Total: resultados.length,
                Reporte: resultados
            });
        });
    }

    app.obtenerReporteULYI = async (req, res) => {
        try {
            // 1. Obtener los vehículos y sus stats
            const vehiculosResult = await Samsara.getVehicleStats({
                tagIds: '4343814,4244687,4236332,4399105,4531263,3907109',
                types: 'ecuSpeedMph,gps,obdOdometerMeters,fuelPercents'
            });

            const elements = vehiculosResult?.data?.data || vehiculosResult?.data || [];

            // 2. Obtener el estado del inmovilizador para cada vehículo
            const allImmobilizerData = [];
            const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

            for (const element of elements) {
                try {
                    const response = await Samsara.getEngineImmobilizerStates({
                        vehicleIds: element.id,
                        startTime: '2025-07-25T00:00:00Z',
                        endTime: '2025-12-31T23:59:59Z'
                    });
                    const data = response?.data ?? response;
                    allImmobilizerData.push(...(Array.isArray(data) ? data : [data]));
                } catch (error) {
                    console.error(`Error con tracto ${element.id}:`, error);
                }
                await sleep(500);
            }

            // Agrupar por vehicleId y seleccionar el más reciente
            const agrupadoPorVehiculo = {};
            allImmobilizerData.forEach(item => {
                const id = item.vehicleId;
                const fecha = new Date(item.happenedAtTime);
                if (!agrupadoPorVehiculo[id] || new Date(agrupadoPorVehiculo[id].happenedAtTime) < fecha) {
                    agrupadoPorVehiculo[id] = item;
                }
            });
            const reporteimmobilzadores = Object.values(agrupadoPorVehiculo);

            // 3. Armar el reporte final
            const resultados = elements.map(element => {
                const miakm = Number(element['ecuSpeedMph']?.value ?? 0) * 1.609;
                const momentFechaKm = moment(element['ecuSpeedMph']?.time).subtract(6, 'hours');
                const momentFechaGps = moment(element['gps']?.time).subtract(6, 'hours');
                const momentFechaOdo = moment(element['obdOdometerMeters']?.time).subtract(6, 'hours');
                const fechaActualMX = moment().utcOffset('-06:00');
                const fechaGpsMX = moment(momentFechaGps).utcOffset('-06:00');
                const horasTranscurridas = fechaActualMX.diff(fechaGpsMX, 'hours', true);

                // Buscar el estado del inmovilizador más reciente para este vehículo
                const estadoInmovilizador = agrupadoPorVehiculo[element.id] || null;

                return {
                    id_unidad: element.id,
                    unidad: element.name,
                    fechahorakm: momentFechaKm.isValid() ? momentFechaKm.toISOString().replace('.000Z', 'Z') : null,
                    km: miakm.toFixed(),
                    fechahoragps: momentFechaGps.isValid() ? momentFechaGps.toISOString().replace('.000Z', 'Z') : null,
                    latitud: element['gps']?.latitude ?? null,
                    longitud: element['gps']?.longitude ?? null,
                    location: element['gps']?.reverseGeo?.formattedLocation ?? null,
                    geocerca: null,
                    fechaodo: momentFechaOdo.isValid() ? momentFechaOdo.toISOString().replace('.000Z', 'Z') : null,
                    odometer: element['obdOdometerMeters']?.value ?? null,
                    estadounidad: miakm >= 10 ? 'En Movimiento' : 'Detenido',
                    fuelpercent: element['fuelPercent']?.value ?? 0,
                    horas: (horasTranscurridas - 6).toFixed(),
                    estadoInmovilizador
                };
            });

            res.json({
                OK: true,
                Total: resultados.length,
                Reporte: resultados
            });
        } catch (error) {
            res.status(412).json({
                OK: false,
                msg: error.message
            });
        }
    }

    app.obtenerParaGuardarUnidades = (req, res) => {
        var tractos = []
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
                    fechagobernada: null,
                    paromotor: 0,
                    fechaparomotor: null,
                    instaladoen: '',
                    fechacompromisopm: null,
                    staticAssignedDriver_id: null,
                    staticAssignedDriver_name: null,
                    vin: element.vin,
                    year: element.year,
                    vehicleRegulationMode: element.vehicleRegulationMode,
                    createdAtTime: element.createdAtTime,
                    updatedAtTime: element.updatedAtTime,
                    esn: '',
                    estado: 'A'
                });
                tractos.push(nuevaUnidad);
            });

            res.json({
                OK: true,
                Tractos: tractos
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    async function enlazarUnidadAOperadorSamsara() {
        var fechaHoy = moment(new Date()).format('YYYY-MM-DDTHH:mm:ssZ');
        var operadores = [];
        var tractos = [];
        var listafinal= [];

        const operadoresResult = await Samsara.listDrivers();
        operadoresResult['data']['data'].forEach(element => {
            operadores.push({
                id_operador: element.id,
                name: element.name
            });
        });

        const tractosResult = await Samsara.listVehicles({ limit: '512' });
        tractosResult['data']['data'].forEach(element => {
            if(element.name && element.name.startsWith('C-')) {
                element.name = element.name.replace('C-', 'C');
            }

            tractos.push({
                id_unidad: element.id,
                name: element.name
            });
        });

        const listaoperadoresAdvan = await axios.get('https://servidorlocal.ngrok.app/obtenerBitacorasQuinceDias');
        const listaadvan = listaoperadoresAdvan.data.Registros || [];

        function delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        for(const op of listaadvan) {
            const operador = operadores.find(o => o.name === op.operador);
            const tracto = tractos.find(t => t.name === op.economico);
            
            op.id_operador = operador ? operador.id_operador : null;
            op.id_unidad = tracto ? tracto.id_unidad : null;
            op.fecha = fechaHoy;
            
            let data = new ope({
                tracto_actual: op.economico,
                fecha_actividad: moment().format('YYYY-MM-DD')
            });
            
            ope.update(data.dataValues, {
                where: {
                    nombre: op.operador
                },
                fields: ['tracto_actual', 'fecha_actividad']
            });
            
            if(op.id_operador && op.id_unidad) {
                listafinal.push(op);
                await Samsara.createDriverVehicleAssignment({
                    driverId: op.id_operador,
                    vehicleId: op.id_unidad
                }).then(({ data }) => console.log(data)).catch(err => console.error(err));
            }

            await delay(250);
        }
    }

    app.obtenerEnlazarOpeSam = async  (req, res) => {
        var fechaHoy = moment(new Date()).format('YYYY-MM-DDTHH:mm:ssZ');
        var operadores = [];
        var tractos = [];
        var listafinal = [];
        var listanovalidos = [];

        const operadoresResult = await Samsara.listDrivers();
        operadoresResult['data']['data'].forEach(element => {
            operadores.push({
                id_operador: element.id,
                name: element.name
            });
        });

        const tractosResult = await Samsara.listVehicles({ limit: '512' });
        tractosResult['data']['data'].forEach(element => {
            if(element.name && element.name.startsWith('C-')) {
                element.name = element.name.replace('C-', 'C');
            }

            tractos.push({
                id_unidad: element.id,
                name: element.name
            });
        });

        const listaoperadoresAdvan = await axios.get('https://servidorlocal.ngrok.app/obtenerBitacorasQuinceDias');
        const listaadvan = listaoperadoresAdvan.data.Registros || [];

        function delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        // for(const op of listaadvan) {
        //     const operador = operadores.find(o => o.name === op.operador);
        //     const tracto = tractos.find(t => t.name === op.economico);
            
        //     op.id_operador = operador ? operador.id_operador : null;
        //     op.id_unidad = tracto ? tracto.id_unidad : null;
        //     op.fecha = fechaHoy;
            
        //     // let data = new operador({
        //     //     tracto_actual: op.economico,
        //     //     fecha_actividad: moment().format('YYYY-MM-DD')
        //     // });
        
            
        //     listafinal.push(op);
        //     // operador.update(data.dataValues, {
        //     //     where: {
        //     //         nombre: op.operador
        //     //     },
        //     //     fields: ['tracto_actual', 'fecha_actividad']
        //     // });
            
        //     // if(op.id_operador && op.id_unidad) {
        //     //     listafinal.push(op);
        //     //     await Samsara.createDriverVehicleAssignment({
        //     //         driverId: op.id_operador,
        //     //         vehicleId: op.id_unidad
        //     //     }).then(({ data }) => console.log(data)).catch(err => console.error(err));
        //     // }
        //     // else {
        //     //     listanovalidos.push(op);
        //     // }

        //     // await delay(100);
        // }

        res.json({
            OK: true,
            listafinal: listaadvan,
            novalidos: listanovalidos
        })
    }

    cron.schedule('02 09 * * *', () => { enlazarUnidadAOperadorSamsara(); });
    cron.schedule('02 10 * * *', () => { enlazarUnidadAOperadorSamsara(); });
    cron.schedule('02 11 * * *', () => { enlazarUnidadAOperadorSamsara(); });
    cron.schedule('02 12 * * *', () => { enlazarUnidadAOperadorSamsara(); });
    cron.schedule('02 13 * * *', () => { enlazarUnidadAOperadorSamsara(); });
    cron.schedule('02 14 * * *', () => { enlazarUnidadAOperadorSamsara(); });
    cron.schedule('02 15 * * *', () => { enlazarUnidadAOperadorSamsara(); });
    cron.schedule('02 16 * * *', () => { enlazarUnidadAOperadorSamsara(); });
    cron.schedule('02 17 * * *', () => { enlazarUnidadAOperadorSamsara(); });

    app.obtenerVehiculos = (req, res) => {
        unidad.findAll({
            order: [
                ['name', 'DESC']
            ],
        }).then(result => {
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

    app.obtenerVehiculosxTag = (req, res) => {
        unidad.findAll({
            where: {
                tag: req.params.tag
            },
            order: [
                ['name', 'DESC']
            ],
        }).then(result => {
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

    app.actualizarUnidad = (req, res) => {
        let body = req.body;

        let editarRegistro = new unidad({
            auxInputType1: body.auxInputType1,
            auxInputType2: body.auxInputType2,
            auxInputType3: body.auxInputType3,
            cameraSerial: body.cameraSerial,
            samsara_serial: body.samsara_serial,
            samsara_vin:  body.samsara_vin,
            gateway_serial: body.gateway_serial,
            gateway_model: body.gateway_model,
            harshAccelerationSettingType: body.harshAccelerationSettingType,
            licensePlate: body.licensePlate,
            make: body.make,
            model: body.model,
            name: body.name,
            notes: body.notes,
            serial: body.serial,
            tagid: body.tagid,
            tag: body.tag,
            gobernada: body.gobernada,
            fechagobernada: body.fechagobernada,
            paromotor: body.paromotor,
            fechaparomotor: body.fechaparomotor,
            instaladoen: body.instaladoen,
            fechacompromisopm: body.fechacompromisopm,
            staticAssignedDriver_id: body.staticAssignedDriver_id,
            staticAssignedDriver_name: body.staticAssignedDriver_name,
            vin: body.vin,
            year: body.year,
            vehicleRegulationMode: body.vehicleRegulationMode,
            createdAtTime: body.createdAtTime,
            updatedAtTime: body.updatedAtTime,
            esn: body.esn,
            tanque: body.tanque,
            division: body.division,
            idcliente: body.idcliente
        });

        unidad.update(editarRegistro.dataValues, {
            where: {
                id_unidad: req.params.id_unidad
            },
            fields: [
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
                'fechagobernada', 
                'paromotor', 
                'fechaparomotor', 
                'instaladoen', 
                'fechacompromisopm', 
                'staticAssignedDriver_id', 
                'staticAssignedDriver_name', 
                'vin', 
                'year', 
                'vehicleRegulationMode', 
                'createdAtTime', 
                'updatedAtTime',
                'esn',
                'tanque',
                'division',
                'idcliente'
            ]
        })
        .then(result => {
            res.json({
                OK: true,
                rows_affected: result[0]
            })
        })
        .catch(error => {
            res.status(412).json({
                OK: false,
                msg: error.message
            });
        });
    }

    app.totalUnidades = (req, res) => {
        unidad.count({
            where: {
                estado: 'A'
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

    app.totalUnidadesGobernadas = (req, res) => {
        unidad.count({
            where: {
                gobernada: 1,
                estado: 'A'
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

    app.totalUnidadesGobernadasCapana = (req, res) => {
        unidad.count({
            where: {
                gobernada: 2,
                estado: 'A'
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

    app.crearDocumentoUnidad = (req, res) => {
        let body = req.body;
        var directorio = 'documentos/';

        if(!fs.existsSync(directorio)) {
            fs.mkdirSync(directorio, {recursive: true});
        }

        const [, base64Content] = body.archivo.split(',');
        var big1 = Buffer.from(base64Content, 'base64');

        var fechacorta = body.fecha.replace('-', '').replace('-', '').replace(' ', '').replace(':', '').replace(':', '');

        fs.writeFileSync(directorio + body.usuario + '_' + body.unidad + '_' + fechacorta + '_' + body.nombre, big1);
        
        doc = directorio + body.usuario + '_' + body.unidad + '_' + fechacorta + '_' + body.nombre;

        let nuevoDocumento = new docunidad({
            unidad: body.unidad,
            nombre: body.nombre,
            descripcion: body.descripcion,
            tipo: body.tipo,
            archivo: doc,
            comentario: body.comentario,
            fecha: body.fecha,
            usuario: body.usuario
        });

        docunidad.create(nuevoDocumento.dataValues, {
            fields: [
                'unidad',
                'nombre', 
                'descripcion', 
                'tipo', 
                'archivo',
                'comentario',
                'fecha',
                'usuario'
            ]
        })
        .then(result => {
            res.json({
                OK: true,
                Documento: result
            });
        }).catch(error => {
            res.status(412).json({
                OK: false,
                msg: error.message
            });
        });
    }

    app.verDocumentosUnidad = (req, res) => {
        docunidad.findAll({
            where: {
                unidad: req.params.unidad
            },
            order: [
                ['fecha', 'DESC']
            ],
        }).then(result => {
            res.json({
                OK: true,
                Documentos: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.verHisorialGobernas = (req, res) => {
        historalgob.findAll({
            where: {
                unidad: req.params.unidad
            },
            order: [
                ['fecha', 'DESC']
            ],
        }).then(result => {
            res.json({
                OK: true,
                Historial: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.totalUnidadesConParoMotor = (req, res) => {
        unidad.count({
            where: {
                paromotor: 1,
                estado: 'A'
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

    app.obtenerSnapshot = (req, res) => {
        var fecha = moment(new Date()).format('YYYY-MM-DDTHH:mm:ss');
        var paraValidadfecha = moment(new Date()).format('YYYY-MM-DD');
        var fechahora = fecha + 'Z';

        Samsara.getVehicleStats({
            tagIds: '4343814,4244687,4236332,4399105,4531263,3907109',
            types: 'ecuSpeedMph,gps,obdOdometerMeters'
        }).then(result => {
            result['data']['data'].forEach(async (element) => {
                var validarfecha = element['ecuSpeedMph'].time.split('T')[0];
                var miakm = Number(element['ecuSpeedMph'].value) * 1.609;

                var miakmparavalidad = miakm.toFixed();

                if(paraValidadfecha == validarfecha && miakmparavalidad >= 10) {
         
                    const momentFechaKm = moment(element['ecuSpeedMph'].time).subtract(6, 'hours');
                    const momentFechaGps = moment(element['gps'].time).subtract(6, 'hours');
                    const momentFechaOdo = moment(element['obdOdometerMeters'].time).subtract(6, 'hours');
                   
                    let nuevoReporte = new reporte({
                        id_unidad: element.id,
                        unidad: element.name,
                        fechahorakm: momentFechaKm.toISOString().replace('.000Z', 'Z'),
                        km: miakm.toFixed(),
                        fechahoragps: momentFechaGps.toISOString().replace('.000Z', 'Z'),
                        latitud: element['gps'].latitude,
                        longitud: element['gps'].longitude,
                        location: element['gps'].reverseGeo.formattedLocation,
                        fechaodo: momentFechaOdo.toISOString().replace('.000Z', 'Z'),
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
                [Sequelize.fn('SUM', Sequelize.literal("CASE WHEN km BETWEEN 8 AND 100 THEN 1 ELSE 0 END")), 'dentro'],
                [Sequelize.fn('SUM', Sequelize.literal("CASE WHEN km BETWEEN 101 AND 250 THEN 1 ELSE 0 END")), 'fuera']
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

    app.obtenerReporteJson = async (req, res) => {
        const fechainicio = req.params.fechainicio + 'T00:00:00Z';
        const fechafin = req.params.fechafin + 'T23:59:59Z';

        reporte.findAll({
            attributes: [
            'unidad',
            [Sequelize.fn('MAX', Sequelize.col('location')), 'location'],
            [Sequelize.fn('DATE', Sequelize.col('fechaodo')), 'fecha'],
            [Sequelize.fn('MIN', Sequelize.col('odometer')), 'odometro_inicio'],
            [Sequelize.fn('MAX', Sequelize.col('odometer')), 'odometro_fin']
            ],
            where: {
            fechaodo: {
                [Op.between]: [fechainicio, fechafin],
            }
            },
            group: ['unidad', Sequelize.fn('DATE', Sequelize.col('fechaodo'))],
            order: [['unidad', 'ASC'], [Sequelize.fn('DATE', Sequelize.col('fechaodo')), 'ASC']]
        }).then(result => {
            // Calcular la diferencia por día
            const reporteFinal = result.map(row => {
            const data = row.dataValues;
            const odometro_inicio = Number(data.odometro_inicio) || 0;
            const odometro_fin = Number(data.odometro_fin) || 0;

            var res = odometro_fin - odometro_inicio
            return {
                unidad: data.unidad,
                fecha: data.fecha,
                odometro_inicio,
                odometro_fin,
                recorrido: res / 1000,
                location: data.location
            };
            });

            res.json({
            OK: true,
            fechas: fechainicio + ' ' + fechafin,
            Total: reporteFinal.length,
            Reporte: reporteFinal
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
            },
            order: [
                ['fechahorakm', 'DESC']
            ],
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
        var fechahora = fecha + '-06:00';

        var dataCreate = [];

        Samsara.getSafetyActivityEventFeed({startTime: fechahora}).then(result => {
        // Samsara.getSafetyActivityEventFeed().then(result => {
            
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

    app.obtenerDivisionesVehiculo = (req, res) => {
        unidad.findAll({
            attributes: ['tag'],
            group: ['tag'],
            order: [
                ['tag', 'ASC']
            ],
        }).then(result => {
            res.json({
                OK: true,
                Division: result
            })
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

    app.obtenerAlertas = async (req, res) => {
        if(req.params.division == 'Todas') {
            var paralagrafica = [];

            alerta.findAll({
                attributes: ['event', [Sequelize.fn('COUNT', Sequelize.col('event')), 'total']],
                where: {
                    eventTime: {
                        [Op.between]: [req.params.fechainicio, req.params.fechafin],
                    }
                },
                group: ['event'],
            }).then(result => {
                paralagrafica = result;
            })
            .catch(error => {
                console.log(error);
            });

            alerta.findAll({
                where: {
                    eventTime: {
                        [Op.between]: [req.params.fechainicio, req.params.fechafin],
                    }
                },
                order: [
                    ['eventTime', 'DESC']
                ],
            }).then(result => {
                res.json({
                    OK: true,
                    Alertas: result,
                    Grafica: paralagrafica
                })
            })
            .catch(error => {
                res.status(412).json({
                    msg: error.message
                });
            });
        }
        else {
            var divi = await getUnidadesDivision(req.params.division);

            var paralagrafica = [];

            alerta.findAll({
                attributes: ['event', [Sequelize.fn('COUNT', Sequelize.col('event')), 'total']],
                where: {
                    id_unidad: {
                        [Op.in]: divi
                    },
                    eventTime: {
                        [Op.between]: [req.params.fechainicio, req.params.fechafin],
                    }
                },
                group: ['event'],
            }).then(result => {
                paralagrafica = result;
            })
            .catch(error => {
                console.log(error);
            });

            alerta.findAll({
                where: {
                    eventTime: {
                        [Op.between]: [req.params.fechainicio, req.params.fechafin],
                    }
                },
                order: [
                    ['eventTime', 'DESC']
                ],
            }).then(result => {
                res.json({
                    OK: true,
                    Alertas: result,
                    Grafica: paralagrafica
                })
            })
            .catch(error => {
                res.status(412).json({
                    msg: error.message
                });
            });
        }
    }
    
    app.obtenerCatalagoEventos = (req, res) => {
        alerta.findAll({
            attributes: ['event'],
            group: ['event'],
            order: [
                ['event', 'ASC']
            ],
        }).then(result => {
            res.json({
                OK: true,
                Eventos: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.primeraInteraccion = (req, res) => {
        let body = req.body;

        let asignacion = new alerta({
            estado: body.estado,
            primer_interaccion: body.primer_interaccion,
            fechahora_interaccion: body.fechahora_interaccion
        });

        alerta.update(asignacion.dataValues, {
            where: {
                id_alerta: req.params.id_alerta
            },
            individualHooks: true, 
            fields: [
                'estado',
                'primer_interaccion',
                'fechahora_interaccion'
            ]
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

    app.cierreDeAlertas = (req, res) => {
        let body = req.body;

        let asignacion = new alerta({
            estado: body.estado,
            fecha_cierre: body.fecha_cierre,
        });

        alerta.update(asignacion.dataValues, {
            where: {
                id_alerta: req.params.id_alerta
            },
            individualHooks: true, 
            fields: [
                'estado',
                'fecha_cierre'
            ]
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

    app.crearSeguimiento = (req, res) => {
        let body = req.body;
        const date = new Date(body.fechahora);
        const formato = moment(date).format('YYYY-MM-DD HH:mm:ss');
        
        let nuevoRegistro = new seguimiento({
            id_alerta: body.id_alerta,
            nivel: body.nivel,
            usuario: body.usuario,
            evento: body.evento, 
            descripcionEvento: body.descripcionEvento, 
            fechahoraEvento: body.fechahoraEvento, 
            urlEvento: body.urlEvento, 
            unidad: body.unidad, 
            accion: body.accion,
            solucion: body.solucion,
            estado: body.estado,
            fechahora: formato
        });

        seguimiento.create(nuevoRegistro.dataValues, {
            fields: [
                'id_alerta',
                'nivel',
                'usuario',
                'evento', 
                'descripcionEvento', 
                'fechahoraEvento', 
                'urlEvento', 
                'unidad', 
                'accion',
                'solucion',
                'estado',
                'fechahora'
            ]
        })
        .then(result => {
            res.json({
                OK: true,
                Seguimiento: result
            })
        })
        .catch(error => {
            res.status(412).json({
                OK: false,
                msg: error.message
            });
        });
    }

    app.obtenerSeguimientoUsuario = (req, res) => {
        seguimiento.findAll({
            where: {
                usuario: req.params.usuario,
                fechahora: {
                    [Op.between]: [req.params.fechainicio, req.params.fechafin],
                },
            },
            order: [
                ['fechahora', 'DESC']
            ]
        }).then(result => {
            res.json({
                OK: true,
                SeguimientoUsuario: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.primeraInteraccionSeguimiento = (req, res) => {
        let body = req.body;

        let asignacion = new seguimiento({
            fechahora_interaccion: body.fechahora_interaccion
        });

        seguimiento.update(asignacion.dataValues, {
            where: {
                id_seguimiento: req.params.id_seguimiento
            },
            individualHooks: true, 
            fields: [
                'fechahora_interaccion'
            ]
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

    app.obtenerGeocercas = (req, res) => {
        var geocercas = [];

        Samsara.listAddresses().then(result => {
            result['data']['data'].forEach(async (element) => {

                let geos = ({
                    id_geo: element.id,
                    geocerca: element.name,
                    direccion: element.formattedAddress
                });

                geocercas.push(geos);
            });

            res.json({
                OK: true,
                Geocercas: geocercas,
            });
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.obtenerReporteParoMotor = (req, res) => {
        unidad.findAll({
            attributes: [
                'tag',
                [unidad.sequelize.fn('COUNT', unidad.sequelize.col('paromotor')), 'total'],
            ],
            where: {
                paromotor: 1
            },
            group: ['tag'],
            order: [
                ['tag', 'ASC']
            ],
        }).then(result => {
            res.json({
                OK: true,
                Reporte: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }





    // app.obtenerGraficaGobernadas = async (req, res) => {
    //     var today = new Date();
    //     var year = today.getFullYear();
    //     var resultadounidades  = [];
    //     var groupedByType;

    //     await unidad.findAll({
    //         where: {
    //             fechagobernada: {
    //                 [Op.startsWith]: year
    //             }
    //         },
    //         order: [
    //             ['name', 'DESC']
    //         ],
    //     }).then(result => {resultadounidades = result})
    //     .catch(error => {
    //         res.status(412).json({
    //             msg: error.message
    //         });
    //     });

    //     groupedByType = resultadounidades.reduce((acc, registro) => {
    //         const fecha = parseISO(registro.fechagobernada + ' 00:00:00');
    //         const startOfCurrentWeek = startOfWeek(fecha, { weekStartsOn: 1 });
    //         const weekNumber = differenceInCalendarWeeks(startOfCurrentWeek, new Date(year, 0, 1), { weekStartsOn: 1 });
            
    //         if(!acc[weekNumber]) {
    //             acc[weekNumber] = [];
    //         }

    //         acc[weekNumber].push(registro);
            
    //         return acc;
    //     }, {});


    //     res.json({
    //         OK: true,
    //         Grafica: groupedByType
    //     })
    // }





// Asegúrate de tener estos imports/utilidades


    app.obtenerGraficaGobernadas = async (req, res) => {
    try {
        const today = new Date();
        const year = today.getFullYear();

        // Rango del año actual (desde 1 de enero hasta hoy)
        const inicioAnio = new Date(year, 0, 1);
        const finRango = endOfDay(today);

        // Trae solo lo necesario y en crudo
        const resultadounidades = await unidad.findAll({
        attributes: ['fechagobernada'],
        where: {
            fechagobernada: { [Op.between]: [inicioAnio, finRango] }
        },
        raw: true
        });

        // Calcula la "semana actual" relativa al 1 de enero (semana 1 = la del 1 de enero)
        const startOfYearWeek = startOfWeek(inicioAnio, { weekStartsOn: 1 }); // lunes
        const currentWeek =
        differenceInCalendarWeeks(
            startOfWeek(today, { weekStartsOn: 1 }),
            startOfYearWeek,
            { weekStartsOn: 1 }
        ) + 1;

        // Prepara arreglo de semanas con cero (1..currentWeek)
        const grafica = Array.from({ length: currentWeek }, (_, i) => ({
        semana: i + 1,
        unidades: 0
        }));

        // Agrupa y cuenta por semana (1-based), ignorando nulos
        for (const r of resultadounidades) {
        const fecha = r.fechagobernada ? new Date(r.fechagobernada) : null;
        if (!fecha || isNaN(fecha)) continue;

        const startOfCurrentWeek = startOfWeek(fecha, { weekStartsOn: 1 });
        const weekNumber =
            differenceInCalendarWeeks(
            startOfCurrentWeek,
            startOfYearWeek,
            { weekStartsOn: 1 }
            ) + 1;

        if (weekNumber >= 1 && weekNumber <= currentWeek) {
            grafica[weekNumber - 1].unidades += 1;
        }
        }

        // Respuesta lista para graficar
        res.json({
        ok: true,
        anio: year,
        semanas_totales: currentWeek,
        grafica // [{ semana: 1, unidades: X }, ...]
        });
    } catch (error) {
        console.error(error);
        res.status(412).json({ msg: error.message });
    }
    };






    app.obtenerGraficaUnidadesParoMotor = async (req, res) => {
        var today = new Date();
        var year = today.getFullYear();
        var resultadounidades  = [];
        var groupedByType;

        await unidad.findAll({
            where: {
                fechaparomotor: {
                    [Op.startsWith]: year
                }
            },
            order: [
                ['name', 'DESC']
            ],
        }).then(result => {resultadounidades = result})
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });

        groupedByType = resultadounidades.reduce((acc, registro) => {
            const fecha = parseISO(registro.fechaparomotor + ' 00:00:00');
            const startOfCurrentWeek = startOfWeek(fecha, { weekStartsOn: 1 });
            const weekNumber = differenceInCalendarWeeks(startOfCurrentWeek, new Date(year, 0, 1), { weekStartsOn: 1 });
            
            if(!acc[weekNumber]) {
                acc[weekNumber] = [];
            }

            acc[weekNumber].push(registro);
            
            return acc;
        }, {});


        res.json({
            OK: true,
            Grafica: groupedByType
        })
    }

    app.obtenerGraficaOperadorAlertas = async (req, res) => {
        var resultado  = [];

        await alerta.findAll({
            attributes: [
                'eventTime',
                'numero_empleado',
                'operador',
                [alerta.sequelize.fn('COUNT', alerta.sequelize.col('operador')), 'alertas'],
            ],
            where: {
                eventTime: {
                    [Op.between]: [req.params.fechainicio, req.params.fechafin],
                },
                operador: {
                    [Op.not]: null
                }
            },
            group: ['operador']
        }).then(result => {resultado = result})
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });

        res.json({
            OK: true,
            Grafica: resultado
        })
    }

    app.obtenerReporteGeneral = (req, res) => {
        alerta.findAll({
            include: {
                model: unidad, 
                as: 'Unidades',
                attributes: ['tag']
            },
            attributes: [
                [alerta.sequelize.fn('COUNT', alerta.sequelize.col('id_alerta')), 'namas'], // Cambié de SUM a COUNT
                'event',
                [alerta.sequelize.fn('COUNT', alerta.sequelize.col('event')), 'total'],
                [Sequelize.fn('COUNT', Sequelize.literal("CASE WHEN Alertas.estado = 'A' THEN '' END")), 'activo'],
                [Sequelize.fn('COUNT', Sequelize.literal("CASE WHEN Alertas.estado = 'P' THEN '' END")), 'proceso'],
                [Sequelize.fn('COUNT', Sequelize.literal("CASE WHEN Alertas.estado = 'T' THEN '' END")), 'terminado']
            ],
            where: {
                eventTime: {
                    [Op.between]: [req.params.fechainicio, req.params.fechafin],
                }
            },
            group: ['Unidades.tag', 'event'],
            order: [
                ['event', 'ASC']
            ],
        })
        .then(result => {
            res.json({
                OK: true,
                ReporteAlertas: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.obtenerCumplientoAlertas = (req, res) => {
        alerta.findAll({
            attributes: [
                'event',
                'primer_interaccion',
                [reporte.sequelize.fn('COUNT', reporte.sequelize.col('estado')), 'total'],
                'estado'
            ],
            where: {
                eventTime: {
                    [Op.between]: [req.params.fechainicio, req.params.fechafin],
                }
            },
            group: ['event', 'estado', 'primer_interaccion'],
            order: [
                ['event', 'ASC']
            ],
        }).then(result => {
            res.json({
                OK: true,
                ReporteAlertas: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.obtenerReporteAlertas = async (req, res) => {
        if(req.params.division == 'Todas') {
            alerta.findAll({
                attributes: [
                    'event',
                    [reporte.sequelize.fn('COUNT', reporte.sequelize.col('estado')), 'total'],
                    [Sequelize.fn('COUNT', Sequelize.literal("CASE WHEN Alertas.estado = 'A' THEN '' END")), 'activo'],
                    [Sequelize.fn('COUNT', Sequelize.literal("CASE WHEN Alertas.estado = 'P' THEN '' END")), 'proceso'],
                    [Sequelize.fn('COUNT', Sequelize.literal("CASE WHEN Alertas.estado = 'T' THEN '' END")), 'terminado']
                ],
                where: {
                    eventTime: {
                        [Op.between]: [req.params.fechainicio, req.params.fechafin],
                    }
                },
                group: ['event'],
                order: [
                    ['event', 'ASC']
                ],
            }).then(result => {
                res.json({
                    OK: true,
                    ReporteAlertas: result
                })
            })
            .catch(error => {
                res.status(412).json({
                    msg: error.message
                });
            });
        }
        else {
            var divi = await getUnidadesDivision(req.params.division);
            alerta.findAll({
                attributes: [
                    'event',
                    [reporte.sequelize.fn('COUNT', reporte.sequelize.col('estado')), 'total'],
                    [Sequelize.fn('COUNT', Sequelize.literal("CASE WHEN Alertas.estado = 'A' THEN '' END")), 'activo'],
                    [Sequelize.fn('COUNT', Sequelize.literal("CASE WHEN Alertas.estado = 'P' THEN '' END")), 'proceso'],
                    [Sequelize.fn('COUNT', Sequelize.literal("CASE WHEN Alertas.estado = 'T' THEN '' END")), 'terminado']
                ],
                where: {
                    id_unidad: {
                        [Op.in]: divi
                    },
                    eventTime: {
                        [Op.between]: [req.params.fechainicio, req.params.fechafin],
                    }
                },
                group: ['event'],
                order: [
                    ['event', 'ASC']
                ],
            }).then(result => {
                res.json({
                    OK: true,
                    ReporteAlertas: result
                })
            })
            .catch(error => {
                res.status(412).json({
                    msg: error.message
                });
            });
        }
    }

    app.obtenerTiempoDeRespuesta = async (req, res) => {
        if(req.params.division == 'Todas') {
            alerta.findAll({
                attributes: [
                    'id_alerta',
                    'event',
                    [Sequelize.fn('TIMESTAMPDIFF', Sequelize.literal("MINUTE, eventTime, fecha_cierre")), 'minutos'],
                ],
                where: {
                    eventTime: {
                        [Op.between]: [req.params.fechainicio, req.params.fechafin],
                    },
                    estado: 'T'
                }
            }).then(result => {
                var min = []

                result.forEach((re) => {
                    min.push(re.dataValues.minutos)
                });

                var totales = min.reduce((a, b) => a + b, 0);

                var promedio = totales / result.length;

                let pro = ({
                    promedio: promedio.toFixed(2)
                });

                res.json({
                    OK: true,
                    TiempoRespuesta: [pro]
                })
            })
            .catch(error => {
                res.status(412).json({
                    msg: error.message
                });
            });
        }
        else {
            var divi = await getUnidadesDivision(req.params.division);
            alerta.findAll({
                attributes: [
                    'id_alerta',
                    'event',
                    [Sequelize.fn('TIMESTAMPDIFF', Sequelize.literal("MINUTE, eventTime, fecha_cierre")), 'minutos'],
                ],
                where: {
                    id_unidad: {
                        [Op.in]: divi
                    },
                    eventTime: {
                        [Op.between]: [req.params.fechainicio, req.params.fechafin],
                    },
                    estado: 'T'
                }
            }).then(result => {
                var min = []

                result.forEach((re) => {
                    min.push(re.dataValues.minutos)
                });

                var totales = min.reduce((a, b) => a + b, 0);

                var promedio = totales / result.length;

                let pro = ({
                    promedio: promedio.toFixed(2)
                });

                res.json({
                    OK: true,
                    TiempoRespuesta: [pro]
                })
            })
            .catch(error => {
                res.status(412).json({
                    msg: error.message
                });
            });
        }
    }

    app.resumenAlertasOperadores = (req, res) => {
        alerta.findAll({
            attributes: [
                [alerta.sequelize.fn('COUNT', alerta.sequelize.col('id_alerta')), 'namas'], // Cambié de SUM a COUNT
                'operador',
                [Sequelize.fn('COUNT', Sequelize.literal("CASE WHEN Alertas.event = 'Advertencia de Colisión Frontal' THEN '' END")), 'eventuno'],
                [Sequelize.fn('COUNT', Sequelize.literal("CASE WHEN Alertas.event = 'Accidente' THEN '' END")), 'eventdos'],
                [Sequelize.fn('COUNT', Sequelize.literal("CASE WHEN Alertas.event = 'Distancia de seguimiento' THEN '' END")), 'eventtres'],
                [Sequelize.fn('COUNT', Sequelize.literal("CASE WHEN Alertas.event = 'Frenado brusco' THEN '' END")), 'eventcuatro'],
                [Sequelize.fn('COUNT', Sequelize.literal("CASE WHEN Alertas.event = 'Giro brusco' THEN '' END")), 'eventcinco'],
                [Sequelize.fn('COUNT', Sequelize.literal("CASE WHEN Alertas.event = 'Cámara obstruida' THEN '' END")), 'eventseis'],
                [Sequelize.fn('COUNT', Sequelize.literal("CASE WHEN Alertas.event = 'Uso del móvil' THEN '' END")), 'eventsiete'],
                [Sequelize.fn('COUNT', Sequelize.literal("CASE WHEN Alertas.event = 'GPS Desconectado' THEN '' END")), 'eventocho'],
                [Sequelize.fn('COUNT', Sequelize.literal("CASE WHEN Alertas.event = 'Exceso de Velocidad' THEN '' END")), 'eventnueve'],
                [Sequelize.fn('COUNT', Sequelize.literal("CASE WHEN Alertas.event = 'Salida de carril' THEN '' END")), 'eventdiez'],
                [Sequelize.fn('COUNT', Sequelize.literal("CASE WHEN Alertas.event = 'Somnolencia' THEN '' END")), 'eventonce'],
                [Sequelize.fn('COUNT', Sequelize.literal("CASE WHEN Alertas.event = 'Parada no Autorizada' THEN '' END")), 'eventdoce'],
            ],
            where: {
                operador: {
                    [Op.ne]: ''
                },
                eventTime: {
                    [Op.between]: [req.params.fechainicio, req.params.fechafin],
                }
            },
            group: ['operador'],
            order: [
                ['operador', 'ASC']
            ],
        })
        .then(result => {
            res.json({
                OK: true,
                ResumenAlertas: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.aplicaNoAplicaAlerta = (req, res) => {
        let body = req.body;

        let asignacion = new alerta({
            estado: body.estado,
            aplica: body.aplica
        });

        alerta.update(asignacion.dataValues, {
            where: {
                id_alerta: req.params.id_alerta
            },
            individualHooks: true, 
            fields: [
                'estado',
                'aplica'
            ]
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



    async function getUnidadesDivision(uni) {
        try {
            const result = await unidad.findAll({
                where: {
                    tag: uni
                }
            });

            var idsunidad = [];

            for(let index = 0; index < result.length; index++) {
                idsunidad.push(result[index].id_unidad);
            }
            
            return idsunidad;
        }
        catch(error) {
            console.log(error.message);
            return 0;
        }
    }

    return app;
}