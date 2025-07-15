module.exports = app => {
    
    const { recibirReporteDanos } = app.middlewares.patio_digital.salida;
    const arriboinspeccion = app.controllers.patio_digital.arriboinspeccion;
   
    app.get('/arriboinspeccion/obtenerentradas/:base', arriboinspeccion.obtenerUnidadesConEntrada);
    app.get('/arriboinspeccion/obtenerunidadenfosa/:base', arriboinspeccion.obtenerUnidadEnFosa);

    app.post('/arriboinspeccion/confirmaringresofosa', arriboinspeccion.confirmarIngresoAFosa);

    app.post('/arriboinspeccion/crearreportedanos', recibirReporteDanos, arriboinspeccion.crearReporteDanos)
    
}