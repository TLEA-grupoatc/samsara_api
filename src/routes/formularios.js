module.exports = app => {
    const { verificarToken } = app.middlewares.auth;
    const Fo = app.controllers.formularios;

    app.get('/obtenerEventosCriticos/:fechaInicio/:fechaFin', Fo.obtenerEventosCriticos);

    app.get('/obtenerParosDeMotor/:id_evento', Fo.obtenerParosDeMotor);


    app.post('/crearEvento', Fo.crearEvento);
}