module.exports = app => {
    const gasto = app.database.models.SolicitudGastos;
    const origendestino = app.database.models.OrigenesDestinosGastos;
    
    app.getSolicitudesGastos = () => {
        gasto.findAll({
            order: [['fecha_solicitud', 'DESC']]
        }).then(result => {
            app.io.emit('SHOW_GASTOS', {Gastos: result});
        }).catch(error => {
            console.log(error);
        });
    };
    
    app.obtenerOrigenesDestinoGastosNow = () => {  
        origendestino.findAll({
            where: {
                estado: 'A'
            },
            order: [['terminal', 'DESC']],
        }).then(result => {
            app.io.emit('SHOW_CATALOGOS', {OriDes: result});
        })
        .catch(error => {
            console.log(error);
        });
    }

    gasto.addHook('afterCreate', app.getSolicitudesGastos);
    gasto.addHook('afterUpdate', app.getSolicitudesGastos);   

    origendestino.addHook('afterCreate', app.obtenerOrigenesDestinoGastosNow);
    origendestino.addHook('afterUpdate', app.obtenerOrigenesDestinoGastosNow);    

    return app;
}