module.exports = app => {
    const { verificarToken } = app.middlewares.auth;
    const cu = app.controllers.solicitudes_gastos;

    // app.get('/obtenerClientesGastos', verificarToken, cu.obtenerClientesGastos);

    // app.put('/crearClienteGastos', verificarToken, cu.crearClienteGastos);
    
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

    app.post('/crearSolicitudGastosComida', verificarToken, cu.crearSolicitudGastosComida);

    app.get('/verificarExistenciaGastoCasa/:operador/:fecha_creacion', verificarToken, cu.verificarExistenciaGastoCasa);

    app.post('/cargarDocDeposito', verificarToken, cu.cargarDocDeposito);
    
    app.get('/obtenerDeposito/:folio', verificarToken, cu.obtenerDeposito);
    
    app.get('/verificarExistenciaGasto/:operador/:origen/:destino/:fecha_creacion', verificarToken, cu.verificarExistenciaGasto);
    
    app.delete('/solicitudDeGastosAceptarRechazar/:id_gastos/:aprobado_por/:estado', verificarToken, cu.solicitudDeGastosAceptarRechazar);

    app.delete('/solicitudDeGastosAceptarRechazarGerente/:id_gastos/:aprobado_por_gerente/:estado', verificarToken, cu.solicitudDeGastosAceptarRechazarGerente);
   
   
    app.delete('/solicitudDeGastosAceptarGratificaciones/:id_gastos/:aprobado_por', verificarToken, cu.solicitudDeGastosAceptarGratificaciones);
   
    

    app.get('/verificarExistenciaGastoComida/:operador/:fecha_creacion', cu.verificarExistenciaGastoComida);

    app.delete('/enviarProceso/:id_gastos/:estado', verificarToken, cu.enviarProceso);

    app.delete('/cancelarRechazar/:id_gastos/:estado', verificarToken, cu.cancelarRechazar);
    
    app.get('/obtenerOrigenesDestinoGrupo', verificarToken, cu.obtenerOrigenesDestinoGrupo);
    
    app.get('/checarOrigenesDestino/:terminal/:id_origen_gasto/:id_destino_gasto', verificarToken, cu.checarOrigenesDestino);
    
    app.post('/crearOrigenDestino', verificarToken, cu.crearOrigenDestino);
    
    app.put('/actualizarOrigenDestino/:id_origen_destino', verificarToken, cu.actualizarOrigenDestino);
    
    
    app.get('/verTablaAnticiposXOperador/:folio', verificarToken, cu.verTablaAnticiposXOperador);
    
    
    
    
    
    
    app.get('/obtenerSolicitudesDeGastosXEstatus/:estatus', verificarToken, cu.obtenerSolicitudesDeGastosXEstatus);
    
    
    
    
    
    
    
    
    
    
    
    app.get('/obtenerUltimaLiquidacionPagada', verificarToken, cu.obtenerUltimaLiquidacionPagada);
    
    
    
    
    
    app.get('/obtenerSolicitudesDeGastosPorDepositar', verificarToken, cu.obtenerSolicitudesDeGastosPorDepositar);
    
    
    app.put('/actualizarSolicitudGastos/:id_gastos', verificarToken, cu.actualizarSolicitudGastos);
    
    
    
    app.put('/rechazarValeNomina/:id_gastos', verificarToken, cu.rechazarValeNomina);
    
    
    
    
    
    app.get('/obtenerVerArchivo/:folio/:id_doc_gastos', verificarToken, cu.obtenerVerArchivo);
    
    
    
    
    
    app.delete('/eliminarPermanenteGasto/:id_gastos', verificarToken, cu.eliminarPermanenteGasto);








    app.get('/obtenerGastosParaLiquidaciones/:fecha_solicitud/:operador/:economico', verificarToken, cu.obtenerGastosParaLiquidaciones);















    app.get('/obtenerSolicitudesDeGastosXAuxiliar/:solicitante', verificarToken, cu.obtenerSolicitudesDeGastosXAuxiliar);






    app.get('/obtenerGastosXEstatusParaLigar/:estatus', verificarToken, cu.obtenerGastosXEstatusParaLigar);
}