module.exports = app => {
    const { verificarToken } = app.middlewares.auth;
    const Peticion = app.controllers.peticiones;
    
    app.get('/obtenerParaGuardarUnidades', Peticion.obtenerParaGuardarUnidades);

    app.get('/totalUnidades', verificarToken, Peticion.totalUnidades);

    app.get('/totalUnidadesGobernadas', verificarToken, Peticion.totalUnidadesGobernadas);

    app.get('/totalUnidadesGobernadasCapana', verificarToken, Peticion.totalUnidadesGobernadasCapana);

    app.get('/totalUnidadesConParoMotor', verificarToken, Peticion.totalUnidadesConParoMotor);

    app.get('/obtenerVehiculos', Peticion.obtenerVehiculos);

    app.get('/obtenerVehiculosxTag/:tag', verificarToken, Peticion.obtenerVehiculosxTag);

    app.put('/actualizarUnidad/:id_unidad', verificarToken, Peticion.actualizarUnidad);

    app.get('/obtenerSnapshot', verificarToken, Peticion.obtenerSnapshot);

    app.get('/obtenerEventos', verificarToken, Peticion.obtenerEventos);


    app.get('/obtenerReporte/:fechainicio/:fechafin', Peticion.obtenerReporte);

    app.get('/obtenerReporteJson/:fechainicio/:fechafin', Peticion.obtenerReporteJson);

    app.get('/obtenerDetalleReporte/:unidad/:fechainicio/:fechafin', Peticion.obtenerDetalleReporte);


    app.get('/obtenerDivisionesVehiculo', verificarToken, Peticion.obtenerDivisionesVehiculo);

    app.get('/obtenerMarcasVehiculo', verificarToken, Peticion.obtenerMarcasVehiculo);

    app.get('/obtenerModelosVehiculo', verificarToken, Peticion.obtenerModelosVehiculo);



    app.get('/obtenerAlertas/:division/:fechainicio/:fechafin', verificarToken, Peticion.obtenerAlertas);

    app.get('/obtenerCatalagoEventos', verificarToken, Peticion.obtenerCatalagoEventos);



    app.put('/primeraInteraccion/:id_alerta', verificarToken, Peticion.primeraInteraccion);

    app.put('/cierreDeAlertas/:id_alerta', verificarToken, Peticion.cierreDeAlertas);

    app.post('/crearSeguimiento', verificarToken, Peticion.crearSeguimiento);


    app.get('/obtenerSeguimientoUsuario/:fechainicio/:fechafin/:usuario', verificarToken, Peticion.obtenerSeguimientoUsuario);









    app.get('/reporteInmovilizadores', Peticion.reporteInmovilizadores);
    
    app.get('/obtenerReporteUltimaLocacion', Peticion.obtenerReporteUltimaLocacion);

    app.get('/obtenerReporteULYI', Peticion.obtenerReporteULYI);








    
    app.put('/primeraInteraccionSeguimiento/:id_seguimiento', verificarToken, Peticion.primeraInteraccionSeguimiento);

    app.get('/obtenerGeocercas', verificarToken, Peticion.obtenerGeocercas);

    app.get('/obtenerReporteParoMotor', verificarToken, Peticion.obtenerReporteParoMotor);

    app.get('/obtenerGraficaGobernadas', Peticion.obtenerGraficaGobernadas);

    app.get('/obtenerGraficaUnidadesParoMotor', verificarToken, Peticion.obtenerGraficaUnidadesParoMotor);


    app.get('/obtenerGraficaOperadorAlertas/:fechainicio/:fechafin', verificarToken, Peticion.obtenerGraficaOperadorAlertas);



    
    app.get('/obtenerReporteGeneral/:fechainicio/:fechafin', verificarToken, Peticion.obtenerReporteGeneral);

    app.get('/obtenerReporteAlertas/:division/:fechainicio/:fechafin', verificarToken, Peticion.obtenerReporteAlertas);

    app.get('/obtenerCumplientoAlertas/:fechainicio/:fechafin', verificarToken, Peticion.obtenerCumplientoAlertas);
    
    
    // app.get('/enlazarUnidadAOperadorSamsara', Peticion.enlazarUnidadAOperadorSamsara);
    
    app.get('/obtenerEnlazarOpeSam', Peticion.obtenerEnlazarOpeSam);
    
    app.post('/crearDocumentoUnidad', verificarToken, Peticion.crearDocumentoUnidad);

    app.get('/verDocumentosUnidad/:unidad', verificarToken, Peticion.verDocumentosUnidad);
    
    app.get('/verHisorialGobernas/:unidad', verificarToken, Peticion.verHisorialGobernas);

    app.put('/aplicaNoAplicaAlerta/:id_alerta', verificarToken, Peticion.aplicaNoAplicaAlerta);


    app.get('/obtenerTiempoDeRespuesta/:division/:fechainicio/:fechafin', verificarToken, Peticion.obtenerTiempoDeRespuesta);
    
    
    
    
    
    
    
    
    
    
    
    
    app.get('/resumenAlertasOperadores/:fechainicio/:fechafin', Peticion.resumenAlertasOperadores);







}