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

    app.get('/obtenerDocumentosCartas/:operador', verificarToken, Fo.obtenerDocumentosCartas);

    app.get('/obtenerDocumentosCartasIndi/:operador', verificarToken, Fo.obtenerDocumentosCartasIndi);
    
    app.get('/obtenerOperadoresConHistorico', Fo.obtenerOperadoresConHistorico);
    
    app.get('/obtenerOperadoresConHistoricoConFiltro/:year/:month', Fo.obtenerOperadoresConHistoricoConFiltro);
    
    app.get('/obtenerActividadesDOXOperador/:operador', verificarToken, Fo.obtenerActividadesDOXOperador);
     
    app.post('/crearActividadDO', verificarToken, Fo.crearActividadDO);
    
    app.put('/editarActividadDO/:id_actividad_ope_op', verificarToken, Fo.editarActividadDO);
    
    app.put('/cerrarReporte/:id_actividad_ope_op', verificarToken, Fo.cerrarReporte);
    
    app.post('/crearCobro', verificarToken, Fo.crearCobro);
    
    app.get('/obtenerCobros/:fechaInicio/:fechaFin', verificarToken, Fo.obtenerCobros);
    
    app.delete('/cobroRealizado/:id_cobro/:cobrado_por', verificarToken, Fo.cobroRealizado);
    
    app.get('/obtenerReporteOperadoresAlertas/:fechaInicio/:fechaFin', verificarToken, Fo.obtenerReporteOperadoresAlertas);
    
    app.put('/actualizarTractoTitularOperador/:numero_empleado', verificarToken, Fo.actualizarTractoTitularOperador);
    
    app.put('/actualizarConflictivoOperador/:numero_empleado', verificarToken, Fo.actualizarConflictivoOperador);
    
    app.put('/actualizarExperienciaOperador/:numero_empleado', verificarToken, Fo.actualizarExperienciaOperador);
    
    app.put('/actualizarClaseOperador/:numero_empleado', verificarToken, Fo.actualizarClaseOperador);
    
    app.put('/actualizarLicenciaOperador/:numero_empleado', verificarToken, Fo.actualizarLicenciaOperador);
    
    app.get('/obtenerAtenciones', verificarToken, Fo.obtenerAtenciones);
    
    app.get('/obtenerQuejas', Fo.obtenerQuejas);
    
    app.get('/obtenerActividadesDO', Fo.obtenerActividadesDO);
    
    app.get('/obtenerDanosOperador', verificarToken, Fo.obtenerDanosOperador);
    
    app.post('/crearActividadOperador', verificarToken, Fo.crearActividadOperador);

    app.post('/crearActividadOperadorIndividual', verificarToken, Fo.crearActividadOperadorIndividual);
    
    app.put('/actualizarActividadOperador/:id_historico', verificarToken, Fo.actualizarActividadOperador);
    
    app.post('/crearDanoOperador', verificarToken, Fo.crearDanoOperador);

    app.get('/obtenerDopings', verificarToken, Fo.obtenerDopings);

    app.post('/crearDopingOperador', verificarToken, Fo.crearDopingOperador);

    app.get('/obtenerDanosUnidadesOpe', Fo.obtenerDanosUnidadesOpe);

    app.post('/crearDanoUnidadOperador', verificarToken, Fo.crearDanoUnidadOperador);
    
    app.delete('/aplicaCargoOperador/:id_danosunidad/:aplica/:aprobo', verificarToken, Fo.aplicaCargoOperador);

    app.get('/obtenerQuejasXOperador/:operador', verificarToken, Fo.obtenerQuejasXOperador);
    
    app.post('/crearQuejaOperador', verificarToken, Fo.crearQuejaOperador);
    
    app.put('/cerrarQueja/:id_queja', verificarToken, Fo.cerrarQueja);

    app.get('/obtenerAtencionesXOperador/:operador', verificarToken, Fo.obtenerAtencionesXOperador);
    
    app.post('/crearAtencionOperador', verificarToken, Fo.crearAtencionOperador);

    app.get('/obtenerScoreCardOperador/:operador/:mes', verificarToken, Fo.obtenerScoreCardOperador);

    
    
    app.get('/obtenerUltimaActividadOperador', Fo.obtenerUltimaActividadOperador);
    
    
    app.get('/resumenCantidadActividadeOperador/:year/:month', Fo.resumenCantidadActividadeOperador);
    
    app.get('/resumenActividadesOperador', Fo.resumenActividadesOperador);


    app.get('/obtenerRegistrosOperadores/:columna/:dato', Fo.obtenerRegistrosOperadores);
    
    
    
    app.get('/obtenerCursos/:mes', verificarToken, Fo.obtenerCursos);
    
    app.get('/obtenerDocumentosCursos/:operador', verificarToken, Fo.obtenerDocumentosCursos);
    
    app.post('/crearCursos', verificarToken, Fo.crearCursos);
    
    app.put('/actualizarCurso/:id_curso', verificarToken, Fo.actualizarCurso);
    
    app.get('/obtenerDocumentosCursos', verificarToken, Fo.obtenerDocumentosCursos);
    
    app.post('/crearCatalogoCurso', verificarToken, Fo.crearCatalogoCurso);
    
    app.put('/actualizarCatalogoCurso/:id_catalogo_curso', verificarToken, Fo.actualizarCatalogoCurso);
    
    app.get('/obtenerCatalogoCursos', verificarToken, Fo.obtenerCatalogoCursos);

    app.delete('/eliminarCatalogoCurso/:id_catalogo_curso', verificarToken, Fo.eliminarCatalogoCurso);
    
    app.get('/obtenerCatalogoInstructores', verificarToken, Fo.obtenerCatalogoInstructores);
    
    app.post('/crearCatalogoInstructor', verificarToken, Fo.crearCatalogoInstructor);

    app.delete('/eliminarCatalogoInstructor/:id_catalogo_instructor', verificarToken, Fo.eliminarCatalogoInstructor);

    app.get('/obtenerCronogramaActividadDo/:year/:month', verificarToken, Fo.obtenerCronogramaActividadDo);

    app.get('/obtenerCronogramaDicisciplana/:year/:month', verificarToken, Fo.obtenerCronogramaDicisciplana);
    
    app.get('/obtenerCronogramaBienestar/:year/:month', verificarToken, Fo.obtenerCronogramaBienestar);
    
    app.get('/obtenerCronogramaDanosOperador/:year/:month', verificarToken, Fo.obtenerCronogramaDanosOperador);
    
    app.get('/obtenerCronogramaDanosUnidadOperador/:year/:month', verificarToken, Fo.obtenerCronogramaDanosUnidadOperador);
    
    app.get('/obtenerCronogramaDopingsOperador/:year/:month', verificarToken, Fo.obtenerCronogramaDopingsOperador);
    
    app.get('/obtenerCronogramaCursos/:year/:month', verificarToken, Fo.obtenerCronogramaCursos);
}