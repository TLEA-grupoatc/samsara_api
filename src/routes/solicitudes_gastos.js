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
    
    
    

    
    app.get('/obtenerSolicitudesDeGastos', verificarToken, cu.obtenerSolicitudesDeGastos);
    
    app.post('/crearSolicitudGastos', verificarToken, cu.crearSolicitudGastos);

    app.post('/cargarDocDeposito', verificarToken, cu.cargarDocDeposito);

    app.get('/obtenerDeposito/:folio', verificarToken, cu.obtenerDeposito);

    app.get('/verificarExistenciaGasto/:operador/:origen/:destino/:fecha_creacion', verificarToken, cu.verificarExistenciaGasto);
    
    app.delete('/solicitudDeGastosAceptarRechazar/:id_gastos/:aprobado_por/:estado', verificarToken, cu.solicitudDeGastosAceptarRechazar);
}