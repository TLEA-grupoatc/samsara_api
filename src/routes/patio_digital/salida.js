module.exports = app => {
    
    const { verificarToken } = app.middlewares.auth;
    const { RecibirArchivosChecklistSalida } = app.middlewares.patio_digital.salida;

    const Salida = app.controllers.patio_digital.salida;
    

    app.get('/salida-salida/obtenerunidadesenbase/:base', Salida.obtenerUnidadesEnBase);
    app.get('/salida-salida/obtenertodassalidas/:base', Salida.obtenerSalidas);
    app.get('/salida-salida/detallessalida/:id', Salida.ObtenerDetallesSalida);
    app.get('/salida-salida/unidadencaseta/:base', Salida.obtenerUnidadEnCasetaSalida);

    app.post('/salida-salida/crearsalida', RecibirArchivosChecklistSalida, Salida.crearSalida);
    app.post('/salida-salida/autorizarsalidaconhallazgo', Salida.autorizarSalidaConHallazgos);
    app.post('/salida-salida/searchByInput', Salida.ObtenerBusquedaSalida);

    app.patch('/salida-salida/confirmarunidadencaseta', Salida.confirmarUnidadEnCaseta);
    app.patch('/salida-salida/cancelarunidadcaseta', Salida.cancelarUnidadEnCaseta);
    app.patch('/salida-salida/autorizarsalidaconomision', Salida.autorizarSalidaConOmisiones);
    app.patch('/salida-salida/confirmarsalida', Salida.confirmarSalida);
}