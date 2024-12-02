module.exports = app => {
    
    const liquidacion = app.database.models.Liquidaciones;
    const Sequelize = app.database.Sequelize;
    const Op = Sequelize.Op;

    app.UniqueLiquidacionInsert = async (req, res, next) => {    
        
        let registro = await liquidacion.findOne({ 
            where: Sequelize.and({
                folio: req.body.folio
            })
        });

        if(registro) {
            return res.status(422).json({
                OK: false,
                msg: {
                    error: {
                        fields:{
                            folio: req.body.folio
                        }
                    }
                }
            });
        }        

        next();
    }

    return app;
}