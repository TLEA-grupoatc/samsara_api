module.exports = app => {
    const { verificarToken } = app.middlewares.auth;
    const inm = app.controllers.inmovilizadores;
    
    app.get('/obtenerReporteInmovilizadores', inm.obtenerReporteInmovilizadores);

    app.get('/obtenerReporteInmovilizadoresxEco/:economico', verificarToken, inm.obtenerReporteInmovilizadoresxEco);

    app.get('/obtenerResultadosInmovilizadores', inm.obtenerResultadosInmovilizadores);
}