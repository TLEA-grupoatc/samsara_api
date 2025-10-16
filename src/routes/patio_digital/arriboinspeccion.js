module.exports = app => {
    
    const { recibirVideosInspeccionEntrada } = app.middlewares.patio_digital.arriboinspeccion;
    const arriboinspeccion = app.controllers.patio_digital.arriboinspeccion;
   
    app.get('/arriboinspeccion/obtenerentradas/:base', arriboinspeccion.obtenerUnidadesConEntrada);
    app.get('/arriboinspeccion/obtenerunidadenfosa/:base', arriboinspeccion.obtenerUnidadEnFosa);

    app.get('/arriboinspeccion/obtenerunidadesinspeccionadas/:base', arriboinspeccion.obtenerUnidadesinspeccionadas);
    app.get('/arriboinspeccion/obtenerdetalle/:id_inspeccion_entrada', arriboinspeccion.obtenerDetallesInspeccion);

    app.post('/arriboinspeccion/confirmaringresofosa', arriboinspeccion.confirmarIngresoAFosa);
    app.post('/arriboinspeccion/crearreportedanos', arriboinspeccion.crearReporteDanos);
    app.post('/arriboinspeccion/guardarinsp', arriboinspeccion.guardarChecklistInspeccion);

    app.patch('/arriboinspeccion/actualizarevidencias', [recibirVideosInspeccionEntrada], arriboinspeccion.actualizarEvidenciasInspeccionEntrada);
    
}