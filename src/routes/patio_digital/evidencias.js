module.exports = app => {
    
    const { RecibirArchivosActualizarEvidencias } = app.middlewares.patio_digital.evidencias;

    const Evidencias = app.controllers.patio_digital.evidencias;
   
    app.get('/evidencias/obtenerentradas/:base', Evidencias.obtenerUnidadesMantenimientoEv);
    app.get('/evidencias/obtenerunidadesyevidencias/:base', Evidencias.obtenerUnidadesyEvidencias);

    app.post('/evidencias/searchByInput', Evidencias.ObtenerBusquedaEvidencias);
    app.post('/evidencias/confirmarentradaamtto', Evidencias.confirmarEntradaAMtto);

    app.patch('/evidencias/actualizarevidencias/:idpickandup/:id_evidencias', [RecibirArchivosActualizarEvidencias], Evidencias.actualizarEvidencias);
}