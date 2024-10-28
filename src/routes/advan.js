module.exports = app => {
    const { verificarToken } = app.middlewares.auth;
    const ca = app.controllers.conexion_advan;

    app.get('/obtenerBitacoras/:tracto/:operador/:fechaInicio/:fechaFin', ca.obtenerBitacoras);

    app.get('/obtenerDieselReport/:id_unidad/:fechaInicio/:fechaFin', ca.obtenerDieselReport);
    
    app.get('/obtenerGPS/:id_unidad/:fechaInicio/:fechaFin', ca.obtenerGPS);
    

    app.get('/obtenerCombustible/:claves/:fechaInicio/:fechaFin', ca.obtenerCombustible);
    
    app.get('/obtenerCasetas/:claves', ca.obtenerCasetas);

    app.get('/obtenerGastos/:claves', ca.obtenerGastos);


    app.get('/pruebas', ca.pruebas);
}