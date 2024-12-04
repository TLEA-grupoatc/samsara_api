module.exports = app => {
    const { verificarToken } = app.middlewares.auth;
    const Liq = app.controllers.liquidaciones;
    const { UniqueLiquidacionInsert } = app.middlewares.liquidaciones;

    app.get('/obtenerPlan/:fechaInicio/:fechaFin', verificarToken, Liq.obtenerPlan);
    
    app.get('/obtenerPlanPorUnidad/:fechaInicio/:fechaFin/:unidad', verificarToken, Liq.obtenerPlanPorUnidad);
    
    app.get('/obtenerPrenomina/:fechas/:operador', verificarToken, Liq.obtenerPrenomina);

    app.get('/obtenerLiquidacion/:fechas/:operador/:folio/:tipo', verificarToken, Liq.obtenerLiquidacion);

    app.get('/obtenerPrenominaDocumentos/:id/:campo', verificarToken, Liq.obtenerPrenominaDocumentos);

    app.delete('/verificarDocumento/:id/:comentario/:usuario', verificarToken, Liq.verificarDocumento);

    app.delete('/verificarPrenomina/:id/:campo/:usuario', verificarToken, Liq.verificarPrenomina);

    app.delete('/verificarLiquidacion/:id/:campo/:usuario', verificarToken, Liq.verificarLiquidacion);

    app.delete('/cancelacionPrenomina/:id_prenomina', verificarToken, Liq.cancelacionPrenomina);

    app.delete('/cancelacionLiquidacion/:id_liquidacion', verificarToken, Liq.cancelacionLiquidacion);

    app.post('/verificarFP', verificarToken, Liq.verificarFP);
    
    app.post('/registrarPrenomina', verificarToken, Liq.registrarPrenomina);
    
    app.post('/registrarLiquidacion', [verificarToken, UniqueLiquidacionInsert], Liq.registrarLiquidacion);
    
}