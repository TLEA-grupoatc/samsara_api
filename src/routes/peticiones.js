// var cron = require('node-cron');

module.exports = app => {
    const { verificarToken } = app.middlewares.auth;
    const Peticion = app.controllers.peticiones;
    
    app.get('/obtenerParaGuardarUnidades', Peticion.obtenerParaGuardarUnidades);

    app.get('/totalUnidades', Peticion.totalUnidades);

    app.get('/totalUnidadesGobernadas', Peticion.totalUnidadesGobernadas);

    app.get('/totalUnidadesGobernadasCapana', Peticion.totalUnidadesGobernadasCapana);

    app.get('/obtenerVehiculos', Peticion.obtenerVehiculos);

    app.put('/actualizarUnidad/:id_unidad', Peticion.actualizarUnidad);

    app.get('/obtenerSnapshot', Peticion.obtenerSnapshot);

    app.get('/obtenerEventos', Peticion.obtenerEventos);


    app.get('/obtenerReporte/:fechainicio/:fechafin', Peticion.obtenerReporte);

    app.get('/obtenerDetalleReporte/:unidad/:fechainicio/:fechafin', Peticion.obtenerDetalleReporte);


    app.get('/obtenerDivisionesVehiculo', Peticion.obtenerDivisionesVehiculo);

    app.get('/obtenerMarcasVehiculo', Peticion.obtenerMarcasVehiculo);

    app.get('/obtenerModelosVehiculo', Peticion.obtenerModelosVehiculo);



    app.get('/obtenerAlertas/:fechainicio/:fechafin', Peticion.obtenerAlertas);

    app.get('/obtenerCatalagoEventos', Peticion.obtenerCatalagoEventos);



    app.put('/primeraInteraccion/:id_alerta', Peticion.primeraInteraccion);

    app.post('/crearSeguimiento', Peticion.crearSeguimiento);


    app.get('/obtenerSeguimientoUsuario/:fechainicio/:fechafin/:usuario', Peticion.obtenerSeguimientoUsuario);
}