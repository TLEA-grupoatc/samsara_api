module.exports = app => {
    const { verificarToken } = app.middlewares.auth;
    const Liq = app.controllers.liquidaciones;

    app.get('/obtenerPlan/:fechaInicio/:fechaFin', Liq.obtenerPlan);
}