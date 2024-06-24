require('colors');

const express = require('express');
const cors = require('cors')
const app = express();

const consign = require('consign');
const cookieParser = require('cookie-parser');
const http = require('http').createServer(app);
const bodyParser = require('body-parser');

app.use(express.static('./public'));
app.set('port', process.env.PORT || 3010);
app.use(express.urlencoded({extended: false}));         
app.use('/images', express.static('images'));
app.use(express.json({ limit: "100mb" }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

consign({cwd: 'src'})
.include('libs/config.js')
.then('./database.js')
.then('middlewares')
.then('controllers')
.then('routes')
.into(app); 

setInterval(() => {
  const req = {};
  const res = {
      json: (data) => console.log(data),
      status: (statusCode) => ({
          json: (data) => console.log(statusCode, data)
      })
  };

  app.obtenerSnapshot(req, res);
  // app.obtenerEventos(req, res);
}, 60000); 



app.use(bodyParser.json());

// Endpoint para recibir el webhook
app.post('/webhookSamsara', (req, res) => {
  const payload = req.body;

  // Aquí puedes procesar el payload recibido
  console.log('Webhook received:', payload);

  // Responde al servicio del webhook para confirmar la recepción
  res.status(200).send('Webhook received successfully');
});

//Iniciar Server
http.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`.random);
});