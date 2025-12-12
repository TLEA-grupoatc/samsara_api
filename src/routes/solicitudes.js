module.exports = app => {
    const { verificarToken } = app.middlewares.auth;
    const Send = app.controllers.send_msg;
    
    app.get('/obtenerSolicitudes/:fechaInicio/:fechaFin', verificarToken, Send.obtenerSolicitudes);
    
    app.post('/createSolicitud', verificarToken, Send.createSolicitud);

    app.get('/obtenerInfoBitacora/:folio', verificarToken, Send.obtenerInfoBitacora);


    app.get('/obtenerReseteoSamsaraporhora/:fechaI/:fechaF', Send.obtenerReseteoSamsaraporhora);
}