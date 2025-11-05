module.exports = app => {
    const { verificarToken } = app.middlewares.auth;
    const as = app.controllers.auditaria_seguridad;

    app.get('/obtenerAuditoriasSeguridad', verificarToken, as.obtenerAuditoriasSeguridad);

    app.post('/crearAuditoriaSeguridad', verificarToken, as.crearAuditoriaSeguridad);
    
    app.put('/actualizarAuditoriaSeguridad/:id_as', verificarToken, as.actualizarAuditoriaSeguridad);
    
    app.delete('/eliminarAuditoriaSeguridad/:id_as', verificarToken, as.eliminarAuditoriaSeguridad);
}