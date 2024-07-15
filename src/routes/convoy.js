// var cron = require('node-cron');

module.exports = app => {
    const { verificarToken } = app.middlewares.auth;
    const Convoys = app.controllers.convoy;
    
    app.get('/obtenerConvoys', Convoys.obtenerConvoys);

    app.get('/obtenerUnidadesConvoy/:id_convoy', Convoys.obtenerUnidadesConvoy);
    
    app.post('/crearConvoys', Convoys.crearConvoys);

    app.post('/obtenerSnapshotConvoy', Convoys.obtenerSnapshotConvoy);
}