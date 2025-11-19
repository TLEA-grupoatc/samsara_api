module.exports = app => {
    const { verificarToken } = app.middlewares.auth;
    const acc = app.controllers.accidentes;

    app.get('/obtenerAccidentes', acc.obtenerAccidentes);
    
    app.post('/crearRegistroAccidente', verificarToken, acc.crearRegistroAccidente);
    
    app.put('/actualizarRegistroAccidente', verificarToken, acc.actualizarRegistroAccidente);

}