const dotenv = require('dotenv').config();
const moment = require('moment');
const _ = require('lodash');

module.exports = app => {
    const Samsara = require("@api/samsara-dev-rel");
    Samsara.auth(process.env.KEYSAM);

    const Sequelize = require('sequelize');
    const { literal } = require('sequelize');
    const Op = Sequelize.Op;

    app.reporteDiesel = async (req, res) => {
        var reporteD = [];
        const tags = ['4531263', '3907109', '4236332', '4399105', '4343814', '4244687'];
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
                    })
                    .then(async result => {
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
            })         
            
            percent = result['data']['data'][0]['fuelPercents'].length > 0 ? result['data']['data'][0]['fuelPercents'][result['data']['data'][0]['fuelPercents'].length -1]['value'] : 0;

            return percent;
        } 
        catch(error) {
            console.log(error.message);
            return 0;
        }
    }
      
    return app;
}