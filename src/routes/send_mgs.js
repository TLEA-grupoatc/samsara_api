module.exports = app => {
    const { verificarToken } = app.middlewares.auth;
    const Send = app.controllers.send_msg;
    
    app.post('/send_message', Send.send_message);

    app.post('/sendConvoy', Send.sendConvoy);


    app.post('/enviarWhats', Send.enviarWhats);
}