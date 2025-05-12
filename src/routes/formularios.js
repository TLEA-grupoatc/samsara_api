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
    
    app.get('/obtenerHistoricoActividadOpe', verificarToken, Fo.obtenerHistoricoActividadOpe);
    
    app.put('/actualizarOperador/:id_operador', verificarToken, Fo.actualizarOperador);

    app.put('/cerrarQueja/:id_actividad_ope_op', verificarToken, Fo.cerrarQueja);
    
    app.delete('/eliminarOperador/:id_operador', verificarToken, Fo.eliminarOperador);
    
    app.post('/crearOperador', verificarToken, Fo.crearOperador);
    
    app.post('/crearCartaOperador', verificarToken, Fo.crearCartaOperador);
    
    app.get('/obtenerCartas/:numero_empleado', verificarToken, Fo.obtenerCartas);
    
    app.get('/obtenerOperadoresConHistorico', Fo.obtenerOperadoresConHistorico);

    app.get('/obtenerOperadoresConHistoricoConFiltro/:fecha', Fo.obtenerOperadoresConHistoricoConFiltro);

    app.get('/obtenerActividadesDOXOperador/:operador', verificarToken, Fo.obtenerActividadesDOXOperador);
    
    app.post('/crearActividadDO', verificarToken, Fo.crearActividadDO);
    
    app.post('/crearCobro', verificarToken, Fo.crearCobro);
    
    app.get('/obtenerCobros/:fechaInicio/:fechaFin', verificarToken, Fo.obtenerCobros);
    
    app.delete('/cobroRealizado/:id_cobro/:cobrado_por', verificarToken, Fo.cobroRealizado);

    app.get('/obtenerReporteOperadoresAlertas/:fechaInicio/:fechaFin', verificarToken, Fo.obtenerReporteOperadoresAlertas);
}