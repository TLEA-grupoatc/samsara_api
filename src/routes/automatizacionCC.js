module.exports = app => {
    const { verificarToken } = app.middlewares.auth;
    const autcc = app.controllers.automatizacionCC;
    
    app.get('/comidasAutomaticas', autcc.comidasAutomaticas);
}