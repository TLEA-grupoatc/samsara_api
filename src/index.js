require('colors');
const express = require('express');
const cors = require('cors')
const app = express();
const consign = require('consign');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const moment = require('moment');
const http = require('http').createServer(app);
const ngrok = require("@ngrok/ngrok");
const dotenv = require('dotenv').config();
const socketIO = require('socket.io')(http, {
  cors: {
    origin: ["http://localhost:4200", "https://samsaraxtlea.tlea.online"],
    credentials: true,
    methods: ["GET", "POST"]
  }
});

app.use(express.static('./public'));
app.set('port', 3010);
app.use(express.urlencoded({extended: false}));         
app.use('/images', express.static('images'));
app.use(express.json({ limit: "100mb" }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.io = socketIO;
app.use(cors());

consign({cwd: 'src'}).include('libs/config.js').then('./database.js').then('middlewares').then('controllers').then('routes').then('sockets').into(app); 

const alerta = app.database.models.Alertas;
const geogaso = app.database.models.GeoGaso;
const Samsara = require("@api/samsara-dev-rel");
Samsara.auth(process.env.KEYSAM);

// setInterval(() => {
//   app.obtenerSnapshot({}, {
//     json: (data) => console.log(data),
//     status: (statusCode) => ({
//       json: (data) => console.log(statusCode, data)
//     })
//   });
// }, 60000);

// setInterval(() => {
//   app.connectToDatabase({unidad: 'TLEA-146'}, {
//     json: (data) => {
//       console.log(data);
//     },
//     status: (statusCode) => ({
//       json: (data) => console.log(statusCode, data)
//     })
//   });
// }, 30000);










app.post('/webhook1Samsara', bodyParser.raw({type: 'application/json'}), async (req, res) => {
  const payload = req.body;

  const timestamp = payload.eventMs;
  const date = new Date(timestamp);
  const formato = moment(date).format('YYYY-MM-DD HH:mm:ss');
  var validacionEvento = '';
  var eventoCase;
  
  var eventoformat1 = payload.event.details.replace('Se detectó un evento por ', "");
  var eventoformat2 = eventoformat1.split(' en el vehículo')[0];
  var eventoformat2 = eventoformat2.split(' event was')[0];

  var operador = '';
  var numero_operador = '';

  if(payload.event.alertConditionId == 'DeviceLocationInsideGeofence') {
    validacionEvento = 'Parada no Autorizada';
  }
  
  if(payload.event.alertConditionId == 'PanicButtonPressed') {
    validacionEvento = 'Botón de pánico';
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
    
    case 'Sin cinturón de seguridad': eventoCase = 'Sin cinturón de seguridad'; break;
    case 'No Seat Belt': eventoCase = 'Sin cinturón de seguridad'; break;

    case 'Uso del móvil': eventoCase = 'Uso del móvil'; break;
    case 'Mobile Usage': eventoCase = 'Uso del móvil'; break;

    default: 'Otros Eventos'; break;
  }

  // await app.connectToDatabase({unidad: payload.event.device.name}, {
  //   json: (data) => {
  //     numero_operador =  data.Operador.OPERADOR_CLAVE;
  //     operador =  data.Operador.OPERADOR_NOMBRE;
  //   },
  //   status: (statusCode) => ({
  //     json: (data) => console.log(statusCode, data)
  //   })
  // });

  let nuevaAlerta = new alerta({
    eventId: payload.eventId,
    eventType: payload.eventType,
    alertConditionId: payload.event.alertConditionId,
    webhookId: payload.webhookId,
    event: eventoCase,
    eventDescription: payload.event.details,
    eventTime: formato,
    alertEventURL: payload.event.alertEventUrl,
    id_unidad: payload.event.device.id,
    unidad: payload.event.device.name,
    // numero_empleado: numero_operador,
    // operador: operador,
    numero_empleado: null,
    operador: null,
    fecha_cierre: null,
    primer_interaccion: ''
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
      'primer_interaccion'
    ]
  }).then(result => {}).catch(error => { console.log(error.message); });

  res.status(200).send('Ok');
});

app.post('/webhookComboy', bodyParser.raw({type: 'application/json'}), async (req, res) => {
  const payload = req.body;
  console.log(payload);
  console.log(payload.data.conditions[0]['details']);
});

app.post('/webhookPuertaEnlace', bodyParser.raw({type: 'application/json'}), async (req, res) => {
  const payload = req.body;

  const date = payload.eventTime;
  const formato = moment(date).format('YYYY-MM-DD HH:mm:ss'); 

  let nuevaAlerta = new geogaso({
    eventId: payload.eventId,
    eventType: payload.eventType,
    alertConditionId: 'gatewayUnplugged',
    webhookId: payload.webhookId,
    event: 'GPS Desconectado',
    eventDescription: 'Se ah Desconectado la Puerta de enlace',
    eventTime: formato,
    alertEventURL: payload.data.incidentUrl,
    id_unidad: payload.data.conditions[0]['details']['gatewayUnplugged']['vehicle']['id'],
    unidad: payload.data.conditions[0]['details']['gatewayUnplugged']['vehicle']['name'],
    numero_empleado: null,
    operador: null,
    fecha_cierre: null,
    primer_interaccion: ''
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
      'fecha_cierre',
      'primer_interaccion'
    ]
  }).then(result => {}).catch(error => { console.log(error.message); });
});

