module.exports = app => {

    const { RecibirEvidenciaCheckListEntrada } = app.middlewares.patio_digital.entrada
    const Entrada = app.controllers.patio_digital.entrada;
    const { verificarToken } = app.middlewares.auth;

    app.get('/entrada/agendaDiaActual/:base', Entrada.obtenerProgramacionAgenda);
    app.get('/entrada/obtenertodasentradas/:base', Entrada.obtenerEntradas);
    app.get('/entrada/obtenerdetallesentrada/:id', Entrada.obtenerDetallesEntrada);
    app.get('/entrada/catalogooperadores', Entrada.opcionesFormulario);
    app.get('/entrada/checkprogramacion/:unidad', Entrada.checkUnidadProgramada);

    app.get('/entrada/unidadencaseta/:base', Entrada.obtenerUnidadEnCaseta);
    
    app.post('/entrada/searchByInputEntrada', [verificarToken], Entrada.obtenerBusquedaEntrada);
    app.post('/entrada/crearinit', [verificarToken], Entrada.crearInitEntrada);
    app.post('/entrada/createAInput', [verificarToken, RecibirEvidenciaCheckListEntrada], Entrada.createNewInto);
    
    app.post('/entrada/firmasupervisor', [verificarToken], Entrada.guardarFirmaSupervisorEntrada);
    
    
    app.get('/entrada/pendientesregreso/:base', Entrada.obtenerUnidadesPendientesRegreso);
    app.patch('/entrada/confirmarregreso', [verificarToken], Entrada.confirmarRegresoDeSalida);

    app.delete('/entrada/unidadencasetacancelada/:idpickandup/:id_agenda', [verificarToken], Entrada.unidadEnCasetaCancelada);
}