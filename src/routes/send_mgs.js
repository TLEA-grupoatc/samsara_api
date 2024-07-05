// var cron = require('node-cron');

module.exports = app => {
    const { verificarToken } = app.middlewares.auth;
    const Send = app.controllers.send_msg;
    
    app.post('/send_message', Send.send_message);
}