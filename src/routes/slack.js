module.exports = app => {
    const { verificarToken } = app.middlewares.auth;
    const sk = app.controllers.slack;
    
    app.get('/encontrarCanal', sk.encontrarCanal);

    // app.post('/recibirAlgo', sk.recibirAlgo);
}