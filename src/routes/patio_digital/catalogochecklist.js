module.exports = app => {
    
    const CatalogoChecklist = app.controllers.patio_digital.catalogo_checklist;

    app.get('/catalogo-checklist/obtenersolofamilias', CatalogoChecklist.obtenerSoloFamilias);
    app.get('/catalogo-checklist/obtenersolocomponentes', CatalogoChecklist.obtenerSoloComponentes);

    app.get('/catalogo-checklist/obtenerfamilias', CatalogoChecklist.obtenerFamilias);
    app.get('/catalogo-checklist/obtenerfamiliasactivas', CatalogoChecklist.obtenerFamiliasActivas);
    app.patch('/catalogo-checklist/editarfamilia', CatalogoChecklist.actualizarFamiliaComponentes);
    app.post('/catalogo-checklist/crearfamilia', CatalogoChecklist.crearFamilia);
    app.post('/catalogo-checklist/eliminarfamilia', CatalogoChecklist.eliminarFamilia);
    app.post('/catalogo-checklist/activarfamilia', CatalogoChecklist.activarFamilia);
    
    app.get('/catalogo-checklist/obtenerchecklist/:checklist', CatalogoChecklist.obtenerChecklist);
    app.patch('/catalogo-checklist/editarchecklist', CatalogoChecklist.actualizarChecklist);
    
}