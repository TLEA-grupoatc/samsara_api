module.exports = app => {
    const { verificarToken } = app.middlewares.auth;
    const Iti = app.controllers.itinerarios;

    app.get('/getItinerarios', Iti.getItinerarios);

    app.get('/itinerarioP', Iti.itinerarioP);
    
    
    app.get('/CalculoDeRuta', Iti.CalculoDeRuta);
}