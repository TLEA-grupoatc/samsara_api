module.exports = app => {
    
    const PatioDigital = app.controllers.patio_digital.patio_digital;
   
    app.get('/patiodigital/unidadesenbase', PatioDigital.unidadesEnBase);
    app.get('/patiodigital/agendaingresos', PatioDigital.agendaIngresos);
    app.get('/patiodigital/ingresosmotivos', PatioDigital.ingresosPorMotivo);

    app.get('/patiodigital/reporte/salidas', PatioDigital.obtenerReporteAllSalidas);


    app.get('/patiodigital/resumeningresoshoy/:base', PatioDigital.PDIngresosDiaActual);
    

    app.post('/patiodigital/confirmarOmisionProceso', PatioDigital.confirmarOmisionProceso);
}