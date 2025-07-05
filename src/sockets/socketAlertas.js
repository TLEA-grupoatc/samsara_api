const moment = require('moment');

module.exports = app => {

    const alerta = app.database.models.Alertas;
    const Sequelize = require('sequelize');
    const { literal } = require('sequelize');
    const Op = Sequelize.Op;

    app.getAlertas = () => {
        var fecha = moment(new Date()).format('YYYY-MM-DD');
        var horainicio = fecha + " 00:00:00";
        var horafin = fecha + " 23:59:59";

        alerta.findAll({
            where: {
                eventTime: {
                    [Op.between]: [horainicio, horafin],
                }
            },
            order: [
                ['eventTime', 'DESC']
            ]
        }).then(result => {            
            app.io.emit('SHOW_ALERTS', {Alertas: result});
        })
        .catch(error => {
            console.log(error);
        });
    };

    app.getAlertasAplicadas = () => {
        var fecha = moment(new Date()).format('YYYY-MM-DD');
        var horainicio = fecha + " 00:00:00";
        var horafin = fecha + " 23:59:59";

        alerta.findAll({
            where: {
                eventTime: {
                    [Op.between]: [horainicio, horafin],
                },
                aplica: 1
            },
            order: [
                ['eventTime', 'DESC']
            ]
        }).then(result => {            
            app.io.emit('SHOW_ALERTS_APLICADAS', {Alertas: result});
        })
        .catch(error => {
            console.log(error);
        });
    };

    alerta.addHook('afterCreate', app.getAlertas);
    alerta.addHook('afterUpdate', app.getAlertas);    

    alerta.addHook('afterCreate', app.getAlertasAplicadas);
    alerta.addHook('afterUpdate', app.getAlertasAplicadas);    

    return app;
}