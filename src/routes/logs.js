module.exports = app => {
    const { verificarToken } = app.middlewares.auth;
    const lg = app.controllers.logs;

    app.post('/insertaLoginLog', verificarToken, lg.insertaLoginLog);

    app.post('/insertRegisterLog', verificarToken, lg.insertRegisterLog);
}