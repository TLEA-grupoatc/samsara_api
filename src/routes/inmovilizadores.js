module.exports = app => {
    const { verificarToken } = app.middlewares.auth;
    const inm = app.controllers.inmovilizadores;
    
    app.get('/obtenerReporteInmovilizadores/:economico', verificarToken, inm.obtenerReporteInmovilizadores);

    app.get('/obtenerResultadosInmovilizadores', inm.obtenerResultadosInmovilizadores);
}