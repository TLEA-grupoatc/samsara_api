module.exports = app => {
    
    const { verificarToken } = app.middlewares.auth;
    const { EconomicoSinProgramacionAnterior } = app.middlewares.patio_digital.agenda;

    const Agenda = app.controllers.patio_digital.agenda;

    app.get('/calendario-arribos/obtener-programaciones/:base/:fechaInicio/:fechaFin', Agenda.obtenerArribosProgramados);

    app.get('/calendario-arribos/vista-general/:base/:fechaInicio/:fechaFin', Agenda.dataVistaGeneral);

    app.get('/calendario-arribos/opciones-formulario', Agenda.opcionesParaFormulario)
    
    app.post('/calendario-arribos/programar-arribo', [verificarToken, EconomicoSinProgramacionAnterior], Agenda.programarArribo);
    
    app.patch('/calendario-arribos/actualizar-arribo', [verificarToken], Agenda.actualizarArribo);
    
    app.get('/calendario-arribos/pruebaAdvan', Agenda.pruebaAdvan);

    app.post('/calendario-arribos/obtener-programaciones-busqueda', Agenda.obtenerBusqueda);

}