module.exports = app => {

    const { RecibirEvidenciaCheckListEntrada } = app.middlewares.patio_digital.entrada
    const Entrada = app.controllers.patio_digital.entrada;

    app.get('/entrada/agendaDiaActual/:base', Entrada.ObtenerProgramacionAgenda);
    app.get('/entrada/obtenertodasentradas/:base', Entrada.ObtenerEntradas);
    app.get('/entrada/obtenerdetallesentrada/:id', Entrada.ObtenerDetallesEntrada);
    app.get('/entrada/catalogooperadores', Entrada.opcionesFormulario);
    app.get('/entrada/checkprogramacion/:unidad', Entrada.checkUnidadProgramada);

    app.get('/entrada/unidadencaseta/:base', Entrada.obtenerUnidadEnCaseta);
    
    app.post('/entrada/searchByInputEntrada', Entrada.ObtenerBusquedaEntrada);
    app.post('/entrada/crearinit', Entrada.crearInitEntrada);
    app.post('/entrada/createAInput', RecibirEvidenciaCheckListEntrada, Entrada.CreateNewInto);
    
    app.delete('/entrada/unidadencasetacancelada/:idpickandup/:id_agenda', Entrada.unidadEnCasetaCancelada);
}