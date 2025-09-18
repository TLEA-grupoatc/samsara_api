module.exports = app => {
    
    const { verificarToken } = app.middlewares.auth;
    const { EconomicoSinProgramacionAnterior, checkLimiteMantenimiento } = app.middlewares.patio_digital.agenda;

    const Agenda = app.controllers.patio_digital.agenda;

    app.get('/calendario-arribos/obtener-programaciones/:base', Agenda.obtenerArribosProgramados);
    app.get('/calendario-arribos/ctdagendasemana/:base/:fechaInicio/:fechaFin', Agenda.ctdUnidadesProgramadasSemanaActual);
    app.get('/calendario-arribos/resumenmotivos/:base', Agenda.obtenerResumenAgendasPorMotivo);

    app.get('/calendario-arribos/vista-general/:base/:fechaInicio/:fechaFin', Agenda.dataVistaGeneral);

    app.get('/calendario-arribos/obtenerunidades', Agenda.pd_ag_obtenerUnidades);
    app.get('/calendario-arribos/obtenerclientes', Agenda.pd_ag_obtenerClientes);
    app.get('/calendario-arribos/obteneroperadores', Agenda.pd_ag_obtenerOperadores);
    app.get('/calendario-arribos/obtenermotivos', Agenda.pd_ag_obtenerMotivos);

    // app.get('/calendario-arribos/anularagenda', Agenda.anularAgendaAutomatico);

    app.get('/calendario-arribos/arribosexportable', Agenda.arribosExportable);
    app.get('/calendario-arribos/estatusunidades', Agenda.estatusUnidades);
    
    app.post('/calendario-arribos/programar-arribo', [verificarToken, EconomicoSinProgramacionAnterior, checkLimiteMantenimiento], Agenda.programarArribo);
    app.post('/calendario-arribos/obtener-programaciones-busqueda', Agenda.obtenerBusqueda);
    
    app.patch('/calendario-arribos/actualizar-arribo', [verificarToken, checkLimiteMantenimiento], Agenda.actualizarArribo);

}