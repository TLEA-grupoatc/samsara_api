module.exports = app => {
    
    const IntercambiosSalida = app.controllers.patio_digital.intercambios_salida;
   
    app.get('/intercambiossalida/:base', IntercambiosSalida.obtenerIntercambiosSalida);
    app.get('/intercambiossalida/busqueda/:searchTerm', IntercambiosSalida.obtenerBusquedaIntercambiosSalida);
    app.post('/intercambiossalida/crear', IntercambiosSalida.crearIntercambioSalida);
    app.get('/intercambiossalida/detallesintercambios/:idpickandup', IntercambiosSalida.obtenerDetallesIntercambiosSalida);

}