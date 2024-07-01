const moment = require('moment');

module.exports = app => {
    const seguimiento = app.database.models.Seguimientos;
    const Sequelize = require('sequelize');
    const Op = Sequelize.Op;

    app.getSeguimientoUsuario = () => {
        var fecha = moment(new Date()).format('YYYY-MM-DD');
        var horainicio = fecha + " 00:00:00";
        var horafin = fecha + " 23:59:59"; 

        seguimiento.findAll({
            where: {
                fechahora: {
                    [Op.between]: [horainicio, horafin]
                }
            },
            order: [
                ['fechahora', 'DESC']
            ]
        }).then(result => {
            app.io.emit('SHOW_SEUS', {SeguimientoUsuario: result});
        })
        .catch(error => {
            console.log(error);
        });
    };

    seguimiento.addHook('afterCreate', app.getSeguimientoUsuario);
    seguimiento.addHook('afterUpdate', app.getSeguimientoUsuario);    

    // app.io.on('connection', (socket) => {
    //     socket.on('GET_SEGUIMIENTOS_USUARIO', (usuario) => {
    //         app.getSeguimientoUsuario(mm);
    //     });
    // });

    return app;
}