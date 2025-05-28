module.exports = app => {
    const { verificarToken } = app.middlewares.auth;
    const ca = app.controllers.conexion_advan;

    app.get('/obtenerBitacoras/:tracto/:operador/:fechaInicio/:fechaFin', verificarToken, ca.obtenerBitacoras);

    app.get('/obtenerDieselReport/:id_unidad/:fechaInicio/:fechaFin', verificarToken, ca.obtenerDieselReport);
    
    app.get('/obtenerGPS/:id_unidad/:fechaInicio/:fechaFin', verificarToken, ca.obtenerGPS);
    

    app.get('/obtenerCombustible/:claves/:fechaInicio/:fechaFin', verificarToken, ca.obtenerCombustible);
    
    app.get('/obtenerCasetas/:claves', verificarToken, ca.obtenerCasetas);

    app.get('/obtenerGastos/:claves', verificarToken, ca.obtenerGastos);


    app.get('/reporteTanquesDiesel', verificarToken, ca.reporteTanquesDiesel);




    app.get('/repopueba', verificarToken, ca.repopueba);




    app.get('/pruebas', ca.pruebas);

    
    app.get('/folios', ca.folios);



    app.get('/listadoOperadores', ca.listadoOperadores);










    app.get('/foliosReparto', ca.foliosReparto);
}