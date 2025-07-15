module.exports = app => {
    
    const Pickandup = app.database.models.PickAndUp;
    // const Sequelize = app.database.Sequelize;
    // const Op = Sequelize.Op;

    app.EconomicoSinProgramacionAnterior = async (req, res, next) => { 

        // console.log(req.body)
                
        let arriboProgramado = await Pickandup.findOne({ 
            attributes: ['idpickandup', 'unidad', 'estatus'],
            where: {
                unidad: req.body.unidad
            },
            order: [['idpickandup', 'DESC']],
            limit: 1,
        });

        // console.log(arriboProgramado.dataValues);

        if(arriboProgramado && arriboProgramado.dataValues.estatus !== 'salida_salida') {
            return res.status(200).json({
                OK: false,
                msg: "Unidad ya programada o en base"
            });
        }

        next();
    }

    return app;
}