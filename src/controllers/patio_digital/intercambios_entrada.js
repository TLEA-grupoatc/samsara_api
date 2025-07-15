// const fs = require('fs');
// const fsx = require('fs-extra')
// const moment = require('moment');
// const path = require('path');

// const puppeteer = require('puppeteer');
// const handlebars = require('handlebars');

module.exports = app => {

    const Pickandup = app.database.models.PickAndUp;
    const Entrada = app.database.models.Entrada;
    const InspeccionEntrada = app.database.models.InspeccionEntrada;
    const InspeccionReporteDanos = app.database.models.InspeccionReporteDanos;
    const PiezasReporteDanos = app.database.models.PiezasReporteDanos;
    
    
    const Sequelize = app.database.sequelize;



    //  app.plantilla = async (req, res) => {

    //     // let t;

    //     try {
    //         // t = await Sequelize.transaction();

    //         // await t.commit();
    //         return res.status(200).json({
    //             OK: true,
    //             msg: '',
    //             result: null
    //         });

    //     } catch (error) {
    //         // if (t) await t.rollback();
    //         console.error('Error al :', error);
    //         return res.status(500).json({ 
    //             OK: false,
    //             msg: error,
    //         });
    //     }
    // }

    return app;
}
