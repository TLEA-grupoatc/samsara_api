require('colors');
const express = require('express');
const cors = require('cors')
const app = express();
const consign = require('consign');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const moment = require('moment');
const http = require('http').createServer(app);
const cron = require('node-cron');
const ngrok = require("@ngrok/ngrok");
const dotenv = require('dotenv').config();
const socketIO = require('socket.io')(http, {
  cors: {
    origin: ["http://localhost:4200", "https://samsaraxtlea.tlea.online", "https://suite.tlea.online", "https://apisamsara.tlea.online"],
    credentials: true,
    methods: ["GET", "POST"]
  }
});

app.use(express.static('./public'));
app.set('port', 3010);
app.use(express.urlencoded({extended: false}));         
app.use('/documentos', express.static('documentos'));

// #region PD carpeta statica
app.use('/uploads', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', ["http://localhost:4200", "https://samsaraxtlea.tlea.online", "https://suite.tlea.online", "https://apisamsara.tlea.online"]);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
}, express.static('uploads'));
//#endregion PD carpeta statica

app.use(express.json({ limit: "100mb" }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.io = socketIO;
app.use(cors());

consign({cwd: 'src'}).include('libs/config.js').then('./database.js').then('middlewares').then('controllers').then('routes').then('sockets').into(app);

const alerta = app.database.models.Alertas;
const geogaso = app.database.models.GeoGaso;
const ubiporeco = app.database.models.UBICACIONESPORECONOMICO;
const itine = app.database.models.Itinerarios;
const itineDet = app.database.models.ItinerarioDetalle;

  const axios = require('axios');
const Samsara = require("@api/samsara-dev-rel");
const fs = require('fs');
Samsara.auth(process.env.KEYSAM);

cron.schedule('* * * * *', () => {   
  app.obtenerSnapshot({}, {
    json: (data) => console.log(data),
    status: (statusCode) => ({
      json: (data) => console.log(statusCode, data)
    })
  }); 
});

cron.schedule('0 * * * *', () => {   
  app.itinerarioP({}, {
    json: (data) => console.log(data),
    status: (statusCode) => ({
      json: (data) => console.log(statusCode, data)
    })
  }); 
});


app.post('/webhookAPITLEA', bodyParser.raw({type: 'application/json'}), async (req, res) => {
  const payload = req.body;

  const filePath = './webhookAPITLEA_payload.txt';

  fs.appendFile(filePath, JSON.stringify(payload, null, 2) + '\n', (err) => {
    if(err) {
      console.error('Error writing payload to file:', err);
      // res.status(500).send('Error saving payload');
    } 
    else {
      // res.status(200).send('Payload saved');
    }
  });

  const timestamp = payload.eventMs;
  const date = new Date(timestamp);
  const formato = moment(date).format('YYYY-MM-DD HH:mm:ss');
  var validacionEvento = '';
  var eventoCase;
  
  var eventoformat1 = payload.event.details.replace('Se detectó un evento por ', "");
  var eventoformat2 = eventoformat1.split(' en el vehículo')[0];
  var eventoformat2 = eventoformat2.split(' event was')[0];

  var operador = '';
  var numero_operador = null;

  try {
    const { data } = await Samsara.getDriverVehicleAssignments({ filterBy: 'vehicles', vehicleIds: payload.event.device.id });
    if (data && data.data && data.data.length > 0 && data.data[0].driver && data.data[0].driver.name) {
      operador = data.data[0].driver.name;
    }
  } catch (err) {
    console.error(err);
  }

  if(payload.event.alertConditionId == 'DeviceLocationStoppedInGeofence') {
    validacionEvento = 'Parada no Autorizada';
  }
  
  if(payload.event.alertConditionId == 'PanicButtonPressed') {
    validacionEvento = 'Botón de pánico';
  }

  if(payload.event.alertConditionId == 'DeviceSpeedAbove') {
    validacionEvento = 'Exceso de Velocidad';
  }

  if(validacionEvento != '') {
    eventoformat2 = validacionEvento.trim();
  }
  else {
    eventoformat2.trim()
  }

  switch(eventoformat2) {
    case 'Alto omitido': eventoCase = 'Alto omitido'; break;
    case 'Rolling Stop': eventoCase = 'Alto omitido'; break;

    case 'Evento severo': eventoCase = 'Somnolencia'; break;

    case 'Botón de pánico': eventoCase = 'Botón de pánico'; break;

    case 'Colisión': eventoCase = 'Accidente'; break;
    case 'Crash': eventoCase = 'Accidente'; break;

    case 'Conducción distraída': eventoCase = 'Conducción distraída'; break;
    case 'Distracted Driving': eventoCase = 'Conducción distraída'; break;

    case 'Cuasi-colisión': eventoCase = 'Advertencia de Colisión Frontal'; break;
    case 'Forward Collision Warning': eventoCase = 'Advertencia de Colisión Frontal'; break;

    case 'Cámara obstruida': eventoCase = 'Cámara obstruida'; break;
    case 'Obstructed Camera': eventoCase = 'Cámara obstruida'; break;

    case 'Distancia de seguimiento': eventoCase = 'Distancia de seguimiento'; break;
    case 'Following Distance': eventoCase = 'Distancia de seguimiento'; break;

    case 'Frenado brusco': eventoCase = 'Frenado brusco'; break;
    case 'Harsh Brake': eventoCase = 'Frenado brusco'; break;

    case 'Giro brusco': eventoCase = 'Giro brusco'; break;
    case 'Harsh Turn': eventoCase = 'Giro brusco'; break;

    case 'Parada no Autorizada': eventoCase = 'Parada no Autorizada'; break;
    case 'Exceso de Velocidad': eventoCase = 'Exceso de Velocidad'; break;
    
    case 'Sin cinturón de seguridad': eventoCase = 'Sin cinturón de seguridad'; break;
    case 'No Seat Belt': eventoCase = 'Sin cinturón de seguridad'; break;

    case 'Uso del móvil': eventoCase = 'Uso del móvil'; break;
    case 'Mobile Usage': eventoCase = 'Uso del móvil'; break;

    default: 'Otros Eventos'; break;
  }

  let nuevaAlerta = new alerta({
    eventId: payload.eventId,
    eventType: payload.eventType,
    alertConditionId: payload.event.alertConditionDescription,
    webhookId: payload.webhookId,
    event: eventoCase == null ? '' : eventoCase,
    eventDescription: payload.event.details,
    eventTime: formato,
    alertEventURL: payload.event.alertEventUrl,
    id_unidad: payload.event.device.id,
    unidad: payload.event.device.name,
    numero_empleado: numero_operador,
    operador: operador,
    fecha_cierre: null,
    primer_interaccion: '',
    aplica: eventoCase === 'Parada no Autorizada' ? 1 : 0
  });

  await alerta.create(nuevaAlerta.dataValues, {
    fields: [
      'eventId', 
      'eventType',
      'alertConditionId',
      'webhookId',
      'event', 
      'eventDescription', 
      'eventTime', 
      'alertEventURL', 
      'id_unidad', 
      'unidad',
      'numero_empleado', 
      'operador',
      'fecha_cierre',
      'primer_interaccion',
      'aplica'
    ]
  }).then(result => {}).catch(error => { console.log(error.message); });

  res.status(200).send('Ok');
});










// app.post('/webhookAPITLEA', bodyParser.raw({type: 'application/json'}), async (req, res) => {
//   const payload = req.body;
//   const filePath = './webhookAPITLEA_payload.txt';

//   fs.appendFile(filePath, JSON.stringify(payload, null, 2) + '\n', (err) => {
//     if (err) {
//       console.error('Error writing payload to file:', err);
//       res.status(500).send('Error saving payload');
//     } else {
//       res.status(200).send('Payload saved');
//     }
//   });
// });

app.post('/webhookGeoGaso', async (req, res) => {
  const payload = req.body;
  
  var today = new Date();
  const hoy = moment(today).format('YYYY-MM-DD');
  const timestamp2 = payload['event']['startMs'];
  const date2 = new Date(timestamp2);
  const formato2 = moment(date2).format('YYYY-MM-DD HH:mm:ss');
  
  var id = payload['event']['device']['id'];
  
  var texto = payload['event']['summary'];
  
  const regex = /ha estado dentro de (.*?) por más de 10 minutos/;
  const match = texto.match(regex);

  if(match) {
    gaso = match[1];
  } 
  else {
    console.log('No se encontró el texto deseado.');
  }
  
  var encontro = await geogaso.findAll({
    where: {
      tracto: payload['event']['device']['name'],
      geo: gaso,
      fecha_entrada: formato2
    }
  });

  if(encontro.length <= 0) {
    const procentaje =  await Samsara.getVehicleStatsHistory({
      startTime: formato2.split(' ')[0] + 'T' + formato2.split(' ')[1] + 'Z',
      endTime: hoy + 'T23:59:59Z',
      vehicleIds: id,
      types: 'fuelPercents'
    });

    var porce = procentaje['data']['data'][0]['fuelPercents'][procentaje['data']['data'][0]['fuelPercents'].length -1]['value']

    let nuevaAlerta = new geogaso({
      tracto: payload['event']['device']['name'],
      geo: gaso,
      dia: hoy,
      fecha_entrada: formato2,
      tanque: porce,
      fecha_salida: null,
      tanque_salida: null,
      carga: null
    });

    await geogaso.create(nuevaAlerta.dataValues, {
      fields: [
        'tracto', 
        'geo', 
        'dia', 
        'fecha_entrada', 
        'tanque',
        'fecha_salida', 
        'tanque_salida',
        'carga'
      ]
    }).then(result => {}).catch(error => { console.log(error.message); });
  }
});

app.post('/webhookSalidaGeoGaso', async (req, res) => {
  const payload = req.body;
  var today = new Date();
  const hoy = moment(today).format('YYYY-MM-DD');

  var id = payload.data.conditions[0]['details']['geofenceExit']['vehicle']['id'];

  const date = payload.eventTime;
  const formato = moment(date).format('YYYY-MM-DD HH:mm:ss');

  var encontro = await geogaso.findAll({
    where: {
      tracto: payload.data.conditions[0]['details']['geofenceExit']['vehicle']['name'],
      geo: payload.data.conditions[0]['details']['geofenceExit']['address']['name'],
      dia: hoy
    }
  });

  if(encontro.length > 0) {
    var idgaso;
    var tan;
    encontro.forEach((re) => {
      idgaso = re.id_geo_gaso;
      tan = re.tanque;
    });
    
    const procentaje =  await Samsara.getVehicleStatsHistory({
      startTime: formato.split(' ')[0] + 'T' + formato.split(' ')[1] + 'Z',
      endTime: hoy + 'T23:59:59Z',
      vehicleIds: id,
      types: 'fuelPercents'
    });
  
    var porce = procentaje['data']['data'][0]['fuelPercents'][procentaje['data']['data'][0]['fuelPercents'].length -1]['value'];
    // var taqueentrada = encontro.dataValues.tanque;
  
    let nuevaAlerta = new geogaso({
      fecha_salida: formato,
      tanque_salida: porce,
      carga: porce > tan ? 1 : 0
      // carga: 0
    });
  
    await geogaso.update(nuevaAlerta.dataValues, {
      where: {
        id_geo_gaso: idgaso
      },
      fields: [
        'fecha_salida', 
        'tanque_salida',
        'carga'
      ]
    }).then(result => {}).catch(error => { console.log(error.message); });
  }
  else {
    console.log('no encontrado');
  }
});

app.post('/ubicacionporeconomico', bodyParser.raw({type: 'application/json'}), async (req, res) => {
  const payload = req.body;

  if(payload.data?.conditions[0].description === 'Asset starts moving') {
    var ubi = await ubicacion(payload.data.conditions[0]['details']['deviceMovement']['vehicle']['id']);
    let fechahora = moment(payload.data.happenedAtTime).format('YYYY-MM-DD HH:mm:ss');
    let nuevaAlerta = new ubiporeco({
      id_samsara: payload.data.conditions[0]['details']['deviceMovement']['vehicle']['id'],
      economico: payload.data.conditions[0]['details']['deviceMovement']['vehicle']['name'],
      motor: 1,
      geocerca: null,
      ubicacion: null,
      ubicacion_snapshot: ubi,
      hora_entrada: fechahora,
      movimiento: 'Comienza movimiento',
      hora_salida: null,
      evento: payload.data.conditions[0].description
    });

    await ubiporeco.create(nuevaAlerta.dataValues, {
      fields: [
        'id_samsara', 
        'economico', 
        'motor', 
        'geocerca', 
        'ubicacion', 
        'ubicacion_snapshot', 
        'hora_entrada', 
        'movimiento', 
        'hora_salida', 
        'evento'
      ]
    }).then(result => {}).catch(error => { console.log(error.message); });
  }
  else if(payload.data?.conditions[0].description === 'Asset stops moving') {
    var ubi = await ubicacion(payload.data.conditions[0]['details']['deviceMovementStopped']['vehicle']['id']);
    let fechahora = moment(payload.data.happenedAtTime).format('YYYY-MM-DD HH:mm:ss');
    let nuevaAlerta = new ubiporeco({
      id_samsara: payload.data.conditions[0]['details']['deviceMovementStopped']['vehicle']['id'],
      economico: payload.data.conditions[0]['details']['deviceMovementStopped']['vehicle']['name'],
      motor: 1,
      geocerca: null,
      ubicacion: null,
      ubicacion_snapshot: ubi,
      hora_entrada: fechahora,
      movimiento: 'Deteniene movimiento',
      hora_salida: null,
      evento: payload.data.conditions[0].description
    });

    await ubiporeco.create(nuevaAlerta.dataValues, {
      fields: [
        'id_samsara', 
        'economico', 
        'motor', 
        'geocerca', 
        'ubicacion', 
        'ubicacion_snapshot', 
        'hora_entrada', 
        'movimiento', 
        'hora_salida', 
        'evento'
      ]
    }).then(result => {}).catch(error => { console.log(error.message); });
  }
  else if(payload.data?.conditions[0].description === 'Asset Engine Off') {
    var ubi = await ubicacion(payload.data.conditions[0]['details']['engineOff']['vehicle']['id']);
    let fechahora = moment(payload.data.happenedAtTime).format('YYYY-MM-DD HH:mm:ss');
    let nuevaAlerta = new ubiporeco({
      id_samsara: payload.data.conditions[0]['details']['engineOff']['vehicle']['id'],
      economico: payload.data.conditions[0]['details']['engineOff']['vehicle']['name'],
      motor: 0,
      geocerca: null,
      ubicacion: null,
      ubicacion_snapshot: ubi,
      hora_entrada: fechahora,
      movimiento: 'Apago Motor',
      hora_salida: null,
      evento: payload.data.conditions[0].description
    });

    await ubiporeco.create(nuevaAlerta.dataValues, {
      fields: [
        'id_samsara', 
        'economico', 
        'motor', 
        'geocerca', 
        'ubicacion', 
        'ubicacion_snapshot', 
        'hora_entrada', 
        'movimiento', 
        'hora_salida', 
        'evento'
      ]
    }).then(result => {}).catch(error => { console.log(error.message); });
  }
  else if(payload.data?.conditions[0].description === 'Asset Engine On') {
    var ubi = await ubicacion(payload.data.conditions[0]['details']['engineOn']['vehicle']['id']);
    let fechahora = moment(payload.data.happenedAtTime).format('YYYY-MM-DD HH:mm:ss');
    let nuevaAlerta = new ubiporeco({
      id_samsara: payload.data.conditions[0]['details']['engineOn']['vehicle']['id'],
      economico: payload.data.conditions[0]['details']['engineOn']['vehicle']['name'],
      motor: 1,
      geocerca: null,
      ubicacion: null,
      ubicacion_snapshot: ubi,
      hora_entrada: fechahora,
      movimiento: 'Encendio Motor',
      hora_salida: null,
      evento: payload.data.conditions[0].description
    });

    await ubiporeco.create(nuevaAlerta.dataValues, {
      fields: [
        'id_samsara', 
        'economico', 
        'motor', 
        'geocerca', 
        'ubicacion', 
        'ubicacion_snapshot', 
        'hora_entrada', 
        'movimiento', 
        'hora_salida', 
        'evento'
      ]
    }).then(result => {}).catch(error => { console.log(error.message); });
  }
  else if(payload.data?.conditions[0].description === 'Geofence Entry') {
    var ubi = await ultimaubi(payload.data.conditions[0]['details']['geofenceEntry']['vehicle']['id']);
    let fechahora = moment(payload.data.happenedAtTime).format('YYYY-MM-DD HH:mm:ss');
    let fechaInsert = moment(payload.data.happenedAtTime).format('YYYY-MM-DD');

    let nuevaAlerta = new ubiporeco({
      id_samsara: payload.data.conditions[0]['details']['geofenceEntry']['vehicle']['id'],
      economico: payload.data.conditions[0]['details']['geofenceEntry']['vehicle']['name'],
      motor: 1,
      geocerca: payload.data.conditions[0]['details']['geofenceEntry']['address']['name'],
      ubicacion: payload.data.conditions[0]['details']['geofenceEntry']['address']['formattedAddress'],
      ubicacion_snapshot: ubi,
      hora_entrada: fechahora,
      movimiento: 'Entro a Geocerca',
      hora_salida: null,
      evento: payload.data.conditions[0].description
    });

    await ubiporeco.create(nuevaAlerta.dataValues, {
      fields: [
        'id_samsara', 
        'economico', 
        'motor', 
        'geocerca', 
        'ubicacion', 
        'ubicacion_snapshot', 
        'hora_entrada', 
        'movimiento', 
        'hora_salida', 
        'evento'
      ]
    }).then(result => {}).catch(error => { console.log(error.message); });

    
    try {
      const cond = payload?.data?.conditions?.[0];
      const entry = cond?.details?.geofenceEntry;
      const addr  = entry?.address;
      const veh   = entry?.vehicle;

      if(!addr?.name || !addr?.formattedAddress || !veh?.name) {
        console.warn('Payload incompleto para geofenceEntry.');
        return;
      }

      const name = String(addr.name).trim();
      const prefix = name.split(/\s*-\s*/)[0].toUpperCase();

      // // Solo continuar si es PA o TRAMO
      // if (!(prefix === 'PA' || prefix === 'TRAMO')) {
      //   return;
      // }

      const row = await itine.findOne({
        where: {
          economico: veh.name,
          fecha: fechaInsert
        }
      });

      if(!row) {
        console.warn(`No hay itinerario para ${veh.name} en ${fechaInsert}`);
        return;
      }

      // const geocodeResp = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      //   params: {
      //     address: ubi,
      //     key: process.env.GOOGLE_MAPS_KEY
      //   },
      //   timeout: 10000
      // });

      // if (geocodeResp.data.status !== 'OK' || !geocodeResp.data.results?.length) {
      //   console.warn(`No se pudo geocodificar la dirección: ${ubi}`);
      //   return;
      // }

      // const { lat, lng } = geocodeResp.data.results[0].geometry.location;

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
        lat1: ubi.latitud,
        lon1: ubi.longitud,
        lat2: Number(row.origen_latitud),
        lon2: Number(row.origen_longitud),
        mode: 'driving',
        apiKey: process.env.GOOGLE_MAPS_KEY,
        useTraffic: true
      });

      await itineDet.create({
        id_itinerarios: row.id_itinerarios,
        economico: payload.data.conditions[0]['details']['deviceMovement']['vehicle']['name'],
        operador: row.operador,
        latitud: ubi.latitud,
        longitud: ubi.longitud,
        direccion: ubi.location,
        geocerca: name,
        combustible: ubi.fuelpercent,
        km: travel.distance_km,
        tiempo: Math.round(travel.duration_sec / 60),
        fecha: fechaInsert
      }, {
        fields: [
          'id_itinerarios',
          'operador',
          'latitud',
          'longitud',
          'direccion',
          'geocerca',
          'combustible',
          'km',
          'tiempo',
          'fecha'
        ]
      });
    } 
    catch (err) {
      console.error('Error procesando geofenceEntry:', err);
    }
  
  }
  else if(payload.data?.conditions[0].description === 'Geofence Exit') { 
    var ubi = await ubicacion(payload.data.conditions[0]['details']['geofenceExit']['vehicle']['id']);
    let fechahora = moment(payload.data.happenedAtTime).format('YYYY-MM-DD HH:mm:ss');
    let nuevaAlerta = new ubiporeco({
      id_samsara: payload.data.conditions[0]['details']['geofenceExit']['vehicle']['id'],
      economico: payload.data.conditions[0]['details']['geofenceExit']['vehicle']['name'],
      motor: 1,
      geocerca: payload.data.conditions[0]['details']['geofenceExit']['address']['name'],
      ubicacion: payload.data.conditions[0]['details']['geofenceExit']['address']['formattedAddress'],
      ubicacion_snapshot: ubi,
      hora_entrada: fechahora,
      movimiento: 'Salio de Geocerca',
      hora_salida: null,
      evento: payload.data.conditions[0].description
    });

    await ubiporeco.create(nuevaAlerta.dataValues, {
      fields: [
        'id_samsara', 
        'economico', 
        'motor', 
        'geocerca', 
        'ubicacion', 
        'ubicacion_snapshot', 
        'hora_entrada', 
        'movimiento', 
        'hora_salida', 
        'evento'
      ]
    }).then(result => {}).catch(error => { console.log(error.message); });
  }
  else {
    console.log('Evento no reconocido:', payload.data?.conditions[0].description);
  }
});

