module.exports = app => {

    const axios = require('axios');
    const itine = app.database.models.Itinerarios;



    app.getItinerarios = async (req, res) => {
        itine.findAll({
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

    app.itinerarioP = async (req, res) => {
        const listaordenes = await axios.get('https://servidorlocal.ngrok.app/itinerariosVO');
        const ordenes = listaordenes.data.Registros || [];

        ordenes.forEach(async rr => {
            const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
                            
            var existe = await itine.findAll({
                where: {
                    operador: rr.operador_nombre,
                    economico: rr.unidad,
                    origen: rr.origen_nom,
                    destino: rr.destinatario_nom
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

                    if(responseUno.data.status !== 'OK') {
                        return res.status(400).json({ error: 'No se pudo geocodificar la dirección' });
                    }

                    if(responseDos.data.status !== 'OK') {
                        return res.status(400).json({ error: 'No se pudo geocodificar la dirección' });
                    }

                    const locationUno = responseUno.data.results[0].geometry.location;
                    const locationDos = responseDos.data.results[0].geometry.location;

                    let nuevoRegistro = new itine({
                        folio_orden: rr.ordenser_folio, 
                        unidad: rr.terminal_clave, 
                        numero_empleado: rr.numero_empleado, 
                        operador: rr.operador_nombre, 
                        economico: rr.unidad, 
                        origen: rr.origen_nom, 
                        destino: rr.destinatario_nom, 
                        origen_direccion: rr.origen_dom, 
                        destino_direccion: rr.destinatario_dom, 
                        origen_longitud: locationUno.lng, 
                        origen_latitud: locationUno.lat, 
                        destino_longitud: locationDos.lng, 
                        destino_latitud: locationDos.lat, 
                        fecha: moment(rr.fecha_orden).format('YYYY-MM-DD')
                    });

                    itine.create(nuevoRegistro.dataValues, {
                        fields: [
                            'folio_orden', 
                            'unidad', 
                            'numero_empleado', 
                            'operador', 
                            'economico',
                            'origen',
                            'destino',
                            'origen_direccion',
                            'destino_direccion',
                            'origen_longitud',
                            'origen_latitud',
                            'destino_longitud',
                            'destino_latitud', 
                            'fecha'
                        ]
                    })
                    .then(result => {
                        // console.log('ok');
                    })
                    .catch(error => {
                        console.log(error);
                    });

                } catch (error) {
                    console.error(error);
                }
            } 
            else {
                console.log('Ya existe el folio:', existe[0].folio_orden);
            }
                            
            await sleep(3000);
        });
        
        res.json({
            OK: true
        });
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