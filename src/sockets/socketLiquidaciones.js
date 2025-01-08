const moment = require('moment');

module.exports = app => {
    const prenomina = app.database.models.Prenominas;
    const liquidacion = app.database.models.Liquidaciones;

    const Sequelize = require('sequelize');
    const { literal } = require('sequelize');
    const Op = Sequelize.Op;

    app.getNowPrenominas = () => {
        var today = new Date();
        var year = today.getFullYear();
        var weekNumber = getWeekNumber(today);
        var weekStartAndEnd1 = getWeekStartAndEnd(year, weekNumber);

        prenomina.findAll({
            // where: {
            //     fecha: {
            //         [Op.between]: [weekStartAndEnd1.start.toISOString().split('T')[0] + ' 00:00:00', weekStartAndEnd1.end.toISOString().split('T')[0] + ' 23:59:59'],
            //     }
            // },
            order: [
                ['fecha', 'DESC']
            ],
            limit: 50
        }).then(result => {
            app.io.emit('SHOW_PRENOMINAS', {Prenominas: result});
        })
        .catch(error => {
        console.log(error);
        });
    };

    app.getNowLiquidaciones = () => {
        const date = new Date();
        const formato = moment(date).format('YYYY-MM-DD');

        liquidacion.findAll({
            // where: {
            //     fecha: {
            //         [Op.between]: [formato + ' 00:00:00', formato + ' 23:59:59']
            //     }
            // },
            order: [
                ['fecha', 'DESC']
            ],
            limit: 50
        }).then(result => {
            app.io.emit('SHOW_LIQUIDACIONES', {Liquidaciones: result});
        })
        .catch(error => {
        console.log(error);
        });
    };

    prenomina.addHook('afterCreate', app.getNowPrenominas);
    prenomina.addHook('afterUpdate', app.getNowPrenominas);
    
    liquidacion.addHook('afterCreate', app.getNowLiquidaciones);
    liquidacion.addHook('afterUpdate', app.getNowLiquidaciones);    
    
    function getWeekNumber(d) {
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));

        var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);

        return weekNo;
    }

    function getWeekStartAndEnd(year, week) {
        var simple = new Date(year, 0, 1 + (week - 1) * 7);
        var dow = simple.getDay();
        var ISOweekStart = simple;

        if(dow <= 4) {   
            ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
        }
        else {
            ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
        }
        
        var ISOweekEnd = new Date(ISOweekStart);
        ISOweekEnd.setDate(ISOweekStart.getDate() + 6);
    
        return {
            start: ISOweekStart,
            end: ISOweekEnd
        };
    }

    return app;
}