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

const path = require('path');
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

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
const fs = require('fs');

const alerta = app.database.models.Alertas;
const geogaso = app.database.models.GeoGaso;
const ubiporeco = app.database.models.UBICACIONESPORECONOMICO;
const entradaSalidaGeocerca = app.database.models.EntradaSalidaGeocerca;

const SESSIONS_DIR = path.resolve(__dirname, 'sessions');
if (!fs.existsSync(SESSIONS_DIR)) fs.mkdirSync(SESSIONS_DIR, { recursive: true });

// === Cliente WhatsApp (sesión persistente con LocalAuth) ===
let client;
let isReady = false;

const axios = require('axios');
const Samsara = require("@api/samsara-dev-rel");

Samsara.auth(process.env.KEYSAM);

cron.schedule('* * * * *', () => {   
  app.obtenerSnapshot({}, {
    json: (data) => console.log(data),
    status: (statusCode) => ({
      json: (data) => console.log(statusCode, data)
    })
  }); 
});

// cron.schedule('* * * * *', () => { 
  cron.schedule('0 * * * *', () => {   
    app.itinerarioP({}, {
      json: (data) => console.log(data),
      status: (statusCode) => ({
        json: (data) => console.log(statusCode, data)
      })
    }); 
  });
  
  cron.schedule('0 */2 * * *', () => {   
    // cron.schedule('* * * * *', () => {   
      app.obtenerRecorridoMesActual({}, {
        json: (data) => console.log(data),
        status: (statusCode) => ({
          json: (data) => console.log(statusCode, data)
        })
      }); 
    });
    
  
  cron.schedule('*/3 * * * *', () => {   
    app.registrarLiquidacionAutomatica({}, {
      json: (data) => console.log(data),
      status: (statusCode) => ({
        json: (data) => console.log(statusCode, data)
      })
    }); 
  });









































app.post('/webhookAPITLEA', bodyParser.raw({type: 'application/json'}), async (req, res) => {
  const payload = req.body;

  // const filePath = './webhookAPITLEA_payload.txt';

  // fs.appendFile(filePath, JSON.stringify(payload, null, 2) + '\n', (err) => {
  //   if(err) {
  //     console.error('Error writing payload to file:', err);
  //   }
  // });

  const timestamp = payload.eventMs;
  const date = new Date(timestamp);
  const hoy = new Date();
  const formato = moment(date).format('YYYY-MM-DD HH:mm:ss');
  const formato2 = moment(hoy).format('YYYY-MM-DD');
  const formato3 = moment(hoy).format('HH:mm:ss');
  var validacionEvento = '';
  var eventoCase;
  var ponde = 0
  
  var eventoformat1 = payload.event.details.replace('Se detectó un evento por ', "");
  var eventoformat2 = eventoformat1.split(' en el vehículo')[0];
  var eventoformat2 = eventoformat2.split(' event was')[0];

  var operador = '';
  var numero_operador = null;

  try {
    const { data } = await Samsara.getDriverVehicleAssignments({ filterBy: 'vehicles', startTime: `${formato2}T${formato3}Z`, vehicleIds: payload.event.device.id });
    if (data && data.data && data.data.length > 0 && data.data[0].driver && data.data[0].driver.name) {
      operador = data.data[0].driver.name;
    }
  } catch (err) {
    console.error(err);
  }

  if(payload.event.alertConditionId == 'DeviceLocationStoppedInGeofence') {
    validacionEvento = 'Parada no Autorizada';
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
    case 'Alto omitido': eventoCase = 'Alto omitido'; ponde = 0; break;
    case 'Rolling Stop': eventoCase = 'Alto omitido'; ponde = 0; break;

    case 'Evento severo': eventoCase = 'Somnolencia'; ponde = 3; break;

    case 'Botón de pánico': eventoCase = 'Botón de pánico'; ponde = 0; break;

    case 'Colisión': eventoCase = 'Accidente'; ponde = 5; break;
    case 'Crash': eventoCase = 'Accidente'; ponde = 5; break;

    case 'Conducción distraída': eventoCase = 'Conducción distraída'; ponde = 0; break;
    case 'Distracted Driving': eventoCase = 'Conducción distraída'; ponde = 0; break;

    case 'Cuasi-colisión': eventoCase = 'Advertencia de Colisión Frontal'; ponde = 4; break;
    case 'Forward Collision Warning': eventoCase = 'Advertencia de Colisión Frontal'; ponde = 4; break;

    case 'Cámara obstruida': eventoCase = 'Cámara obstruida'; ponde = 2; break;
    case 'Obstructed Camera': eventoCase = 'Cámara obstruida'; ponde = 2; break;

    case 'Distancia de seguimiento': eventoCase = 'Distancia de seguimiento'; ponde = 3; break;
    case 'Following Distance': eventoCase = 'Distancia de seguimiento'; ponde = 3; break;

    case 'Frenado brusco': eventoCase = 'Frenado brusco'; ponde = 3; break;
    case 'Harsh Brake': eventoCase = 'Frenado brusco'; ponde = 3; break;

    case 'Giro brusco': eventoCase = 'Giro brusco'; ponde = 2; break;
    case 'Harsh Turn': eventoCase = 'Giro brusco'; ponde = 2; break;

    case 'Parada no Autorizada': eventoCase = 'Parada no Autorizada'; ponde = 3; break;

    case 'Exceso de Velocidad': eventoCase = 'Exceso de Velocidad'; ponde = 4; break;
    
    case 'Sin cinturón de seguridad': eventoCase = 'Sin cinturón de seguridad'; ponde = 0; break;
    case 'No Seat Belt': eventoCase = 'Sin cinturón de seguridad'; ponde = 0; break;

    case 'Uso del móvil': eventoCase = 'Uso del móvil'; ponde = 2; break;
    case 'Mobile Usage': eventoCase = 'Uso del móvil'; ponde = 2; break;

    default: 'Otros Eventos'; ponde = 0; break;
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
    aplica: eventoCase === 'Parada no Autorizada' ? 1 : 0,
    ponderacion: ponde
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
      'aplica',
      'ponderacion'
    ]
  }).then(result => {}).catch(error => { console.log(error.message); });

  res.status(200).send('Ok');
});




