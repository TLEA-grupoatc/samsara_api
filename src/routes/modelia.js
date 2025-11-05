module.exports = app => {
    const { verificarToken } = app.middlewares.auth;
    const ia = app.controllers.modelia;

    app.get('/preguntarLiquidaciones/:pregunta', ia.preguntarLiquidaciones);
    
    app.get('/preguntarPonderacionOp/:pregunta', ia.preguntarPonderacionOp);
}