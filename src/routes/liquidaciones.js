module.exports = app => {
    const { verificarToken } = app.middlewares.auth;
    const Liq = app.controllers.liquidaciones;
    const { UniqueLiquidacionInsert } = app.middlewares.liquidaciones;

    app.get('/obtenerPlan/:fechaInicio/:fechaFin', verificarToken, Liq.obtenerPlan);
    
    app.get('/obtenerPlanPorUnidad/:fechaInicio/:fechaFin/:unidad', verificarToken, Liq.obtenerPlanPorUnidad);
    
    app.get('/obtenerPrenomina/:fechas/:operador/:tracto/:status/:local/:usuario/:tipo', verificarToken, Liq.obtenerPrenomina);

    app.get('/obtenerLiquidacion/:fechas/:operador/:folio/:negocio/:status/:pendiente/:usuario/:tipo', verificarToken, Liq.obtenerLiquidacion);

    app.get('/obtenerPrenominaTotal', verificarToken, Liq.obtenerPrenominaTotal);

    app.get('/obtenerLiquidacionTotal', verificarToken, Liq.obtenerLiquidacionTotal);

    app.get('/obtenerLiquidacionXAnno/:anno', Liq.obtenerLiquidacionXAnno);

    app.get('/obtenerPrenominaXAnno/:anno', Liq.obtenerPrenominaXAnno);

    app.get('/resumenLiquidaciones', verificarToken, Liq.resumenLiquidaciones);
    
    app.get('/prenominaDiesel/:tracto', Liq.obtenerPrenominaParaDiesel);

    app.get('/obtenerPrenominaDocumentos/:id/:campo', verificarToken, Liq.obtenerPrenominaDocumentos);

    app.get('/obtenerPrenominaDocumentosRendimientos/:id/:campo', verificarToken, Liq.obtenerPrenominaDocumentosRendimientos);

    app.get('/obtenerPrenominaDocumentosParaFirma/:id/:campo', verificarToken, Liq.obtenerPrenominaDocumentosParaFirma);

    app.delete('/verificarDocumento/:id/:comentario/:usuario', verificarToken, Liq.verificarDocumento);

    app.delete('/rechazarDocumento/:id/:comentario/:usuario/:idpl/:tipo/:familia/:subfamilia', verificarToken, Liq.rechazarDocumento);
    
    app.put('/verificarPrenomina/:id/:campo/:usuario', verificarToken, Liq.verificarPrenomina);
    
    app.put('/verificarLiquidacion/:id/:campo/:usuario', verificarToken, Liq.verificarLiquidacion);
    
    app.put('/enviarAVerificarPrenomina/:id/:estado', verificarToken, Liq.enviarAVerificarPrenomina);
    
    app.put('/enviarAVerificarLiquidacion/:id/:estado', verificarToken, Liq.enviarAVerificarLiquidacion);
    
    app.put('/cancelacionPrenomina/:id_prenomina', verificarToken, Liq.cancelacionPrenomina);
    
    app.put('/cancelacionLiquidacion/:id_liquidacion', verificarToken, Liq.cancelacionLiquidacion);
    
    app.post('/verificarFP', verificarToken, Liq.verificarFP);
    
    app.post('/verificarFA', verificarToken, Liq.verificarFA);
    
    app.post('/registrarPrenomina', verificarToken, Liq.registrarPrenomina);

    app.put('/editarPrenomina/:id_prenomina', verificarToken, Liq.editarPrenomina);
    
    app.post('/cargaDeExtras', verificarToken, Liq.cargaDeExtras);
    
    app.post('/registrarLiquidacion', [verificarToken, UniqueLiquidacionInsert], Liq.registrarLiquidacion);

    app.get('/registrarLiquidacionAutomatica', Liq.registrarLiquidacionAutomatica);
    
    app.put('/editarLiquidacion/:id_liquidacion', verificarToken, Liq.editarLiquidacion);
    
    
    app.get('/obtenerInfoOperador/:operador', verificarToken, Liq.obtenerInfoOperador);





    app.get('/obtenerUsuariosLiquidacion', verificarToken, Liq.obtenerUsuariosLiquidacion);
    
    app.get('/obtenerUsuariosPrenomina', verificarToken, Liq.obtenerUsuariosPrenomina);





    app.get('/obtenerValesGastosLigados/:id_liquidacion', verificarToken, Liq.obtenerValesGastosLigados);

    app.put('/ligarNuevosValesGastos/:id_liquidacion', verificarToken, Liq.ligarNuevosValesGastos);

    app.put('/quitarValesGastosLigadas/:id_liquidacion', verificarToken, Liq.quitarValesGastosLigadas);

    
    
    app.delete('/guardarDiferenciaKM/:id_liquidacion/:diferenciakm', verificarToken, Liq.guardarDiferenciaKM);

    app.delete('/guardarDiferenciaKMPrenomina/:id_prenomina/:diferenciakm', verificarToken, Liq.guardarDiferenciaKMPrenomina);


    app.put('/autorizacionDeCobro/:id_liquidacion', verificarToken, Liq.autorizacionDeCobro);

    app.put('/respuestaDeAutorizacion/:id_liquidacion', verificarToken, Liq.respuestaDeAutorizacion);

    app.post('/cargarDocumentosRendimientos', verificarToken, Liq.cargarDocumentosRendimientos);

    
    
    
    
    app.put('/ligarNuevasPrenominas/:folio', verificarToken, Liq.ligarNuevasPrenominas);

    app.put('/quitarPrenominasLigadas/:folio', verificarToken, Liq.quitarPrenominasLigadas);






    app.delete('/quitarRechazoDocAuto/:id_pd/:id_liquidacion', verificarToken, Liq.quitarRechazoDocAuto);









    app.get('/obtenerLiquidacionesPorEstatus/:estado', verificarToken, Liq.obtenerLiquidacionesPorEstatus);


    app.get('/obtenerPrenominasPorEstatus/:estado', verificarToken, Liq.obtenerPrenominasPorEstatus);


    
    app.put('/agregarDiferenciaHechas/:id_liquidacion', verificarToken, Liq.agregarDiferenciaHechas);



















    
    
    
    app.post('/registrarSoloComentario', verificarToken, Liq.registrarSoloComentario);
    
    
    app.get('/matrixDieselOperador/:ano/:mes/:dia', Liq.matrixDieselOperador);

    app.get('/matrixDieselOperadorReporte/:ano/:mes/:dia', Liq.matrixDieselOperadorReporte);

    app.get('/resumenMatrisOperador/:ano/:mes/:dia', Liq.resumenMatrisOperador);

    app.get('/ultimaFecha/:operador', Liq.ultimaFecha);
    
    app.get('/matrixDieselTracto/:ano/:mes/:dia', verificarToken, Liq.matrixDieselTracto);
    
    
    app.get('/verFirmaLiquidacion/:id', verificarToken, Liq.verFirmaLiquidacion);
    
    app.get('/verPagoLiquidacion/:id', verificarToken, Liq.verPagoLiquidacion);
    
    
    
    app.get('/listaDeFolios/:fechas', verificarToken, Liq.listaDeFolios);
    
    
    app.post('/cargarDocumentosExtra', verificarToken, Liq.cargarDocumentosExtra);

    app.post('/cargarDocumentosExtraLiquidacion', verificarToken, Liq.cargarDocumentosExtraLiquidacion);
    
    
    
    
    app.delete('/reactivarPrenomina/:id_prenomina', verificarToken, Liq.reactivarPrenomina);
    
    app.delete('/reactivarLiquidacion/:id_liquidacion', verificarToken, Liq.reactivarLiquidacion);

    app.delete('/reactivarLiquidacionEnRendimientos/:id_liquidacion', verificarToken, Liq.reactivarLiquidacionEnRendimientos);
    
    
    app.get('/obtenerPrenominaCompleto/:fechas', verificarToken, Liq.obtenerPrenominaCompleto);
    
    
    app.get('/obtenerPrenominasLigadas/:folio', verificarToken, Liq.obtenerPrenominasLigadas);











    app.get('/obtenerTotalLocalidadDiario/:fecha', verificarToken, Liq.obtenerTotalLocalidadDiario);

    app.get('/obtenerTotalEstatusPrenomina/:localidad', verificarToken, Liq.obtenerTotalEstatusPrenomina);


    app.get('/obtenerTotalEstatusLiquidacion/:fecha', verificarToken, Liq.obtenerTotalEstatusLiquidacion);

    app.get('/obtenerTotalEstatusLiquidacionXUnidad/:terminal', verificarToken, Liq.obtenerTotalEstatusLiquidacionXUnidad);







    
    app.post('/cargarEvidenciaRendimientos', verificarToken, Liq.cargarEvidenciaRendimientos);

    app.get('/verEvidenciadeRendimientos/:id', verificarToken, Liq.verEvidenciadeRendimientos);
    
    // Especiales
    
    app.delete('/eliminarPermanentePrenominas/:id_prenomina', verificarToken, Liq.eliminarPermanentePrenominas);
    
    app.delete('/eliminarPermanenteLiquidaciones/:id_liquidacion', verificarToken, Liq.eliminarPermanenteLiquidaciones);
    
    app.delete('/eliminarPermanenteDocumentos/:id_pd', verificarToken, Liq.eliminarPermanenteDocumentos);
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    app.post('/crearRechazoLiquidacion', verificarToken, Liq.crearRechazoLiquidacion);
    app.get('/obtenerRechazosdeLiquidaciones', Liq.obtenerRechazosdeLiquidaciones);
    app.get('/obtenerRechazosdeLiquidacionesXliquidacion/:id_liquidacion', Liq.obtenerRechazosdeLiquidacionesXliquidacion);
    
    
    app.post('/crearRechazoPrenomina', verificarToken, Liq.crearRechazoPrenomina);
    app.get('/obtenerRechazosdePrenominas', Liq.obtenerRechazosdePrenominas);
    app.get('/obtenerRechazosdePrenominasXPrenomina/:id_prenomina', Liq.obtenerRechazosdePrenominasXPrenomina);
    
    
    app.get('/operadoresCriticosLiquidaciones', verificarToken, Liq.operadoresCriticosLiquidaciones);
    
    
    
    
    
    app.get('/operadoresPromedioPago', Liq.operadoresPromedioPago);
    
    
    
    
    
    
    // Backups
    
    
    app.get('/obtenerPrenominaDocumentosBackup', Liq.obtenerPrenominaDocumentosBackup);
    
    
    //

    app.get('/obtenerDocumentosPrenominaTitulo/:titulo', verificarToken, Liq.obtenerDocumentosPrenominaTitulo);
    app.get('/obtenerDocumentosPrenomina/:id_prenomina', verificarToken, Liq.obtenerDocumentosPrenomina);
    app.post('/crearDocumentoPrenomina', verificarToken, Liq.crearDocumentoPrenomina);
    app.put('/actualizarDocumentosPrenomina/:id_dpp', verificarToken, Liq.actualizarDocumentosPrenomina);
    app.put('/ligarDocumentoPrenominaaPre/:id_dpp', verificarToken, Liq.ligarDocumentoPrenominaaPre);
    app.delete('/eliminarDocumentoPrenomina/:id_dpp', verificarToken, Liq.eliminarDocumentoPrenomina);
}