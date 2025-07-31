module.exports = app => {

    const { RecibirEvidenciaCheckListEntrada } = app.middlewares.patio_digital.entrada
    const Entrada = app.controllers.patio_digital.entrada;
    const { verificarToken } = app.middlewares.auth;

    app.get('/entrada/agendaDiaActual/:base', Entrada.ObtenerProgramacionAgenda);
    app.get('/entrada/obtenertodasentradas/:base', Entrada.ObtenerEntradas);
    app.get('/entrada/obtenerdetallesentrada/:id', Entrada.ObtenerDetallesEntrada);
    app.get('/entrada/catalogooperadores', Entrada.opcionesFormulario);
    app.get('/entrada/checkprogramacion/:unidad', Entrada.checkUnidadProgramada);

    app.get('/entrada/unidadencaseta/:base', Entrada.obtenerUnidadEnCaseta);
    
    app.post('/entrada/searchByInputEntrada', [verificarToken], Entrada.ObtenerBusquedaEntrada);
    app.post('/entrada/crearinit', [verificarToken], Entrada.crearInitEntrada);
    app.post('/entrada/createAInput', [verificarToken, RecibirEvidenciaCheckListEntrada], Entrada.CreateNewInto);
    
    app.delete('/entrada/unidadencasetacancelada/:idpickandup/:id_agenda', [verificarToken], Entrada.unidadEnCasetaCancelada);
}