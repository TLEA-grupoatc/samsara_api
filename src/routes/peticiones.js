// var cron = require('node-cron');

module.exports = app => {
    const { verificarToken } = app.middlewares.auth;
    const Peticion = app.controllers.peticiones;
    
    app.get('/obtenerParaGuardarUnidades', Peticion.obtenerParaGuardarUnidades);

    app.get('/obtenerParaGuardarUnidades', Peticion.obtenerParaGuardarUnidades);

    app.get('/obtenerVehiculos', Peticion.obtenerVehiculos);

    app.get('/obtenerSnapshot', Peticion.obtenerSnapshot);



    app.get('/obtenerReporte/:fechainicio/:fechafin', Peticion.obtenerReporte);

    app.get('/obtenerDetalleReporte/:unidad/:fechainicio/:fechafin', Peticion.obtenerDetalleReporte);
}