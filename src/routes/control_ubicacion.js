module.exports = app => {
    const { verificarToken } = app.middlewares.auth;
    const cu = app.controllers.control_ubicacion;

    app.get('/obtenerClientes', cu.obtenerClientes);

    app.post('/crearCliente', cu.crearCliente);
    
    app.put('/actualizarCliente', cu.actualizarCliente);
    
    
    app.get('/obtenerOrigenes', cu.obtenerOrigenes);
    
    app.post('/crearOrigen', cu.crearOrigen);
    
    app.put('/actualizarOrigen', cu.actualizarOrigen);
    
    
    app.get('/obtenerDestinos', cu.obtenerDestinos);
    
    app.post('/crearDestino', cu.crearDestino);
    
    app.put('/obtenerDestinos', cu.obtenerDestinos);

    
    app.get('/obtenerPlanes/:division', cu.obtenerPlanes);
    
    app.post('/crearPlan', cu.crearPlan);
}