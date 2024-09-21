const dotenv = require('dotenv').config();
const moment = require('moment');
const _ = require('lodash');

module.exports = app => {
    // const Samsara = require("@api/samsara-dev-rel");
    // Samsara.auth(process.env.KEYSAM);


    // app.obtenerVehiculos = (req, res) => {
    //     unidad.findAll({
    //         order: [
    //             ['name', 'DESC']
    //         ],
    //     }).then(result => {
    //         res.json({
    //             OK: true,
    //             Unidades: result
    //         })
    //     })
    //     .catch(error => {
    //         res.status(412).json({
    //             msg: error.message
    //         });
    //     });
    // }


    return app;
}