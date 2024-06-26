module.exports = app => {

    const alerta = app.database.models.Alertas;
    
    app.getAlertas = () => {   
        console.log('SoketIO');     
        alerta.findAll({
            // where: {
            //     fecha_creacion: {
            //         [Op.between]: [req.params.fechainicio, req.params.fechafin],
            //     }
            // },
            order: [
                ['fecha_creacion', 'DESC']
            ],
        }).then(result => {            
            app.io.emit('SHOW_ALERTS', {Alertas: result});
        })
        .catch(error => {
            console.log(error);
        });
    };

    alerta.addHook('afterCreate', app.getAlertas);
    alerta.addHook('afterUpdate', app.getAlertas);    

    return app;
}