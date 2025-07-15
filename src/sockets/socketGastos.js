const moment = require('moment');

module.exports = app => {
    const gasto = app.database.models.SolicitudGastos;
    const origendestino = app.database.models.OrigenesDestinosGastos;

    app.getSolicitudesGastos = () => {
        var today = new Date();
        const hoy = moment(today).format('YYYY-MM-DD');
        
        gasto.findAll({
            // where: {
            //     fecha_creacion: hoy
            // },
            order: [['fecha_solicitud', 'DESC']]
        }).then(result => {
            app.io.emit('SHOW_GASTOS', {Gastos: result});
        }).catch(error => {
            console.log(error);
        });
    };



    app.getSolicitudesGastosPorDepositar = () => {
        gasto.findAll({
            where: {
                estatus: 'Por Depositar'
            },
            order: ['fecha_solicitud', 'DESC']
        }).then(result => {
            app.io.emit('SHOW_GASTOS_PORDEPOSITAR', { Gastos: result });
        }).catch(error => {
            console.log(error);
        });
    };


    
    app.obtenerOrigenesDestinoGastosNow = () => {  
        origendestino.findAll({
            where: {
                estado: 'A'
            },
            order: [['terminal', 'ASC']],
        }).then(result => {
            app.io.emit('SHOW_CATALOGOS', {OriDes: result});
        })
        .catch(error => {
            console.log(error);
        });
    }

    gasto.addHook('afterCreate', app.getSolicitudesGastos);
    gasto.addHook('afterUpdate', app.getSolicitudesGastos);   

    gasto.addHook('afterCreate', app.getSolicitudesGastosPorDepositar);
    gasto.addHook('afterUpdate', app.getSolicitudesGastosPorDepositar);   

    origendestino.addHook('afterCreate', app.obtenerOrigenesDestinoGastosNow);
    origendestino.addHook('afterUpdate', app.obtenerOrigenesDestinoGastosNow);    

    return app;
}