module.exports = app => {
    const { verificarToken } = app.middlewares.auth;
    const Fo = app.controllers.formularios;

    app.get('/obtenerEventosCriticos/:fechaInicio/:fechaFin', verificarToken, Fo.obtenerEventosCriticos);

    app.get('/obtenerParosDeMotor/:id_evento', verificarToken, Fo.obtenerParosDeMotor);

    app.post('/crearEvento', verificarToken, Fo.crearEvento);

    app.get('/obtenerOperadores', verificarToken, Fo.obtenerOperadores);
    
    app.get('/obtenerTodosLosOperadores', verificarToken, Fo.obtenerTodosLosOperadores);
    
    app.get('/obtenerOperadoresLista', verificarToken, Fo.obtenerOperadoresLista);
    
    app.get('/obtenerListaParaSeguimeinto', verificarToken, Fo.obtenerListaParaSeguimeinto);
    
    app.get('/obtenerHistoricoActividadOpe', Fo.obtenerHistoricoActividadOpe);
    
    app.put('/actualizarOperador/:id_operador', verificarToken, Fo.actualizarOperador);

    app.delete('/eliminarOperador/:id_operador', verificarToken, Fo.eliminarOperador);
    
    app.post('/crearOperador', verificarToken, Fo.crearOperador);
    
    app.post('/crearCartaOperador', verificarToken, Fo.crearCartaOperador);
    
    app.get('/obtenerCartas/:numero_empleado', verificarToken, Fo.obtenerCartas);
    
    app.get('/obtenerOperadoresConHistorico', Fo.obtenerOperadoresConHistorico);
    
    app.get('/obtenerOperadoresConHistoricoConFiltro/:year/:month', Fo.obtenerOperadoresConHistoricoConFiltro);
    
    app.get('/obtenerActividadesDOXOperador/:operador', verificarToken, Fo.obtenerActividadesDOXOperador);
    
    
    app.post('/crearActividadDO', verificarToken, Fo.crearActividadDO);
    
    app.put('/cerrarReporte/:id_actividad_ope_op', verificarToken, Fo.cerrarReporte);
    
    app.post('/crearCobro', verificarToken, Fo.crearCobro);
    
    app.get('/obtenerCobros/:fechaInicio/:fechaFin', verificarToken, Fo.obtenerCobros);
    
    app.delete('/cobroRealizado/:id_cobro/:cobrado_por', verificarToken, Fo.cobroRealizado);
    
    app.get('/obtenerReporteOperadoresAlertas/:fechaInicio/:fechaFin', verificarToken, Fo.obtenerReporteOperadoresAlertas);
    
    
    
    app.get('/obtenerAtenciones', verificarToken, Fo.obtenerAtenciones);
    app.get('/obtenerQuejas', verificarToken, Fo.obtenerQuejas);
    app.get('/obtenerActividadesDO', verificarToken, Fo.obtenerActividadesDO);
    
    
    
    app.get('/obtenerQuejasXOperador/:operador', verificarToken, Fo.obtenerQuejasXOperador);
    
    app.post('/crearQuejaOperador', verificarToken, Fo.crearQuejaOperador);
    
    app.put('/cerrarQueja/:id_queja', verificarToken, Fo.cerrarQueja);

    app.get('/obtenerAtencionesXOperador/:operador', verificarToken, Fo.obtenerAtencionesXOperador);
    
    app.post('/crearAtencionOperador', verificarToken, Fo.crearAtencionOperador);


    app.get('/obtenerScoreCardOperador/:operador/:mes', verificarToken, Fo.obtenerScoreCardOperador);
}