app.post('/webhookPuertaEnlace', bodyParser.raw({type: 'application/json'}), async (req, res) => {
  const payload = req.body;

  const date = payload.eventTime;
  const formato = moment(date).format('YYYY-MM-DD HH:mm:ss');
  var operador = '';

  try {
    const { data } = await Samsara.getDriverVehicleAssignments({ filterBy: 'vehicles', vehicleIds: payload.event.device.id });
    if (data && data.data && data.data.length > 0 && data.data[0].driver && data.data[0].driver.name) {
      operador = data.data[0].driver.name;
    }
  } catch (err) {
    console.error(err);
  }

  let nuevaAlerta = new alerta({
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
    operador: operador,
    fecha_cierre: null,
    primer_interaccion: '',
    aplica: 0,
    ponderacion: 2
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
      'primer_interaccion',
      'aplica',
      'ponderacion'
    ]
  }).then(result => {}).catch(error => { console.log(error.message); });

   res.status(200).send('Ok');
});

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

   res.status(200).send('Ok');
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

   res.status(200).send('Ok');
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
  else if(payload.event?.alertConditionId === 'DeviceMovementStop') {
    var ubi = await ubicacion(payload.event['device']['id']);
      var today = new Date();
    let fechahora = moment(today).format('YYYY-MM-DD HH:mm:ss');
    let nuevaAlerta = new ubiporeco({
      id_samsara: payload.event['device']['id'],
      economico: payload.event['device']['name'],
      motor: 0,
      geocerca: payload.event.details,
      ubicacion: null,
      ubicacion_snapshot: ubi,
      hora_entrada: fechahora,
      movimiento: 'Deteniene movimiento',
      hora_salida: null,
      evento: payload.event.alertConditionDescription
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
      ubicacion_snapshot: ubi.location,
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

   res.status(200).send('Ok');
});

app.post('/webhookEntradasSalidasGeocercas', async (req, res) => {
  const payload = req.body;
  var today = new Date();
  const hoy = moment(today).format('YYYY-MM-DD');
  const hoyh = moment(today).format('YYYY-MM-DD HH:mm:ss');

  // const filePath = './webhookAPITLEA_payload.txt';

  // fs.appendFile(filePath, JSON.stringify(payload, null, 2) + '\n', (err) => {
  //   if(err) {
  //     console.error('Error writing payload to file:', err);
  //   }
  // });

  var ubi = await ultimaubi(payload.data.conditions[0]['details']['deviceMovementStopped']['vehicle']['id']);

  const formato = moment(payload.eventTime).format('YYYY-MM-DD HH:mm:ss');

  let nuevaAlerta = new entradaSalidaGeocerca({
    operador: payload.data.conditions[0]['details']['deviceMovementStopped']['driver']['name'],
    tracto: payload.data.conditions[0]['details']['deviceMovementStopped']['vehicle']['name'],
    direccion: ubi.location,
    geocerca: ubi.geocerca,
    enlace: payload.data.incidentUrl,
    entrada: formato,
    salida: null,
    fecha: hoyh,
    fecha_creacion: hoy
  });

  await entradaSalidaGeocerca.create(nuevaAlerta.dataValues, {
    fields: [
      'operador', 
      'tracto', 
      'direccion', 
      'geocerca', 
      'enlace', 
      'tanque',
      'entrada', 
      'salida',
      'fecha',
      'fecha_creacion'
    ]
  }).then(result => {}).catch(error => { console.log(error.message); });

   res.status(200).send('Ok');
});






app.post('/enviarWhatsuno', async (req, res) => {
  const { numero, mensaje, intervaloMinutos = 0, repeticiones = 1 } = req.body || {};
  if (!numero || !mensaje) {
    return res.status(400).json({ error: 'Faltan parámetros: numero y mensaje' });
  }

  try {
    await initWhatsClient();

    // Espera a que el cliente esté listo (por si viene justo después de escanear el QR)
    if (!isReady) {
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error('Timeout esperando WhatsApp ready')), 30000);
        client.once('ready', () => {
          clearTimeout(timeout);
          resolve();
        });
      });
    }

    const chatId = normalizeNumber(numero);
    // const result = await client.sendMessage(chatId, String(mensaje));

    const delayMs = intervaloMinutos * 60 * 1000;

    // Función para enviar mensaje
    const enviarMensaje = async (intento) => {
      try {
        const result = await client.sendMessage(chatId, String(mensaje));
        console.log(`✅ Mensaje ${intento}/${repeticiones} enviado a ${chatId}`);
        if(intento === repeticiones) {
          console.log('✅ Envíos completados.');
        }
      } catch (err) {
        console.error(`❌ Error enviando mensaje ${intento}:`, err);
      }
    };

    // Programa los envíos
    for (let i = 0; i < repeticiones; i++) {
      setTimeout(() => enviarMensaje(i + 1), i * delayMs);
    }

    return res.json({
      ok: true,
      to: chatId,
      Mensaje: 'Enviado con Exito!'
    });
  } catch (err) {
    console.error('❌ Error /enviarWhats:', err);
    return res.status(412).json({ ok: false, error: err.message || String(err) });
  }
});














