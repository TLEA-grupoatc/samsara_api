// var cron = require('node-cron');

module.exports = app => {
    const { verificarToken } = app.middlewares.auth;
    const Convoys = app.controllers.convoy;
    
    app.get('/obtenerConvoys/:fecha', verificarToken, Convoys.obtenerConvoys);

    app.get('/obtenerUnidadesConvoy/:id_convoy', verificarToken, Convoys.obtenerUnidadesConvoy);
    
    app.post('/crearConvoys', verificarToken, Convoys.crearConvoys);

    app.put('/actualizarConvoy/:id_convoy', verificarToken, Convoys.actualizarConvoy);
    
    app.delete('/eliminarConvoy/:id_convoy', verificarToken, Convoys.eliminarConvoy);

    app.post('/agregarUnidadConvoy', verificarToken, Convoys.agregarUnidadConvoy);

    app.put('/actualizarUnidadConvoy/:id_unidadconvoy', verificarToken, Convoys.actualizarUnidadConvoy);

    app.delete('/eliminarUnidadConvoy/:id_unidadconvoy', verificarToken, Convoys.eliminarUnidadConvoy);

    app.post('/obtenerSnapshotConvoy', verificarToken, Convoys.obtenerSnapshotConvoy);
}