module.exports = app => {
    
    const PatioDigital = app.controllers.patio_digital.patio_digital;
   
    app.get('/patiodigital/unidadesenbase', PatioDigital.unidadesEnBase);
    app.get('/patiodigital/agendaingresos', PatioDigital.agendaIngresos);
}