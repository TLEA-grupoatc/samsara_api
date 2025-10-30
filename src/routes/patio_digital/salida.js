module.exports = app => {
    
    const { verificarToken } = app.middlewares.auth;
    const { RecibirArchivosChecklistSalida } = app.middlewares.patio_digital.salida;

    const Salida = app.controllers.patio_digital.salida;
    

    app.get('/salida-salida/obtenerunidadesenbase/:base', Salida.obtenerUnidadesEnBase);
    app.get('/salida-salida/obtenertodassalidas/:base', Salida.obtenerSalidas);
    app.get('/salida-salida/detallessalida/:id', Salida.ObtenerDetallesSalida);
    app.get('/salida-salida/unidadencaseta/:base', Salida.obtenerUnidadEnCasetaSalida);

    app.post('/salida-salida/crearsalida', [verificarToken], RecibirArchivosChecklistSalida, Salida.crearSalida);
    app.post('/salida-salida/autorizarsalidaconhallazgo', [verificarToken], Salida.autorizarSalidaConHallazgos);
    app.post('/salida-salida/searchByInputSalida', [verificarToken], Salida.ObtenerBusquedaSalida);

    app.patch('/salida-salida/confirmarunidadencaseta', [verificarToken], Salida.confirmarUnidadEnCasetaSalida);
    app.patch('/salida-salida/cancelarunidadcaseta', [verificarToken], Salida.cancelarUnidadEnCaseta);
    app.patch('/salida-salida/autorizarsalidaconomision', [verificarToken], Salida.autorizarSalidaConOmisiones);
    app.patch('/salida-salida/confirmarsalida', [verificarToken], Salida.confirmarSalida);
    
    app.patch('/salida-salida/confirmarsalidatemporal', [verificarToken], Salida.confirmarSalidaTemporal);

}