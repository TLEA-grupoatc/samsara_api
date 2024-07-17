// var cron = require('node-cron');

module.exports = app => {
    const { verificarToken } = app.middlewares.auth;
    const Convoys = app.controllers.convoy;
    
    app.get('/obtenerConvoys', Convoys.obtenerConvoys);

    app.get('/obtenerUnidadesConvoy/:id_convoy', Convoys.obtenerUnidadesConvoy);
    
    app.post('/crearConvoys', Convoys.crearConvoys);

    app.put('/actualizarConvoy/:id_convoy', Convoys.actualizarConvoy);
    
    app.delete('/eliminarConvoy/:id_convoy', Convoys.eliminarConvoy);

    app.post('/agregarUnidadConvoy', Convoys.agregarUnidadConvoy);

    app.put('/actualizarUnidadConvoy/:id_unidadconvoy', Convoys.actualizarUnidadConvoy);

    app.delete('/eliminarUnidadConvoy/:id_unidadconvoy', Convoys.eliminarUnidadConvoy);

    app.post('/obtenerSnapshotConvoy', Convoys.obtenerSnapshotConvoy);
}