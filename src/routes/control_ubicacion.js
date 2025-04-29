module.exports = app => {
    const { verificarToken } = app.middlewares.auth;
    const cu = app.controllers.control_ubicacion;

    app.get('/obtenerClientes', verificarToken, cu.obtenerClientes);


    app.get('/getUbicacionPorEconomico', cu.getUbicacionPorEconomico);
    
    app.get('/getUbicacionPorEconomicoAgrupado', cu.getUbicacionPorEconomicoAgrupado);


    app.post('/crearCliente', verificarToken, cu.crearCliente);
    
    app.put('/actualizarCliente', verificarToken, cu.actualizarCliente);
    
    
    app.get('/obtenerOrigenes', verificarToken, cu.obtenerOrigenes);
    
    app.post('/crearOrigen', verificarToken, cu.crearOrigen);
    
    app.put('/actualizarOrigen', verificarToken, cu.actualizarOrigen);
    
    
    app.get('/obtenerDestinos', verificarToken, cu.obtenerDestinos);
    
    app.post('/crearDestino', verificarToken, cu.crearDestino);
    
    app.put('/obtenerDestinos', verificarToken, cu.obtenerDestinos);

    
    app.get('/obtenerPlanes/:division', verificarToken, cu.obtenerPlanes);
    
    app.post('/crearPlan', verificarToken, cu.crearPlan);
}