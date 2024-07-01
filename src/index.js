require('colors');
const express = require('express');
const cors = require('cors')
const app = express();
const consign = require('consign');
const cookieParser = require('cookie-parser');
const http = require('http').createServer(app);
const socketIO = require('socket.io')(http, {
  cors: {
    origin: ["http://localhost:4200"],
    credentials: true,
    methods: ["GET", "POST"]
  }
});
const bodyParser = require('body-parser');
const ngrok = require("@ngrok/ngrok");
const moment = require('moment');
const dotenv = require('dotenv').config();

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

// http.on('connection', (socket) => {
//   socket.on('SHOW_ALERTS', function(alerta){
//     console.log(alerta);
//   });

//   socket.on('disconnect', () => {
//     console.log('Un usuario se ha desconectado');
//   });
// });

setInterval(() => {
  const req = {};
  const res = {
      json: (data) => console.log(data),
      status: (statusCode) => ({
          json: (data) => console.log(statusCode, data)
      })
  };

  // app.obtenerSnapshot(req, res);
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
  
  var eventoformat1 = payload.event.details.replace('Se detectó un evento por ', "");
  var eventoformat2 = eventoformat1.split(' en el vehículo')[0];
  
  console.log(payload);

  let nuevaAlerta = new alerta({
    eventId: payload.eventId,
    eventType: payload.eventType,
    alertConditionId: payload.event.alertConditionId,
    webhookId: payload.webhookId,
    event: payload.event.alertConditionId == 'DeviceLocationInsideGeofence' ? 'Parada no Autorizada' : payload.event.alertConditionId == 'PanicButtonPressed' ? 'Botón de pánico' : eventoformat2,
    eventDescription: payload.event.details,
    eventTime: formato,
    alertEventURL: payload.event.alertEventUrl,
    id_unidad: payload.event.device.id,
    unidad: payload.event.device.name
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
      'unidad'
    ]
  })
  .then(result => {})
  .catch(error => { console.log(error.message); });

  res.status(200).send('Ok');
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
