const moment = require('moment');
const dotenv = require('dotenv').config();
module.exports = app => {

    const axios = require('axios');
    const itine = app.database.models.Itinerarios;
    const itineDet = app.database.models.ItinerarioDetalle;

    const Sequelize = require('sequelize');
    const { literal } = require('sequelize');
    const Op = Sequelize.Op;

    app.getItinerarios = (req, res) => {
        var today = new Date();
        const hoy = moment(today).format('YYYY-MM-DD');

        itine.findAll({
            where: {
                fecha: hoy
            }
        }).then(result => {
            res.json({
                OK: true,
                Resumen: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.getItinerariosDetalle = (req, res) => {
        var today = new Date();
        const hoy = moment(today).format('YYYY-MM-DD');

        itineDet.findAll({
            where: {
                fecha: hoy
            }
        }).then(result => {
            res.json({
                OK: true,
                Resumen: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.getInnerItinerarios = async (req, res) => {
        const hoy = moment().format('YYYY-MM-DD');
        const cincodias = moment().subtract(90, 'days').format('YYYY-MM-DD');

        try {
            const resultados = await itine.findAll({
                where: {
                    fecha_creacion: {
                        [Op.between]: [cincodias, hoy]
                    }
                },
                include: [{
                    model: itineDet,
                    as: 'ItinerarioDetalles', // asegúrate que el alias coincida con la relación
                    required: true
                }]
            });

            const datosFiltrados = resultados.map(itinerario => {
                const agrupadosPorHora = new Map();

                itinerario.ItinerarioDetalles.forEach(det => {
                    const horaClave = moment(det.fecha).format('YYYY-MM-DD HH:00');

                    if(!agrupadosPorHora.has(horaClave)) {
                            casilla = 1;
                        agrupadosPorHora.set(horaClave, det);
                    } 
                    else {
                        const existente = agrupadosPorHora.get(horaClave);
                        if (moment(det.fecha).isAfter(moment(existente.fecha))) {
                            agrupadosPorHora.set(horaClave, det);
                        }
                    }
                });

                const detallesPorHora = Array.from(agrupadosPorHora.values(), (det, index) => {
                    return { ...det.toJSON(), casilla: index + 1 };
                });

                const itinerarioFinal = {
                    ...itinerario.toJSON(),
                    ItinerarioDetalles: detallesPorHora
                };

                return itinerarioFinal;
            });

            res.json({
                OK: true,
                Total: datosFiltrados.length,
                Resumen: datosFiltrados
            });

        } catch (error) {
            res.status(412).json({
                OK: false,
                msg: error.message
            });
        }
    };

    app.itinerarioP = async (req, res) => {
        try {
            const listaordenes = await axios.get('https://servidorlocal.ngrok.app/itinerariosVO');
            const ordenes = listaordenes.data.Registros || [];
    
            const listdeubicaciones = await axios.get('https://apisamsara.tlea.online/obtenerReporteUltimaLocacion');
            const ubicaciones = listdeubicaciones.data.Reporte || [];

            // const grupos = agruparManteniendoFormato(ordenes);

            var esregistro = 0;
            var esregistrodetalle = 0;
            
            var today = new Date();
            const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

            const agrupados = {};

            ordenes.forEach((item) => {
            const key = `${item.operador_nombre}|${item.clave_bitacora}|${item.unidad}`;
            
            if (!agrupados[key]) {
                agrupados[key] = {
                ...item,
                conteo: 1
                };
            } else {
                agrupados[key].conteo += 1;
            }
            });

            const resultado = Object.values(agrupados);

            // Mostrar resultado
            // console.table(resultado);


            for(const rr of resultado) {
                if(rr.unidad.startsWith('C')) {
                    rr.unidad = rr.unidad.replace('C', 'C-');
                }

                const existe = await itine.findAll({
                    where: {
                        operador: rr.operador_nombre,
                        economico: rr.unidad,
                        origen: rr.origen_nom,
                        destino: rr.destinatario_nom,
                        fecha_reporte_entrega: null
                    }
                });

                if(existe.length === 0) {
                    try {
                      
                        const responseUno = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
                            rr.origen_dom
                        )}.json?access_token=${process.env.MAPBOX_TOKEN}&limit=1`);

                        const responseDos = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
                            rr.destinatario_dom
                        )}.json?access_token=${process.env.MAPBOX_TOKEN}&limit=1`);

                        if(responseUno.data.features.length <= 0 || responseDos.data.features.length <= 0) {
                            console.warn(`No se pudo geocodificar alguna dirección para folio ${rr.ordenser_folio}`);
                            continue;
                        }

                        const lugarUno = responseUno.data.features[0];
                        const [longitudUno, latitudUno] = lugarUno.center;

                        const lugarDos = responseDos.data.features[0];
                        const [longitudDos, latitudDos] = lugarDos.center;

                        async function getRoute({lat1, lon1, lat2, lon2, apiKey}) {
                            const pointA = [lon1, lat1];
                            const pointB = [lon2, lat2];

                            const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${pointA[0]},${pointA[1]};${pointB[0]},${pointB[1]}?alternatives=false&geometries=geojson&overview=full&steps=false&access_token=${apiKey}`;

                            try {
                                const response = await axios.get(url);
                                const data = response.data;

                                if (data.routes.length > 0) {
                                    const route = data.routes[0];
                                    const distanciaKm = (route.distance / 1000).toFixed(2);
                                    const tiempoMin = Math.round(route.duration / 60);

                                    return {
                                        provider: 'MapBox',
                                        mode: 'driving',
                                        distance_km: distanciaKm || 0,
                                        duration_sec: tiempoMin || 0
                                    };
                                } 
                                else {
                                    console.log("No se encontró ruta. para orden", rr.clave_bitacora);
                                }
                            } catch (error) {
                                console.error("Error:", error.message);
                            }
                        }

                        const travel = await getRoute({
                            lat1: latitudUno,
                            lon1: longitudUno,
                            lat2: latitudDos,
                            lon2: longitudDos,
                            apiKey: process.env.MAPBOX_TOKEN
                        });

                        let nuevoRegistro = new itine({
                            folio_orden: rr.ordenser_folio,
                            unidad: rr.terminal_clave,
                            numero_empleado: rr.numero_empleado,
                            operador: rr.operador_nombre,
                            economico: rr.unidad,
                            cliente: rr.cliente_nombre,
                            clave_bitacora: rr.clave_bitacora,
                            origen: rr.origen_nom.trim(),
                            destino: rr.destinatario_nom.trim(),
                            origen_direccion: rr.origen_dom,
                            destino_direccion: rr.destinatario_dom,
                            origen_longitud: longitudUno,
                            origen_latitud: latitudUno,
                            destino_longitud: longitudDos,
                            destino_latitud: latitudDos,
                            origen_desc: rr.origen_desc.trim(),
                            destino_desc: rr.destino_desc.trim(),
                            ruta_destino_os: rr.ruta_destino_os.trim(),
                            ruta_origen_os: rr.ruta_origen_os.trim(),
                            fecha_carga: moment(rr.fecha_carga).format('YYYY-MM-DD HH:mm:ss'),
                            tiempo: Math.round(travel.duration_sec / 60),
                            km: travel.distance_km,
                            fecha: moment(rr.fecha_orden).format('YYYY-MM-DD HH:mm:ss'),
                            fecha_creacion: moment(today).format('YYYY-MM-DD'),
                            fecha_reporte_entrega: null,
                            fecha_cierre_itinerario: null
                        });

                        const resultado = await itine.create(nuevoRegistro.dataValues, {
                            fields: [
                                'folio_orden',
                                'unidad',
                                'numero_empleado',
                                'operador',
                                'economico',
                                'cliente',
                                'clave_bitacora',
                                'origen',
                                'destino',
                                'origen_direccion',
                                'destino_direccion',
                                'origen_longitud',
                                'origen_latitud',
                                'destino_longitud',
                                'destino_latitud',
                                'origen_desc',
                                'destino_desc',
                                'ruta_destino_os',
                                'ruta_origen_os',
                                'fecha_carga',
                                'tiempo',
                                'km',
                                'fecha',
                                'fecha_creacion',
                                'fecha_reporte_entrega',
                                'fecha_cierre_itinerario'
                            ]
                        });


                               for(const ubi of ubicaciones) {
                                
                                if(rr.unidad === ubi.unidad) {
                                

                                async function getRoute({lat1, lon1, lat2, lon2, apiKey}) {
                                    const pointA = [lon1, lat1];
                                    const pointB = [lon2, lat2];

                                    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${pointA[0]},${pointA[1]};${pointB[0]},${pointB[1]}?alternatives=false&geometries=geojson&overview=full&steps=false&access_token=${apiKey}`;

                                    try {
                                        const response = await axios.get(url);
                                        const data = response.data;

                                        if (data.routes.length > 0) {
                                            const route = data.routes[0];
                                            const distanciaKm = (route.distance / 1000).toFixed(2);
                                            const tiempoMin = Math.round(route.duration / 60);

                                            return {
                                                provider: 'MapBox',
                                                mode: 'driving',
                                                distance_km: distanciaKm || 0,
                                                duration_sec: tiempoMin || 0
                                            };
                                        } 
                                        else {
                                            console.log("No se encontró ruta.                                       1111");
                                        }
                                    } catch (error) {
                                        console.error("Error:", error.message);
                                    }
                                }

                       

                                const travel = await getRoute({
                                    lat1: ubi.latitud,
                                    lon1: ubi.longitud,
                                    lat2: latitudDos,
                                    lon2: longitudDos,
                                    apiKey: process.env.MAPBOX_TOKEN,
                                });

                                var kmrestantes = travel.distance_km;

                                          if(kmrestantes <= 10) {
                                    let data = new itine({
                                        fecha_cierre_itinerario: moment(today).format('YYYY-MM-DD HH:mm:ss'),
                                    });
                
                                    itine.update(data.dataValues, {
                                        where: {
                                            id_itinerarios: resultado.id_itinerarios
                                        },
                                        fields: ['fecha_cierre_itinerario']
                                    }).then(result => {
                                        console.log('Se Actualizo la fecha cierre: ', resultado.folio_orden);
                                    }).catch(err => {
                                        console.log(err);
                                    });
                                }







                                
                                async function obtenerOdometroTotal(id) {
                                try {
                                    const row = await itineDet.findAll({
                                    where: { id_itinerarios: id },
                                    order: [['fecha', 'As']],
                                    attributes: ['odometer'],
                                    raw: true,
                                    });

                                    const parseNum = (v) => {
                                    if (v === null || v === undefined) return 0;
                                    const n = Number(String(v).replace(/,/g, '').trim());
                                    return Number.isFinite(n) ? n : 0;
                                    };

                                    const odometer = parseNum(row?.odometer);
                                    const combustible = parseNum(row?.combustible);

                                    // Regresa ambos valores juntos
                                    return { odometer, combustible };
                                } catch (err) {
                                    console.error('Error obteniendo odómetro/combustible:', err);
                                    return { odometer: 0, combustible: 0 };
                                }
                                }

                                const { odometer: odoAntc, combustible: combAntc } = await obtenerOdometroTotal(existe[0].id_itinerarios);

                                await itineDet.create({
                                    id_itinerarios: resultado.id_itinerarios,
                                    economico: rr.unidad,
                                    operador: rr.operador_nombre,
                                    latitud: ubi.latitud,
                                    longitud: ubi.longitud,
                                    direccion: ubi.location,
                                    geocerca: ubi.geocerca,
                                    combustible: ubi.fuelpercent,
                                    km: kmrestantes,
                                    tiempo: Math.round(travel.duration_sec / 60),
                                    velocidad: ubi.km,
                                    estado: ubi.estadounidad,
                                    odometer: ubi.odometer,
                                    odometrototal: odoAntc + ubi.odometer,
                                    fecha: moment(rr.fechahoragps).format('YYYY-MM-DD HH:mm:ss'),
                                }, 
                                {
                                    fields: [
                                        'id_itinerarios',
                                        'economico',
                                        'operador',
                                        'latitud',
                                        'longitud',
                                        'direccion',
                                        'geocerca',
                                        'combustible',
                                        'km',
                                        'tiempo',
                                        'velocidad',
                                        'estado',
                                        'fecha'
                                    ]
                                });
                            }
                        }
                        esregistro++;
                    } 
                    catch (error) {
                        console.error('Error en registro', rr.ordenser_folio, error.message);
                    }
                } 
                else {
                    if(rr.fecha_reporte_entrega != null) {
                        let data = new itine({
                            fecha_reporte_entrega: moment(rr.fecha_reporte_entrega).format('YYYY-MM-DD HH:mm:ss'),
                        });
    
                        itine.update(data.dataValues, {
                            where: {
                                id_itinerarios: existe[0].id_itinerarios
                            },
                            fields: ['fecha_reporte_entrega']
                        }).then(result => {
                            console.log('Se Actualizo la fecha entrega: ', existe[0].folio_orden);
                        }).catch(err => {
                            console.log(err);
                        });
                    }
                    else {
                        for(const ubi of ubicaciones) {
                            if(existe[0].economico === ubi.unidad) {
                                
                                async function getRoute({lat1, lon1, lat2, lon2, apiKey}) {
                                    const pointA = [lon1, lat1];
                                    const pointB = [lon2, lat2];

                                    const url = `https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${pointA[0]},${pointA[1]};${pointB[0]},${pointB[1]}?alternatives=false&geometries=geojson&overview=full&steps=false&access_token=${apiKey}`;

                                    try {
                                        const response = await axios.get(url);
                                        const data = response.data;

                                        if (data.routes.length > 0) {
                                            const route = data.routes[0];
                                            const distanciaKm = (route.distance / 1000).toFixed(2);
                                            const tiempoMin = Math.round(route.duration / 60);

                                 
                                            return {
                                                provider: 'MapBox',
                                                mode: 'driving',
                                                distance_km: distanciaKm || 0,
                                                duration_sec: tiempoMin || 0
                                            };
                                        } 
                                        else {
                                            console.log("No se encontró ruta.                                       22222");
                                        }
                                    } catch (error) {
                                        console.error("Error:", error.message);
                                    }
                                }

                                const travel = await getRoute({
                                    lat1: ubi.latitud,
                                    lon1: ubi.longitud,
                                    lat2: Number(existe[0].destino_latitud),
                                    lon2: Number(existe[0].destino_longitud),
                                    apiKey: process.env.MAPBOX_TOKEN
                                });

                                var kmrestantes = travel.distance_km;

                                if(kmrestantes <= 10) {
                                    let data = new itine({
                                        fecha_cierre_itinerario: moment(today).format('YYYY-MM-DD HH:mm:ss'),
                                    });
                
                                    itine.update(data.dataValues, {
                                        where: {
                                            id_itinerarios: existe[0].id_itinerarios
                                        },
                                        fields: ['fecha_cierre_itinerario']
                                    }).then(result => {
                                        console.log('Se Actualizo la fecha cierre: ', existe[0].folio_orden);
                                    }).catch(err => {
                                        console.log(err);
                                    });
                                }

                                async function obtenerOdometroYCombustible(id) {
                                try {
                                    const row = await itineDet.findOne({
                                    where: { id_itinerarios: id },
                                    order: [['fecha', 'DESC']],
                                    attributes: ['odometer', 'combustible'],
                                    raw: true,
                                    });

                                    const parseNum = (v) => {
                                    if (v === null || v === undefined) return 0;
                                    const n = Number(String(v).replace(/,/g, '').trim());
                                    return Number.isFinite(n) ? n : 0;
                                    };

                                    const odometer = parseNum(row?.odometer);
                                    const combustible = parseNum(row?.combustible);

                                    // Regresa ambos valores juntos
                                    return { odometer, combustible };
                                } catch (err) {
                                    console.error('Error obteniendo odómetro/combustible:', err);
                                    return { odometer: 0, combustible: 0 };
                                }
                                }

                                   async function obtenerOdometroTotal(id) {
                                    try {
                                        const row = await itineDet.findAll({
                                            where: { id_itinerarios: id },
                                            order: [['fecha', 'ASC']],
                                            limit: 1,
                                            raw: true
                                        });
            
                                        const parseNum = (v) => {
                                        if (v === null || v === undefined) return 0;
                                            const n = Number(String(v).replace(/,/g, '').trim());
                                            return Number.isFinite(n) ? n : 0;
                                        };

                                        const odometer = parseNum(row[0]?.odometer);

                                        return { odometer: odometer.toFixed() };
                                    } 
                                    catch (err) {
                                        console.error('Error obteniendo odómetro/combustible:', err);
                                        return { odometer: 0, combustible: 0 };
                                    }
                                }

                                const { odometer: odoAnt, combustible: combAnt } = await obtenerOdometroYCombustible(existe[0].id_itinerarios);
                                const { odometer: odoAntc } = await obtenerOdometroTotal(existe[0].id_itinerarios);

                                
                                
                                var restarcombustible = Number(combAnt) - Number(ubi.fuelpercent);

                                await itineDet.create({
                                    id_itinerarios: existe[0].id_itinerarios,
                                    economico: existe[0].economico,
                                    operador: existe[0].operador,
                                    latitud: ubi.latitud,
                                    longitud: ubi.longitud,
                                    direccion: ubi.location,
                                    geocerca: ubi.geocerca,
                                    combustible: ubi.fuelpercent,
                                    km: kmrestantes,
                                    tiempo: Math.round(travel.duration_sec / 60),
                                    velocidad: ubi.km,
                                    estado: restarcombustible < -2 ? 'En Movimiento' : restarcombustible > -1 ? 'Detenido' : 'Sin Cambios',
                                    odometer: ubi.odometer,
                                    odometrototal: Number(odoAntc) === 0 ? 0 : Number(ubi.odometer.toFixed()) - Number(odoAntc),
                                    fecha: moment(existe[0].fechahoragps).format('YYYY-MM-DD HH:mm:ss'),
                                }, {
                                    fields: [
                                        'id_itinerarios',
                                        'economico',
                                        'operador',
                                        'latitud',
                                        'longitud',
                                        'direccion',
                                        'geocerca',
                                        'combustible',
                                        'km',
                                        'tiempo',
                                        'velocidad',
                                        'estado',
                                        'odometer',
                                        'odometrototal',
                                        'fecha'
                                    ]
                                });
                            }
                        }
                    }
                }

                await sleep(1000);
            }

            res.json({ 
                OK: true,
                ordenesl: ordenes.length,
                gruposl: resultado.length,
                ordenes: ordenes,
                grupos: resultado
            });
        } 
        catch (err) {
            console.error(err);
            res.status(500).json({ OK: false, error: 'Error general del servidor' });
        }
    }

    app.CalculoDeRuta = async (req, res) => {
        try {
            async function googleTravelTime({ lat1, lon1, lat2, lon2, mode = "driving", apiKey = process.env.GOOGLE_MAPS_KEY, useTraffic = true }) {
                const params = new URLSearchParams({
                    origin: `${lat1},${lon1}`,
                    destination: `${lat2},${lon2}`,
                    mode
                });

                if (mode === "driving" && useTraffic) {
                    params.set("departure_time", "now"); // ocupa de pago
                }

                const url = `https://maps.googleapis.com/maps/api/directions/json?${params.toString()}&key=${apiKey}`;
                const { data } = await axios.get(url, { timeout: 10000 });

                if (data.status !== "OK" || !data.routes?.length) {
                    throw new Error(`Google Directions error: ${data.status}`);
                }

                const leg = data.routes[0].legs[0];
                const duration = leg.duration_in_traffic?.value ?? leg.duration.value;

                return {
                    provider: "Google",
                    mode,
                    distance_km: leg.distance.value / 1000,
                    duration_sec: duration
                };
            }

            const resultado = await googleTravelTime({
                lat1: 25.957217,
                lon1: -100.268769,
                lat2: 20.684290111315942,
                lon2: -101.33925059176356,
                mode: "driving",
                apiKey: process.env.GOOGLE_MAPS_KEY,
                useTraffic: true
            });


            res.json({
                OK: true,
                Result: resultado
            });

        } 
        catch (error) {
            res.status(412).json({
                OK: false,
                msg: error.message
            });
        }
    };















    return app;
}