module.exports = app => {
    
    const { verificarToken } = app.middlewares.auth;
    const EstructuraNegocio = app.controllers.estructuranegocio;

    app.get('/estructura-negocio/unidades', EstructuraNegocio.obtenerUnidades );
    app.get('/estructura-negocio/detallesunidad/:id_unidad', EstructuraNegocio.obtenerDetallesUnidad );

    app.get('/estructura-negocio/historicoevidencias/:unidad/:camp', EstructuraNegocio.obtenerHistoricoEvidencias );
    
    app.get('/estructura-negocio/coordinadores', EstructuraNegocio.obtenerCoordinadores );
    app.get('/estructura-negocio/todoscoordinadores', EstructuraNegocio.obtenerTodosCoordinadores );
    app.get('/estructura-negocio/clientes', EstructuraNegocio.obtenerClientes );
    app.get('/estructura-negocio/circuitos', EstructuraNegocio.obtenerCircuitos );
    app.get('/estructura-negocio/operadores', EstructuraNegocio.obtenerOperadores );

    app.get('/estructura-negocio/resumendivisiones', EstructuraNegocio.obtenerResumenUnidades );
    app.get('/estructura-negocio/resumenestructuras', EstructuraNegocio.obtenerResumenPorEstructuras );
    
    app.get('/estructura-negocio/obtenerestructura', EstructuraNegocio.obtenerEstructura );
    app.get('/estructura-negocio/obtenergobernadas', EstructuraNegocio.obtenerUnidadesGobernadas );

    app.post('/estructura-negocio/actualizarcampanas', [verificarToken], EstructuraNegocio.actualizarCampanas );

    app.post('/estructura-negocio/crearcoordinador', [verificarToken], EstructuraNegocio.crearNuevoCoordinador );
    app.post('/estructura-negocio/crearcliente', [verificarToken], EstructuraNegocio.crearCliente );
    app.post('/estructura-negocio/crearcircuito', [verificarToken], EstructuraNegocio.crearCircuito );

    app.patch('/estructura-negocio/actualizarunidades', [verificarToken], EstructuraNegocio.actualizarEstructura );
    app.patch('/estructura-negocio/actualizardetalleunidad', [verificarToken], EstructuraNegocio.actualizarUnidad );

    app.patch('/estructura-negocio/actualizarcatalogo', [verificarToken], EstructuraNegocio.actualizarCatalogo );
}