app.post('/webhookManipulacion', bodyParser.raw({type: 'application/json'}), async (req, res) => {
  const payload = req.body;
  console.log(payload.data.conditions);
  console.log(payload.data.conditions[0]);
});

app.post('/slack/events',  async (req, res) => {
  const { type, challenge, event } = req.body;

  if(type === 'url_verification') {
    res.status(200).send(challenge);
    return;
  }

  var payload = event;
  const timestamp = payload.event_ts;
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  var nombreunidadesp = payload.attachments[0]['title'].split(' se ha detenido dentro')[0];
  var nombreunidad = nombreunidadesp.split(' has stopped inside')[0];

  let nuevaAlerta = new alerta({
    eventId: payload.bot_id,
    eventType: 'Alert',
    alertConditionId: 'DeviceLocationStopGeofence',
    webhookId: 'SlackWebhook',
    event: 'Parada no Autorizada',
    eventDescription: payload.attachments[0]['title'],
    eventTime: formattedDate,
    alertEventURL: payload.attachments[0]['title_link'],
    id_unidad: nombreunidad.trim(),
    unidad: nombreunidad.trim(),
    fecha_cierre: null,
    primer_interaccion: ''
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
      'fecha_cierre',
      'primer_interaccion'
    ]
  }).then(result => {}).catch(error => { console.log(error.message); });

  res.status(200).send('OK');
});





app.post('/webhookGeoGaso', async (req, res) => {
  const payload = req.body;

  var today = new Date();
  const hoy = moment(today).format('YYYY-MM-DD');
  const timestamp = payload.eventMs;
  const timestamp2 = payload['event']['startMs'];
  const date = new Date(timestamp);
  const date2 = new Date(timestamp2);
  const formato = moment(date).format('YYYY-MM-DD HH:mm:ss');
  const formato2 = moment(date2).format('YYYY-MM-DD HH:mm:ss');

  var id = payload['event']['device']['id'];

  var gaso = payload['event']['summary'];

  const procentaje =  await Samsara.getVehicleStatsHistory({
    startTime: formato.split(' ')[0] + 'T' + formato.split(' ')[1] + 'Z',
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
    tanque_salida: 0,
    carga: 0
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
}); 







app.post('/webhookSalidaGeoGaso', async (req, res) => {
  const payload = req.body;
  var today = new Date();
  const hoy = moment(today).format('YYYY-MM-DD');

  var id = payload.data.conditions[0]['details']['geofenceExit']['vehicle']['id'];

  const timestamp2 = payload['event']['startMs'];
  const date2 = new Date(timestamp2);
  const formato2 = moment(date2).format('YYYY-MM-DD HH:mm:ss');

  var encontro = await geogaso.findAll({
    where: {
      tracto: payload.data.conditions[0]['details']['geofenceExit']['vehicle']['name'],
      geo: payload.data.conditions[0]['details']['geofenceExit']['address']['name'],
      dia: hoy
    }
  });

  console.log(encontro);
  console.log(encontro.dataValues.id_geo_gaso);

  const procentaje =  await Samsara.getVehicleStatsHistory({
    startTime: formato2.split(' ')[0] + 'T' + formato.split(' ')[1] + 'Z',
    endTime: hoy + 'T23:59:59Z',
    vehicleIds: id,
    types: 'fuelPercents'
  });

  var porce = procentaje['data']['data'][0]['fuelPercents'][procentaje['data']['data'][0]['fuelPercents'].length -1]['value']

  let nuevaAlerta = new geogaso({
    fecha_salida: hoy,
    tanque_salida: porce,
    carga: 0
  });


  await geogaso.update(nuevaAlerta.dataValues, {
    where: {
      tracto: payload.data.conditions[0]['details']['geofenceExit']['vehicle']['name']
    },
    fields: [
      'fecha_salida', 
      'tanque_salida',
      'carga'
    ]
  }).then(result => {}).catch(error => { console.log(error.message); });
});










// http.listen(app.get('port'), () => {
//   console.log(`Server on port ${app.get('port')}`.random);
// });

http.listen(app.get('port'), async () => {
  try {
    await ngrok.authtoken(process.env.TOKENNGROK);
    const url = await ngrok.forward(app.get('port'));

    console.log(`Server on port ${app.get('port')}`.random);
    console.log(url.url());
  }
  catch (error) {
    console.error('Error al iniciar el túnel Ngrok:', error);
  }
});

























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