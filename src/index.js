require('colors');
const express = require('express');
const cors = require('cors')
const app = express();
const consign = require('consign');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const ngrok = require("@ngrok/ngrok");
const moment = require('moment');
const dotenv = require('dotenv').config();
const http = require('http').createServer(app);
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

setInterval(() => {
  const req = {};
  const res = {
      json: (data) => console.log(data),
      status: (statusCode) => ({
          json: (data) => console.log(statusCode, data)
      })
  };

  app.obtenerSnapshot(req, res);
}, 60000); 

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

  console.log(payload);
  
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

  res.status(200).send('Ok');
});























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