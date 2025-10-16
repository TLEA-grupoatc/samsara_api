module.exports = app => {
    
    const IntercambiosEntrada = app.controllers.patio_digital.intercambios_entrada;
   
    app.get('/intercambiosentrada/:base', IntercambiosEntrada.obtenerIntercambiosEntrada);
    app.post('/intercambiosentrada/crear', IntercambiosEntrada.crearIntercambioEntrada);
    app.get('/intercambiosentrada/detallesintercambios/:idpickandup', IntercambiosEntrada.obtenerDetallesIntercambiosEntrada);

}