module.exports = app => {
    const { verificarToken } = app.middlewares.auth;
    const Send = app.controllers.send_msg;
    
    app.post('/send_message', verificarToken, Send.send_message);

    app.post('/sendConvoy', verificarToken, Send.sendConvoy);
}