function buildPuppeteerArgs() {
  const args = [];
  if (process.env.DISABLE_SANDBOX) {
    args.push('--no-sandbox','--disable-setuid-sandbox','--disable-dev-shm-usage');
  }
  args.push('--disable-dev-shm-usage', '--disable-gpu');
  return args;
}

async function initWhatsClient() {
  if (client) return client;

  client = new Client({
    authStrategy: new LocalAuth({
      dataPath: SESSIONS_DIR,
      clientId: 'default' // puedes cambiar para múltiples sesiones
    }),
    puppeteer: {
      headless: process.env.HEADLESS,
      args: buildPuppeteerArgs()
    }
  });

  client.on('qr', (qr) => {
    console.log('📲 Escanea este QR para vincular WhatsApp (aparece 1 sola vez):');
    qrcode.generate(qr, { small: true });
  });

  client.on('ready', () => {
    isReady = true;
    console.log('✅ WhatsApp listo para enviar mensajes');
  });

  client.on('authenticated', () => {
    console.log('🔐 Autenticado');
  });

  client.on('auth_failure', (m) => {
    isReady = false;
    console.error('❌ Falló autenticación:', m);
  });

  client.on('disconnected', async (reason) => {
    isReady = false;
    console.error('⚠️ Desconectado:', reason);
    try {
      await client.destroy();
    } catch (_) {}
    client = null;
    setTimeout(() => {
      console.log('🔁 Re-inicializando cliente...');
      initWhatsClient();
    }, 3000);
  });

  await client.initialize();
  return client;
}

function normalizeNumber(raw) {
  // Deja solo dígitos
  let num = String(raw).replace(/\D/g, '');
  // Si no trae prefijo país, se lo agregamos
  if (!num.startsWith(process.env.DEFAULT_COUNTRY_PREFIX)) {
    num = process.env.DEFAULT_COUNTRY_PREFIX + num;
  }
  return `${num}@c.us`;
}

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

http.listen(app.get('port'), async () => {
   await initWhatsClient();
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
