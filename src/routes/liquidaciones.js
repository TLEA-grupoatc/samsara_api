module.exports = app => {
    const { verificarToken } = app.middlewares.auth;
    const Liq = app.controllers.liquidaciones;

    app.get('/obtenerPlan/:fechaInicio/:fechaFin', Liq.obtenerPlan);
    
    app.get('/obtenerPlanPorUnidad/:fechaInicio/:fechaFin/:unidad', Liq.obtenerPlanPorUnidad);
    
    
    
    app.get('/obtenerPrenomina', Liq.obtenerPrenomina);

    app.get('/obtenerPrenominaDocumentos/:id_prenomina', Liq.obtenerPrenominaDocumentos);

    app.post('/registrarPrenomina', Liq.registrarPrenomina);
}