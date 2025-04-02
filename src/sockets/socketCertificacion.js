module.exports = app => {
    const ruta = app.database.models.Rutas;

    app.getNowRutas = () => {
        ruta.findAll({
            order: [['ruta', 'ASC']],
        }).then(result => {
            app.io.emit('SHOW_CERTIFICACIONES', { Rutas: result });
        }).catch(error => {
            console.log(error);
        });
    };

    ruta.addHook('afterCreate', app.getNowRutas);
    ruta.addHook('afterUpdate', app.getNowRutas);

    return app;
}