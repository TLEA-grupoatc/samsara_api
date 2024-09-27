module.exports = app => {
    const { verificarToken } = app.middlewares.auth;
    const Fo = app.controllers.formularios;

    app.get('/obtenerEventosCriticos/:fechaInicio/:fechaFin', Fo.obtenerEventosCriticos);

    app.get('/obtenerParosDeMotor/:id_evento', Fo.obtenerParosDeMotor);

    app.post('/crearEvento', Fo.crearEvento);



    app.get('/obtenerOperadores', Fo.obtenerOperadores);


    app.post('/crearCobro', Fo.crearCobro);
    
    app.get('/obtenerCobros', Fo.obtenerCobros);
    
    app.delete('/cobroRealizado/:id_cobro/:cobrado_por', Fo.cobroRealizado);




    app.get('/obtenerReporteOperadoresAlertas/:fechaInicio/:fechaFin', Fo.obtenerReporteOperadoresAlertas);
}