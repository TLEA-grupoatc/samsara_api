module.exports = app => {
    const { verificarToken } = app.middlewares.auth;
    const Iti = app.controllers.itinerarios;

    app.get('/getItinerarios', Iti.getItinerarios);
    
    app.get('/getItinerariosDetalle', Iti.getItinerariosDetalle);

    app.get('/getInnerItinerarios', Iti.getInnerItinerarios);

    app.get('/getInnerItinerariosXF', Iti.getInnerItinerariosXF);

    app.get('/itinerarioP', Iti.itinerarioP);

    app.get('/obtenerRecorrido/:idunidad/:start/:end', Iti.obtenerRecorrido);
    
    app.get('/CalculoDeRuta', Iti.CalculoDeRuta);
}