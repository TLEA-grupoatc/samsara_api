const dotenv = require('dotenv').config();
const moment = require('moment');
const _ = require('lodash');

module.exports = app => {
    const Samsara = require("@api/samsara-dev-rel");
    Samsara.auth(process.env.KEYSAM);

    const reporteconvoy = app.database.models.ReportesConvoy;

    const Sequelize = require('sequelize');
    const { literal } = require('sequelize');
    const Op = Sequelize.Op;

    app.obtenerSnapshotConvoy = (req, res) => {
        var unidades = req.body.unidades;
        var convoy = req.body.convoy;

        var registros = [];
        var distancias = [];

        Samsara.getVehicleStats({vehicleIds: unidades,types: 'gps'}).then(result => {
            result['data']['data'].forEach(async (element) => {

                    let nuevoReporte = ({
                        id_unidad: element.id,
                        unidad: element.name,
                        latitud: element['gps'].latitude,
                        longitud: element['gps'].longitude,
                        location: element['gps'].reverseGeo.formattedLocation
                    });

                    registros.push(nuevoReporte);

                    // console.log(registros);


    
                    // await reporteconvoy.create(nuevoReporte.dataValues, {
                    //     fields: [
                    //         'id_unidad',
                    //         'unidad',
                    //         'fechahorakm',
                    //         'km',
                    //         'fechahoragps',
                    //         'latitud',
                    //         'longitud',
                    //         'location',
                    //         'fechaodo',
                    //         'odometer'
                    //     ]
                    // })
                    // .then(result => {})
                    // .catch(error => {
                    //     console.log(error.message);
                    // });
                
            });

            var ordenadocoor = registros.sort(compare);

            for(let i = 0; i < ordenadocoor.length; i++) {
                if(i + 1 < ordenadocoor.length) {
                    let distances = ({
                        unidades: ordenadocoor[i].unidad + ' - ' + ordenadocoor[i + 1].unidad,
                        distancia: saberdistancia(ordenadocoor[i].latitud, ordenadocoor[i].longitud, ordenadocoor[i + 1].latitud, ordenadocoor[i + 1].longitud)
                    });

                    distancias.push(distances);
                } 
                else {
                    let distances = ({
                        unidades: ordenadocoor[i].unidad + ' - ' + ordenadocoor[0].unidad,
                        distancia: saberdistancia(ordenadocoor[i].latitud, ordenadocoor[i].longitud, ordenadocoor[0].latitud, ordenadocoor[0].longitud)
                    });

                    distancias.push(distances);
                }
            }

            res.json({
                OK: true,
                Convoy: convoy,
                ReporteConvoy: distancias
            });
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    //crear modelo aqui de conboy y unidades convoys
    
    saberdistancia = (lat1, lon1, lat2, lon2) => {
        const toRad = angle => (angle * Math.PI) / 180;
        
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const calculo = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2); 
        const resultado = 2 * Math.atan2(Math.sqrt(calculo), Math.sqrt(1 - calculo)); 
        const distanciakm = 6371 * resultado;
        
        return distanciakm.toFixed(2);
    }

    compare = (a, b ) => {
        if( b.latitud < a.latitud ){
          return -1;
        }
        if( b.latitud > a.latitud ){
          return 1;
        }

        return 0;
    }

    return app;
}