module.exports = app => {
    const { verificarToken } = app.middlewares.auth;
    const sk = app.controllers.slack;
    
    app.get('/encontrarCanal', verificarToken, sk.encontrarCanal);

    // app.post('/recibirAlgo', verificarToken, sk.recibirAlgo);
}