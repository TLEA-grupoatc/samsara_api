module.exports = app => {
    const { verificarToken } = app.middlewares.auth;
    const as = app.controllers.auditaria_seguridad;

    app.get('/obtenerAuditoriasSeguridad', verificarToken, as.obtenerAuditoriasSeguridad);

    app.post('/crearAuditoriaSeguridad', as.crearAuditoriaSeguridad);
    
    app.put('/actualizarAuditoriaSeguridad/:id_as', as.actualizarAuditoriaSeguridad);
    
    app.delete('/eliminarAuditoriaSeguridad/:id_as', as.eliminarAuditoriaSeguridad);
}