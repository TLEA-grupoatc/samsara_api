module.exports = app => {
    
    const IntercambiosEntrada = app.controllers.patio_digital.intercambios_entrada;
   
    app.get('/intercambiosentrada/:base', IntercambiosEntrada.obtenerIntercambiosEntrada);

    app.get('/intercambiosentrada/busqueda/:searchTerm', IntercambiosEntrada.obtenerBusquedaIntercambiosEntrada);

    app.post('/intercambiosentrada/crear', IntercambiosEntrada.crearIntercambioEntrada);
    app.get('/intercambiosentrada/detallesintercambios/:idpickandup', IntercambiosEntrada.obtenerDetallesIntercambiosEntrada);

    
}