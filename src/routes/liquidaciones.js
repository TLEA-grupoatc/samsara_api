module.exports = app => {
    const { verificarToken } = app.middlewares.auth;
    const Liq = app.controllers.liquidaciones;
    const { UniqueLiquidacionInsert } = app.middlewares.liquidaciones;

    app.get('/obtenerPlan/:fechaInicio/:fechaFin', verificarToken, Liq.obtenerPlan);
    
    app.get('/obtenerPlanPorUnidad/:fechaInicio/:fechaFin/:unidad', verificarToken, Liq.obtenerPlanPorUnidad);
    
    app.get('/obtenerPrenomina/:fechas/:operador/:tracto/:tipo', verificarToken, Liq.obtenerPrenomina);

    app.get('/obtenerLiquidacion/:fechas/:operador/:folio/:negocio/:tipo', verificarToken, Liq.obtenerLiquidacion);

    app.get('/obtenerPrenominaDocumentos/:id/:campo', verificarToken, Liq.obtenerPrenominaDocumentos);

    app.delete('/verificarDocumento/:id/:comentario/:usuario', verificarToken, Liq.verificarDocumento);

    app.delete('/rechazarDocumento/:id/:comentario/:usuario', verificarToken, Liq.rechazarDocumento);

    app.put('/verificarPrenomina/:id/:campo/:usuario', verificarToken, Liq.verificarPrenomina);

    app.put('/verificarLiquidacion/:id/:campo/:usuario', verificarToken, Liq.verificarLiquidacion);


    app.put('/enviarAVerificarPrenomina/:id/:estado', verificarToken, Liq.enviarAVerificarPrenomina);

    app.put('/enviarAVerificarLiquidacion/:id/:estado', verificarToken, Liq.enviarAVerificarLiquidacion);

    app.put('/cancelacionPrenomina/:id_prenomina', verificarToken, Liq.cancelacionPrenomina);

    app.put('/cancelacionLiquidacion/:id_liquidacion', verificarToken, Liq.cancelacionLiquidacion);

    app.post('/verificarFP', verificarToken, Liq.verificarFP);

    app.post('/verificarFA', verificarToken, Liq.verificarFA);
    
    app.post('/registrarPrenomina', verificarToken, Liq.registrarPrenomina);

    app.post('/cargaDeExtras', verificarToken, Liq.cargaDeExtras);
    
    app.post('/registrarLiquidacion', [verificarToken, UniqueLiquidacionInsert], Liq.registrarLiquidacion);
    
}