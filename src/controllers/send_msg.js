const dotenv = require('dotenv').config();
const moment = require('moment');
const _ = require('lodash');
const axios = require('axios');
const FormData = require('form-data');

module.exports = app => {

  app.send_message = async (req, res) => {
      const data = {
        messaging_product: 'whatsapp',
        to: '528117658634',
        type: 'template',
        template: {
          name: 'alertas_samsara',
          language: {
            code: 'es_MX',
          },
          components: [
              {
                  type: 'body',
                  parameters: [
                      { type: 'text',  text: 'Accidente' },
                      { type: 'text', text: '2024-07-02 11:08:00' },
                      { type: 'text', text: 'TLEA-287' }
                  ]
              },
              {
                  type: 'button',
                  sub_type: 'url',
                  index: '0',
                  parameters: [
                      { type: 'text', text: 'https://cloud.samsara.com/o/10003072/fleet/safety/event_review?selectedEvent=281474988539208-1720018752616&dl=eyJkZWVwTGlua1R5cGUiOiJTYWZldHlFdmVudCIsImdyb3VwSWQiOjEwOTQwNiwiZXZlbnRJZCI6MH0=' }
                  ]
              }
          ]
        }
      };
    
      try {
        const response = await axios.post(process.env.URLID, data, {
          headers: {
            Authorization: `Bearer ${process.env.TOKENWP}`,
            'Content-Type': 'application/json',
          },
        });

        res.status(200).json(response.data);
      } 
      catch (error) {
        console.error('Error sending message:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Error sending message' });
      }
  }

  app.sendConvoy = async (req, res) => {
    let body = req.body;

    const imageBuffer = Buffer.from(body.imageBase64, 'base64');

    const formData = new FormData();
    formData.append('file', imageBuffer, { filename: 'image.png', contentType: 'image/png' });
    formData.append('messaging_product', 'whatsapp');
    formData.append('type', 'image/png');
    var mediaId;

    await axios.post(process.env.URLIDM, formData, {
      headers: {
        Authorization: `Bearer ${process.env.TOKENWP}`,
        ...formData.getHeaders()
      }
    })
    .then(response => {
      mediaId = response.data.id;
    })
    .catch(error => {
      console.error('Error al subir la imagen:');
    });

    var numeros = ['528135520947', '528117658634'];
    
      try {
        for(var i = 0; i < numeros.length; i++) {
          const data = {
            messaging_product: 'whatsapp',
            to: numeros[i],
            type: 'image',
            image: {
              id: mediaId
            }
          }
        
          const response = await axios.post(process.env.URLID, data,{
            headers: {
              Authorization: `Bearer ${process.env.TOKENWP}`,
              'Content-Type': 'application/json',
            },
          });
    
        }

        res.status(200).json(response.data);
      } 
      catch (error) {
        res.status(412).json({ success: false, error: error.response ? error.response.data : error.message });
        console.log('Error al enviar: ');
      }
  };


  app.enviarWhats = async (req, res) => {
    const { numero, mensaje } = req.body;

    if (!numero || !mensaje) {
      return res.status(400).json({ error: 'Faltan parámetros: numero y mensaje son requeridos.' });
    }

    const data = {
      messaging_product: 'whatsapp',
      to: numero, // Ejemplo: '528117658634'
      type: 'text',
      text: { body: mensaje }
    };

    try {
      const response = await axios.post(
        `https://graph.facebook.com/v22.0/1326759748836677/messages`,
        data,
        {
          headers: {
            Authorization: `Bearer ${process.env.TOKENWP}`,
            'Content-Type': 'application/json'
          }
        }
      );

      res.status(200).json({
        success: true,
        message: 'Mensaje enviado correctamente',
        response: response.data
      });
    } catch (error) {
      console.error('Error enviando mensaje:', error.response?.data || error.message);
      res.status(500).json({ error: 'No se pudo enviar el mensaje' });
    }
  };

  
  
  return app;
}