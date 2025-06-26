module.exports = app => {
    const { verificarToken } = app.middlewares.auth;
    const ia = app.controllers.modelia;

    app.get('/preguntar/:pregunta', ia.preguntar);

}