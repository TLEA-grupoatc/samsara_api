module.exports = app => {
    
    const Mantenimiento = app.controllers.patio_digital.mantenimiento;
   
    app.get('/mantenimiento/obtenercuarentena/:base', Mantenimiento.obtenerCuarentena);
    app.get('/mantenimiento/carrilesespejo/:base', Mantenimiento.obtenerUnidadesCarrilesEspejo);
    app.get('/mantenimiento/carrilestaller/:base', Mantenimiento.obtenerUnidadesCarrilesTaller);
    
    app.get('/mantenimiento/detalles/:idpickandup', Mantenimiento.obtenerDetallesMantenimiento);

    app.get('/mantenimiento/ingresos/:base', Mantenimiento.obtenerIngresosAMantenimiento);
    app.get('/mantenimiento/liberaciones/:base', Mantenimiento.obtenerLiberacionesMantenimiento);

    // app.post('/mantenimiento/refacciones', Mantenimiento.obtenerRefaccionesOT);
    
    app.patch('/mantenimiento/actualizarcarril', Mantenimiento.actualizarMovimientosCarriles);

    app.patch('/mantenimiento/actualizarunidad', Mantenimiento.actualizarUnidadMantenimiento);
    
}