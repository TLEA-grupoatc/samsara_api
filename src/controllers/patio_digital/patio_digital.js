
module.exports = app => {

    const Sequelize = app.database.sequelize;

    app.unidadesEnBase = async (req, res) => {

        try {
            const unidadesEnBase = await Sequelize.query(
            `
                SELECT
                    CASE
                        WHEN PAU.base = 1 THEN 'SALINAS'
                        WHEN PAU.base = 2 THEN 'SALAMANCA'
                    END AS base,
                    PAU.estatus,
                    PAU.unidad AS economico,
                    ENT.fecha_entrada,
                    PAU.fk_entrada,
                    PAU.fk_salida
                FROM
                    pd_pickandup PAU
                    LEFT JOIN pd_entrada ENT ON PAU.fk_entrada = ENT.id_entrada
                WHERE
                    PAU.fk_entrada IS NOT NULL
                    AND PAU.fk_salida IS NULL
                    AND PAU.estatus != 'salida_salida'
                ORDER BY
                    fecha_entrada DESC;
            `,
            { type: Sequelize.QueryTypes.SELECT }
            );

            return res.status(200).json({
                OK: true,
                msg: 'Unidades en base obtenidas correctamente',
                result: unidadesEnBase
            });

        } catch (error) {
            console.error('Error al obtener unidades en base:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.agendaIngresos = async (req, res) => {

        try {
            const unidadesEnBase = await Sequelize.query(
            `
                SELECT
                    CASE
                        WHEN PAU.base = 1 THEN 'SALINAS'
                        WHEN PAU.base = 2 THEN 'SALAMANCA'
                    END AS base,
                    PAU.unidad AS economico,
                    U.tag AS unidad,
                    COR.nombre_coor,
                    DATE(AGE.fecha_arribo_programado) AS fecha_arribo_programado,
                    AGE.creado_el AS agenda_creada,
                    ENT.fecha_entrada
                FROM
                    pd_pickandup PAU
                    LEFT JOIN unidad U ON U.name = PAU.unidad 
                    LEFT JOIN coordinador COR ON U.idcoordinador = COR.id_coordinador
                    LEFT JOIN pd_agenda AGE ON PAU.fk_agenda = AGE.id_agenda
                    LEFT JOIN pd_entrada ENT ON PAU.fk_entrada = ENT.id_entrada;
            `,
            { type: Sequelize.QueryTypes.SELECT }
            );

            return res.status(200).json({
                OK: true,
                msg: 'Agenda - Ingresos obtenidos correctamente',
                result: unidadesEnBase
            });

        } catch (error) {
            console.error('Error al obtener Agenda - ingresos:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

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
