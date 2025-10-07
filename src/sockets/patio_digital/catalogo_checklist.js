const moment = require('moment');

module.exports = app => {

    const CatalogoFamilia = app.database.models.CatalogoFamilia;
    const CatalogoComponente = app.database.models.CatalogoComponente;

    const Sequelize = app.database.sequelize;
    const io = app.io;

    app.getPdCatalgoFamiliasActivos = async (req, res) => {
        try {

            const familias = await CatalogoFamilia.findAll({
                order: [['activo', 'DESC']],
                include: [{
                    model: CatalogoComponente,
                    separate: true,
                    order: [['activo', 'DESC']],
                }],
            });
            
            io.emit('PD_CATALOGO_FAMILIAS_ACTUALIZADAS', {result: familias});

        } catch (error) {
            console.error('Error al obtener pd catalogo familias activas:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    return app;
}
