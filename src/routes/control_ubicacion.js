module.exports = app => {
    const { verificarToken } = app.middlewares.auth;
    const cu = app.controllers.control_ubicacion;

    app.get('/obtenerClientes', cu.obtenerClientes);

    app.get('/obtenerOrigenes', cu.obtenerOrigenes);
    
    app.get('/obtenerDestinos', cu.obtenerDestinos);
    
    
    app.get('/obtenerPlanes/:division', cu.obtenerPlanes);

    app.post('/crearPlan', cu.crearPlan);
}