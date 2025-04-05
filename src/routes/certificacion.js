module.exports = app => {
    const { verificarToken } = app.middlewares.auth;
    const cert = app.controllers.certificacion;
    
    app.get('/obtenerRutas', verificarToken, cert.obtenerRutas);

    app.get('/obtenerRutasXID/:id_certificacion', verificarToken, cert.obtenerRutasXID);
    
    app.post('/crearRuta', verificarToken, cert.crearRuta);
    
    app.put('/actualizarRuta/:id_certificacion', verificarToken, cert.actualizarRuta);
    
    app.delete('/certificarPunto/:id_certificacion/:campo/:valor', verificarToken, cert.certificarPunto);
    
    
    
    app.get('/obtenerEvidenciaRuta/:id_certificacion', verificarToken, cert.obtenerEvidenciaRuta);
    
    app.post('/agregarEvidencia', verificarToken, cert.agregarEvidencia);



    app.delete('/eliminarPermanenteRuta/:id_certificacion', verificarToken, cert.eliminarPermanenteRuta);
}