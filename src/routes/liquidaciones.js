module.exports = app => {
    const { verificarToken } = app.middlewares.auth;
    const Liq = app.controllers.liquidaciones;
    const { UniqueLiquidacionInsert } = app.middlewares.liquidaciones;

    app.get('/obtenerPlan/:fechaInicio/:fechaFin', verificarToken, Liq.obtenerPlan);
    
    app.get('/obtenerPlanPorUnidad/:fechaInicio/:fechaFin/:unidad', verificarToken, Liq.obtenerPlanPorUnidad);
    
    app.get('/obtenerPrenomina', verificarToken, Liq.obtenerPrenomina);

    app.get('/obtenerLiquidacion', verificarToken, Liq.obtenerLiquidacion);

    app.get('/obtenerPrenominaDocumentos/:id/:campo', Liq.obtenerPrenominaDocumentos);

    app.post('/registrarPrenomina', verificarToken, Liq.registrarPrenomina);

    app.post('/registrarLiquidacion', [verificarToken, UniqueLiquidacionInsert], Liq.registrarLiquidacion);
}