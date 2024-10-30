module.exports = app => {
    const { verificarToken } = app.middlewares.auth;
    const repo = app.controllers.reportes;


    app.get('/reporteDiesel/:fechaInicio/:fechaFin', repo.reporteDiesel);
}