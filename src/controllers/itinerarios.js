const moment = require('moment');

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

    // app.getInnerItinerarios = (req, res) => {
    //     const hoy = moment().format('YYYY-MM-DD');
    //     const cincodias = moment().subtract(90, 'days').format('YYYY-MM-DD');

    //     itine.findAll({
    //         where: {
    //             fecha_creacion: {
    //                 [Op.between]: [cincodias, hoy]
    //             }
    //         },
    //         include: [{
    //             model: itineDet,
    //             required: true,
    //         }]
    //     }).then(result => {
    //         res.json({
    //             OK: true,
    //             Resumen: result
    //         })
    //     })
    //     .catch(error => {
    //         res.status(412).json({
    //             msg: error.message
    //         });
    //     });   
    // }

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

            // Agrupar por hora y seleccionar el más reciente
            itinerario.ItinerarioDetalles.forEach(det => {
                const horaClave = moment(det.fecha).format('YYYY-MM-DD HH:00');

                if (!agrupadosPorHora.has(horaClave)) {
                    agrupadosPorHora.set(horaClave, det);
                } else {
                    const existente = agrupadosPorHora.get(horaClave);
                    if (moment(det.fecha).isAfter(moment(existente.fecha))) {
                        agrupadosPorHora.set(horaClave, det);
                    }
                }
            });

            const detallesPorHora = Array.from(agrupadosPorHora.values());

            // Clonar el itinerario y reemplazar detalles
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
            var today = new Date();
            const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

            for(const rr of ordenes) {
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
                        const responseUno = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                            params: {
                                address: rr.origen_dom,
                                key: process.env.GOOGLE_MAPS_KEY
                            }
                        });

                        const responseDos = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                            params: {
                                address: rr.destinatario_dom,
                                key: process.env.GOOGLE_MAPS_KEY
                            }
                        });

                        if(responseUno.data.status !== 'OK' || responseDos.data.status !== 'OK') {
                            console.warn(`No se pudo geocodificar alguna dirección para folio ${rr.ordenser_folio}`);
                            continue; // 👈 ignoramos este registro y seguimos
                        }

                        const locationUno = responseUno.data.results[0].geometry.location;
                        const locationDos = responseDos.data.results[0].geometry.location;

                        async function googleTravelTime({lat1, lon1, lat2, lon2, mode = 'driving',apiKey = process.env.GOOGLE_MAPS_KEY, useTraffic = true}) {
                            const params = new URLSearchParams({
                            origin: `${lat1},${lon1}`,
                            destination: `${lat2},${lon2}`,
                            mode
                            });
                    
                            if (mode === 'driving' && useTraffic) {
                            params.set('departure_time', 'now');
                            }
                    
                            const url = `https://maps.googleapis.com/maps/api/directions/json?${params.toString()}&key=${apiKey}`;
                            const { data } = await axios.get(url, { timeout: 10000 });
                    
                            if(data.status !== 'OK' || !data.routes?.length) {
                            throw new Error(`Google Directions error: ${data.status}`);
                            }
                    
                            const leg = data.routes[0].legs[0];
                            const duration = leg.duration_in_traffic?.value ?? leg.duration.value;
                    
                            return {
                            provider: 'Google',
                            mode,
                            distance_km: (leg.distance.value || 0) / 1000,
                            duration_sec: duration || 0
                            };
                        }

                        const travel = await googleTravelTime({
                            lat1: locationUno.lat,
                            lon1: locationUno.lng,
                            lat2: locationDos.lat,
                            lon2: locationDos.lng,
                            mode: 'driving',
                            apiKey: process.env.GOOGLE_MAPS_KEY,
                            useTraffic: true
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
                            origen_longitud: locationUno.lng,
                            origen_latitud: locationUno.lat,
                            destino_longitud: locationDos.lng,
                            destino_latitud: locationDos.lat,
                            origen_desc: rr.origen_desc.trim(),
                            destino_desc: rr.destino_desc.trim(),
                            ruta_destino_os: rr.ruta_destino_os.trim(),
                            ruta_origen_os: rr.ruta_origen_os.trim(),
                            fecha_carga: moment(rr.fecha_carga).format('YYYY-MM-DD HH:mm:ss'),
                            tiempo: Math.round(travel.duration_sec / 60),
                            km: travel.distance_km,
                            fecha: moment(rr.fecha_orden).format('YYYY-MM-DD HH:mm:ss'),
                            fecha_creacion: moment(today).format('YYYY-MM-DD'),
                            fecha_reporte_entrega: null
                        });

                        await itine.create(nuevoRegistro.dataValues, {
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
                                'fecha_reporte_entrega,'
                            ]
                        });
                    } 
                    catch (error) {
                        console.error('Error en registro', rr.ordenser_folio, error.message);
                    }
                } 
                else {
                    console.log('Ya existe el folio:', existe[0].folio_orden);
  
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

                }

                // await sleep(500);
            }

            res.json({ OK: true });
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