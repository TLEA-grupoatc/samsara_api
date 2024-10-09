module.exports = app => {
    const { verificarToken } = app.middlewares.auth;
    const cu = app.controllers.control_ubicacion;
    
    app.get('/obtenerPlanes/:division', cu.obtenerPlanes);

    app.post('/crearPlan', cu.crearPlan);
}