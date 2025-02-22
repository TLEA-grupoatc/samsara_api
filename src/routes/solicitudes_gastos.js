module.exports = app => {
    const { verificarToken } = app.middlewares.auth;
    const cu = app.controllers.solicitudes_gastos;

    // app.get('/obtenerClientesGastos', verificarToken, cu.obtenerClientesGastos);

    // app.post('/crearClienteGastos', verificarToken, cu.crearClienteGastos);
    
    // app.put('/actualizarClienteGastos', verificarToken, cu.actualizarClienteGastos);
    
    
    app.get('/obtenerOrigenesDestinoGastos', verificarToken, cu.obtenerOrigenesDestinoGastos);

    app.get('/obtenerOrigenesDestinoGastosXOD/:terminal/:idorigen/:iddestino', verificarToken, cu.obtenerOrigenesDestinoGastosXOD);




    app.get('/obtenerOrigenesGastos', verificarToken, cu.obtenerOrigenesGastos);
    
    app.post('/crearOrigenGastos', verificarToken, cu.crearOrigenGastos);
    
    app.put('/actualizarOrigenGastos', verificarToken, cu.actualizarOrigenGastos);
    
    
    app.get('/obtenerDestinosGastos', verificarToken, cu.obtenerDestinosGastos);
    
    app.post('/crearDestinoGastos', verificarToken, cu.crearDestinoGastos);
    
    app.put('/actualizarDestinoGastos', verificarToken, cu.actualizarDestinoGastos);
}