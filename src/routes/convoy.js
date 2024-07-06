// var cron = require('node-cron');

module.exports = app => {
    const { verificarToken } = app.middlewares.auth;
    const Convoys = app.controllers.convoy;
    
    app.get('/obtenerSnapshotConvoy', Convoys.obtenerSnapshotConvoy);

}