const dotenv = require('dotenv').config();
const moment = require('moment');
const _ = require('lodash');
const axios = require('axios');
const { RTMClient } = require('@slack/rtm-api');
const { WebClient } = require('@slack/web-api');


module.exports = app => {

  const token = 'xoxb-7361273655393-7440299925152-FJ3AtAwmvArtGR9ckPksZz8o';

  const rtm = new RTMClient(token);
  const web = new WebClient(token);

  app.encontrarCanal = async (req, res) => {
    try {
        const response = await axios.get('https://slack.com/api/conversations.history', {
          headers: {
            'Authorization': 'Bearer xoxb-7361273655393-7440299925152-FJ3AtAwmvArtGR9ckPksZz8o'
          },
          params: {
            channel: 'C07AB2NCUS0'
          }
        });
        
        res.json({
          OK: true,
          data: response.data.messages
        });
      } 
      catch (error) {
        console.error(error);
        res.status(500).send('Error fetching conversations list');
      }
  }

  rtm.on('message', async (event) => {

    await rtm.start();
    console.log('Conectado a Slack');
    if (event.channel_type !== 'alertas-samsara') {
      return;
    }
  
    const channelInfo = await web.conversations.info({ channel: event.channel });
    const channelName = channelInfo.channel.name;
  
    console.log(`Nuevo mensaje en #${channelName}: ${event.text}`);
    console.log(`Nuevo mensaje en #${channelName}: ${event}`);
  });

  return app;
}