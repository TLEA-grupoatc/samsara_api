const moment = require("moment");

module.exports = app => {
    
    const Pickandup = app.database.models.PickAndUp;
    // const Sequelize = app.database.Sequelize;
    // const Op = Sequelize.Op;

    app.EconomicoSinProgramacionAnterior = async (req, res, next) => { 

        // console.log(req.body)
        try {

            let arriboProgramado = await Pickandup.findOne({ 
                attributes: ['idpickandup', 'unidad', 'estatus'],
                where: {
                    unidad: req.body.unidad
                },
                order: [['idpickandup', 'DESC']],
                limit: 1,
            });


            if(arriboProgramado && arriboProgramado.dataValues.estatus !== 'salida_salida') {
                return res.status(200).json({
                    OK: false,
                    msg: "Unidad ya programada o en base"
                });
            }
            
            next();

        } catch (error) {
            console.error('Error en middleware check sin programacion anterior:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.checkLimiteMantenimiento = async (req, res, next) => { 

        try {

            const sequelize = app.database.sequelize;

            const id_motivo_programacion_arribo = req.body.id_motivo_programacion_arribo;
            const fecha_arribo_programado =  req.body.fecha_arribo_programado;
            const fecha_arribo_reprogramado =  req.body.fecha_arribo_reprogramado;

            const cancelada = req.body.cancelada;

            let fecha = fecha_arribo_reprogramado?.split(' ')[0] ?? fecha_arribo_programado?.split(' ')[0];

            fecha = moment(fecha).format('YYYY-MM-DD')
            // console.log(fecha)
                    
            if( !cancelada && fecha && (id_motivo_programacion_arribo === 1 || id_motivo_programacion_arribo === 2)){
                const unidadesprogramadas = await sequelize.query(
                    `
                        SELECT
                            COUNT(*) AS programados
                        FROM
                            pd_agenda A
                        LEFT JOIN (
                            SELECT
                                fk_agenda,
                                MAX(fecha_arribo_reprogramado) AS ultima_reprogramacion,
                                MAX(cumplimiento_arribo_reprogramacion) AS ultimo_cumplimiento -- Por si hay varios
                            FROM
                                pd_reprogramaciones_arribos
                            GROUP BY
                                fk_agenda
                        ) RA ON A.id_agenda = RA.fk_agenda
                        WHERE
                            DATE(
                                GREATEST(
                                    A.fecha_arribo_programado,
                                    IFNULL(RA.ultima_reprogramacion, '0000-00-00')
                                )
                            ) = :fecha
                            AND (fk_motivo_programacion_arribo = 1 OR fk_motivo_programacion_arribo = 2)
                            AND (A.cumplimiento_arribo <> 'cancelado' OR A.cumplimiento_arribo IS NULL)
                            AND (RA.ultimo_cumplimiento <> 'cancelado' OR RA.ultimo_cumplimiento IS NULL);
                    `,
                    {
                        replacements: {
                            fecha: fecha,
                        },
                        type: sequelize.QueryTypes.SELECT,
                    }
                );

                const cantidadUnidades = unidadesprogramadas[0].programados;

                if(cantidadUnidades >= 15){
                    return res.status(200).json({ 
                        OK: false,
                        msg: 'Limite alcanzado de programaciones para mantenimiento de dia seleccionado',
                        result: cantidadUnidades,
                    });
                }
                // console.log(unidadesprogramadas)
            }

            next();
            
        } catch (error) {
            console.error('Error en middleware check limite mtto:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    return app;
}
