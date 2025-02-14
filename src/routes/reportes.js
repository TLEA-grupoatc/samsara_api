module.exports = app => {
    const { verificarToken } = app.middlewares.auth;
    const repo = app.controllers.reportes;


    app.get('/reporteDiesel/:fechaInicio/:fechaFin', verificarToken, repo.reporteDiesel);

    app.get('/obtenerReporteSamsara', repo.obtenerReporteSamsara);

    app.get('/obtenerGeoGasolineras', verificarToken, repo.obtenerGeoGasolineras);
}