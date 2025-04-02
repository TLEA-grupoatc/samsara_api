module.exports = app => {
    const { verificarToken } = app.middlewares.auth;
    const cert = app.controllers.certificacion;
    
    app.get('/obtenerRutas', verificarToken, cert.obtenerRutas);
    
    app.post('/crearRuta', verificarToken, cert.crearRuta);

    app.put('/actualizarRuta/id_certificacion', verificarToken, cert.actualizarRuta);


    app.delete('/eliminarPermanenteRuta/:id_certificacion', verificarToken, cert.eliminarPermanenteRuta);
}