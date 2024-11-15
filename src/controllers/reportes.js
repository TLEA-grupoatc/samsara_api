const dotenv = require('dotenv').config();
const moment = require('moment');
const _ = require('lodash');

module.exports = app => {
    const geogaso = app.database.models.GeoGaso;

    const Samsara = require("@api/samsara-dev-rel");
    Samsara.auth(process.env.KEYSAM);

    const Sequelize = require('sequelize');
    const { literal } = require('sequelize');
    const Op = Sequelize.Op;

    app.reporteDiesel = async (req, res) => {
        var reporteD = [];
        const tags = ['4531263', '3907109', '4236332', '4399105', '4343814', '4244687'];
        // const tags = ['4531263'];
        const dateArray = getDatesArray(req.params.fechaInicio, req.params.fechaFin);
            
            for(let index = 0; index < dateArray.length; index++) {
                console.log(dateArray[index]);
                
                const formato = dateArray[index].toISOString().split('T')[0];
                for(let index = 0; index < tags.length; index++) {
                    console.log(tags[index]);

                    await Samsara.getFuelEnergyVehicleReports({
                        startDate: formato + 'T00:00:00.00-06:00',
                        endDate: formato + 'T23:59:59.59-06:00',
                        tagIds: tags[index],
                        energyType: 'fuel'
                    }).then(async result => {
                        var resu = result['data']['data']['vehicleReports'];
                        
                        for(let i = 0; i < resu.length; i++) {
                            var procentaje = await getPercent(formato, resu[i]['vehicle']['id']);
                            console.log(procentaje);
                            
                            let rd = ({
                                tracto: resu[i]['vehicle']['name'],
                                fecha: formato,
                                diesel: resu[i]['fuelConsumedMl'] / 1000,
                                procentajeTanque: procentaje
                            });
            
                            reporteD.push(rd);
                        }
                    })
                    .catch(error => {
                        console.log(error.message);
                    });
                }
            }

        res.json({
            OK: true,
            Reporte: reporteD,
        });
    }






    function getDatesArray(startDate, endDate) {
        const dates = [];
        let currentDate = new Date(startDate);
      
        while(currentDate <= new Date(endDate)) {
          dates.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }
      
        return dates;
    }

    async function getPercent(day, idtracto) {
        try {
            var percent = 0;

            const result =  await Samsara.getVehicleStatsHistory({
                startTime: day + 'T00:00:00Z',
                endTime: day + 'T23:59:59Z',
                vehicleIds: idtracto,
                types: 'fuelPercents'
            });
            
            // console.log(result['data']['data'][0]['fuelPercents']);
            var data = result['data']['data'][0]['fuelPercents'];
              
              const filterByInterval = (data, intervalInMinutes = 10) => {
                const result = [];
                let previousTime = new Date(data[0].time);
              
                result.push(data[0]);
              
                for(let i = 1; i < data.length; i++) {
                  const currentTime = new Date(data[i].time);
                  const difference = (currentTime - previousTime) / (1000 * 60);
              
                  if(difference >= intervalInMinutes) {
                    result.push(data[i]);
                    previousTime = currentTime;
                  }
                }
              
                return result;
              };
              
              const filteredData = filterByInterval(data);

              console.log(filteredData);
              
            
            
            // percent = result['data']['data'][0]['fuelPercents'].length > 0 ? result['data']['data'][0]['fuelPercents'][result['data']['data'][0]['fuelPercents'].length -1]['value'] : 0;
            percent = filteredData['data']['data'][0]['fuelPercents'].length > 0 ? filteredData['data']['data'][0]['fuelPercents'][filteredData['data']['data'][0]['fuelPercents'].length -1]['value'] : 0;

            return percent;
        } 
        catch(error) {
            console.log(error.message);
            return 0;
        }
    }


    app.obtenerGeoGasolineras = (req, res) => {
        geogaso.findAll({
            order: [
                ['fecha_entrada', 'DESC']
            ],
        }).then(result => {
            res.json({
                OK: true,
                Reporte: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

      
    return app;
}