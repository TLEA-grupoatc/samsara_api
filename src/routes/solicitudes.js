module.exports = app => {
    const { verificarToken } = app.middlewares.auth;
    const Send = app.controllers.send_msg;
    
    app.get('/obtenerSolicitudes/:fechaInicio/:fechaFin', Send.obtenerSolicitudes);
    
    app.post('/createSolicitud', Send.createSolicitud);

    app.get('/obtenerInfoBitacora/:folio', Send.obtenerInfoBitacora);
}