const dotenv = require('dotenv').config();
const moment = require('moment');
const _ = require('lodash');

module.exports = app => {
    const Samsara = require("@api/samsara-dev-rel");
    Samsara.auth(process.env.KEYSAM);

    const reporte = app.database.models.Reportes;

    const Sequelize = require('sequelize');
    const { literal } = require('sequelize');
    const Op = Sequelize.Op;

    app.obtenerSnapshotConvoy = (req, res) => {
        var fecha = moment(new Date()).format('YYYY-MM-DDTHH:mm:ss');
        var paraValidadfecha = moment(new Date()).format('YYYY-MM-DD');
        var fechahora = fecha + 'Z';

        Samsara.getVehicleStats({
            time: fechahora,    
            tagIds: '4343814,4244687,4236332,4399105,4531263,3907109',
            types: 'ecuSpeedMph,gps,obdOdometerMeters'
        }).then(result => {
            result['data']['data'].forEach(async (element) => {
                var validarfecha = element['ecuSpeedMph'].time.split('T')[0];
                var miakm = Number(element['ecuSpeedMph'].value) * 1.609;

                var miakmparavalidad = miakm.toFixed();

                if(paraValidadfecha == validarfecha && miakmparavalidad >= 8) {
                    let nuevoReporte = new reporte({
                        id_unidad: element.id,
                        unidad: element.name,
                        fechahorakm: element['ecuSpeedMph'].time,
                        km: miakm.toFixed(),
                        fechahoragps: element['gps'].time,
                        latitud: element['gps'].latitude,
                        longitud: element['gps'].longitude,
                        location: element['gps'].reverseGeo.formattedLocation,
                        fechaodo: element['obdOdometerMeters'].time,
                        odometer: element['obdOdometerMeters'].value
                    });
    
                    await reporte.create(nuevoReporte.dataValues, {
                        fields: [
                            'id_unidad',
                            'unidad',
                            'fechahorakm',
                            'km',
                            'fechahoragps',
                            'latitud',
                            'longitud',
                            'location',
                            'fechaodo',
                            'odometer'
                        ]
                    })
                    .then(result => {})
                    .catch(error => {
                        console.log(error.message);
                    });
                }
            });

            res.json({
                OK: true,
                fechayhora: fechahora,
            });
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    return app;
}