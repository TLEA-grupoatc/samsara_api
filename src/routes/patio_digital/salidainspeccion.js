module.exports = app => {
    
    const salidaInspeccion = app.controllers.patio_digital.salidainspeccion;
    const { recibirVideo } = app.middlewares.patio_digital.inspeccionsalida;
   
    app.get('/salidainspeccion/obtenerunidadesmtto/:base', salidaInspeccion.obtenerUnidadesMantenimientoSalidaInsp);
    app.get('/salidainspeccion/obtenerunidadenfosasalida/:base', salidaInspeccion.obtenerUnidadEnFosaSalida);

    app.get('/salidainspeccion/obtenerunidadespreliberadas/:base', salidaInspeccion.obtenerUnidadesPreliberadas);
    app.get('/salidainspeccion/obtenerunidadespreliberadas/busqueda/:searchTerm', salidaInspeccion.obtenerBusquedaUnidadesPreliberadas);

    app.get('/salidainspeccion/obtenerunidadesliberadas/:base', salidaInspeccion.obtenerUnidadesLiberadas);
    app.get('/salidainspeccion/obtenerdetalle/:id_inspeccion_entrada', salidaInspeccion.obtenerDetallesInspeccionSalida);

    app.post('/salidainspeccion/confirmaringresofosasalida', salidaInspeccion.confirmarIngresoAFosaSalida);
    app.post('/salidainspeccion/guardarinsp', salidaInspeccion.guardarChecklistInspeccionSalida);

    app.post('/salidainspeccion/liberarunidad', [recibirVideo], salidaInspeccion.guardarLiberacion);

    app.patch('/salidainspeccion/guardarajustesparametros', salidaInspeccion.guardarAjusteParametros);
    
}