async function ubicacion(idsam) {
  try {
    const fecha = moment(new Date()).format('YYYY-MM-DDTHH:mm:ss');
    const fechahora = fecha + 'Z';

    const result = await Samsara.getVehicleStats({
      time: fechahora,
      vehicleIds: idsam,
      types: 'gps'
    });

    if (result && result.data && result.data.data.length > 0) {
      const gpsData = result.data.data[0].gps;
      return gpsData.reverseGeo.formattedLocation;
    } else {
      console.error('No GPS data found for the given vehicle ID.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching vehicle stats:', error.message);
    return null;
  }
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

http.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`.random);
});

// http.listen(app.get('port'), async () => {
//   try {
//     await ngrok.authtoken(process.env.TOKENNGROK);
//     const url = await ngrok.forward(app.get('port'));

//     console.log(`Server on port ${app.get('port')}`.random);
//     console.log(url.url());
//   }
//   catch (error) {
//     console.error('Error al iniciar el túnel Ngrok:', error);
//   }
// });




























// app.post('/webhookComboy', bodyParser.raw({type: 'application/json'}), async (req, res) => {
//   const payload = req.body;
// });








// app.post('/webhookPuertaEnlace', bodyParser.raw({type: 'application/json'}), async (req, res) => {
//   const payload = req.body;

//   const date = payload.eventTime;
//   const formato = moment(date).format('YYYY-MM-DD HH:mm:ss'); 

//   let nuevaAlerta = new geogaso({
//     eventId: payload.eventId,
//     eventType: payload.eventType,
//     alertConditionId: 'gatewayUnplugged',
//     webhookId: payload.webhookId,
//     event: 'GPS Desconectado',
//     eventDescription: 'Se ah Desconectado la Puerta de enlace',
//     eventTime: formato,
//     alertEventURL: payload.data.incidentUrl,
//     id_unidad: payload.data.conditions[0]['details']['gatewayUnplugged']['vehicle']['id'],
//     unidad: payload.data.conditions[0]['details']['gatewayUnplugged']['vehicle']['name'],
//     numero_empleado: null,
//     operador: null,
//     fecha_cierre: null,
//     primer_interaccion: ''
//   });

//   await alerta.create(nuevaAlerta.dataValues, {
//     fields: [
//       'eventId', 
//       'eventType',
//       'alertConditionId',
//       'webhookId',
//       'event', 
//       'eventDescription', 
//       'eventTime', 
//       'alertEventURL', 
//       'id_unidad', 
//       'unidad',
//       'fecha_cierre',
//       'primer_interaccion'
//     ]
//   }).then(result => {}).catch(error => { console.log(error.message); });
// });

// app.post('/webhookManipulacion', bodyParser.raw({type: 'application/json'}), async (req, res) => {
//   const payload = req.body;
// });




// app.post('/webhookSamsara', bodyParser.raw({type: 'application/json'}), async (req, res) => {
//   const payload = req.body;

//   console.log(payload);

//   if(payload.eventType == 'Alert') {
//     var eventoformat1 = payload.event.details.replace('Se detectó un evento por ', "");
//     var eventoformat2 = eventoformat1.split(' en el vehículo')[0];

//     const timestamp = payload.eventMs;
//     const date = new Date(timestamp);
//     const formato = moment(date).format('YYYY-MM-DD HH:mm:ss');

//     let nuevaAlerta = new alerta({
//       eventId: payload.eventId,
//       eventType: payload.eventType,
//       event: eventoformat2,
//       eventDescription: payload.event.details,
//       eventTime: formato,
//       eventMs: null,
//       alertEventURL: payload.event.alertEventUrl,
//       incidentUrl: null,
//       id_unidad: payload.event.device.id,
//       unidad: payload.event.device.name
//     });

//     await alerta.create(nuevaAlerta.dataValues, {
//         fields: [
//           'eventId', 
//           'eventType', 
//           'event', 
//           'eventDescription', 
//           'eventTime', 
//           'eventMs', 
//           'alertEventURL', 
//           'incidentUrl', 
//           'id_unidad', 
//           'unidad'
//         ]
//     })
//     .then(result => {})
//     .catch(error => { console.log(error.message); });
//   }
//   else  {
//     console.log(payload.data.conditions[0]);


//     var data = payload.data.conditions[0];
//     var validar = data['description'];
//     const date = payload.eventTime;
//     const formato = moment(date).format('YYYY-MM-DD HH:mm:ss'); 

//     let nuevaAlerta = new alerta({
//       eventId: payload.eventId,
//       eventType: payload.eventType,
//       event: validar == "Harsh Event" ? data['description'] : 'Parada No Autorizada',
//       eventDescription: validar == "Harsh Event" ? data['description'] : 'Parada No Autorizada',
//       eventTime: formato,
//       eventMs: null,
//       alertEventURL: payload.data.incidentUrl,
//       incidentUrl: null,
//       id_unidad: validar == "Harsh Event" ? data['details']['harshEvent']['vehicle']['id'] : data['details']['insideGeofence']['vehicle']['id'],
//       unidad: validar == "Harsh Event" ? data['details']['harshEvent']['vehicle']['name'] : data['details']['insideGeofence']['vehicle']['name']
//     });

//     await alerta.create(nuevaAlerta.dataValues, {
//       fields: [
//         'eventId', 
//         'eventType', 
//         'event', 
//         'eventDescription', 
//         'eventTime', 
//         'eventMs', 
//         'alertEventURL', 
//         'incidentUrl', 
//         'id_unidad', 
//         'unidad'
//       ]
//   })
//   .then(result => {})
//   .catch(error => { console.log(error.message); });
//   }

//   res.status(200).send('Ok');
// });