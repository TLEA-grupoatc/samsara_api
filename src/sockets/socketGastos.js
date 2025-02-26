module.exports = app => {
    const gasto = app.database.models.SolicitudGastos;

    app.getSolicitudesGastos = () => {
        gasto.findAll({
            order: [['fecha_solicitud', 'DESC']]
        }).then(result => {
            app.io.emit('SHOW_GASTOS', {Gastos: result});
        }).catch(error => {
            console.log(error);
        });
    };

    gasto.addHook('afterCreate', app.getSolicitudesGastos);
    gasto.addHook('afterUpdate', app.getSolicitudesGastos);    

    return app;
}