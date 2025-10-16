const path = require('path');
const fs = require('fs');
const moment = require("moment");

module.exports = app => {
    
    const Pickandup = app.database.models.PickAndUp;
    const OmisionProceso = app.database.models.OmisionProcesos;

    const Salida = app.database.models.Salida;

    const Sequelize = app.database.sequelize;
    const io = app.io;

    const saveBase64File = (base64Data, type) => {
        
        const evidenciaEntregadasPath = path.join(__dirname, '../../../uploads/autorizaciones_omisiones');
    
        if (!fs.existsSync(evidenciaEntregadasPath)) {
            fs.mkdirSync(evidenciaEntregadasPath, { recursive: true });
        }
    
        const matches = base64Data.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
        if (!matches || matches.length !== 3) {
            throw new Error('Formato base64 inválido');
        }
    
        const DateFormated = moment().format('DD.MM.YYYY_hh.mm');
    
        const mimeType = matches[1];
        const extension = mimeType.split('/')[1];
    
        const buffer = Buffer.from(matches[2], 'base64');

        let filename;

        filename = `${type}_${DateFormated}.${extension}`
        
            
        const filePath = path.join(evidenciaEntregadasPath, filename);
        fs.writeFileSync(filePath, buffer);
        return filename;
    }

    //#region Reportes
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

    app.ingresosPorMotivo = async (req, res) => {

        try {
            const ingresos = await Sequelize.query(
            `
                SELECT
                    CASE
                        WHEN PAU.base = 1 THEN 'SALINAS'
                        WHEN PAU.base = 2 THEN 'SALAMANCA'
                        ELSE PAU.base
                    END AS base,
                    PAU.unidad,
                    -- PAU.estatus,
                    PAU.division,
                    PAU.unidad_negocio,
                    CLI.cliente,
                    DATE(ENT.fecha_entrada) AS fecha_entrada,
                    MOT.motivo AS motivo_agenda,
                    ENT.motivo_ingreso AS motivo_entrada
                FROM 
                    pd_pickandup PAU
                    LEFT JOIN pd_entrada ENT ON PAU.fk_entrada = ENT.id_entrada
                    LEFT JOIN cliente CLI ON PAU.fk_cliente = CLI.id_cliente
                    LEFT JOIN pd_agenda AGE ON PAU.fk_agenda = AGE.id_agenda
                    LEFT JOIN pd_motivo_programacion_arribo MOT ON AGE.fk_motivo_programacion_arribo = MOT.id_motivo_programacion_arribo
                WHERE
                    ENT.fecha_entrada IS NOT NULL
                    AND DATE(ENT.fecha_entrada) BETWEEN DATE_SUB(CURDATE(), INTERVAL 14 DAY) AND CURDATE();
            `,
            { type: Sequelize.QueryTypes.SELECT }
            );

            return res.status(200).json(ingresos);

        } catch (error) {
            console.error('Error al obtener Agenda - ingresos:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.PDIngresosDiaActual = async (req, res) => {

        try {

            const { base } = req.params;

            const ingresos = await Sequelize.query(
            `
                SELECT
                    PAU.unidad,
                    PAU.division,
                    PAU.unidad_negocio,
                    CLI.cliente,
                    MPA.motivo AS motivo_agenda,
                    DATE(ENT.fecha_entrada) AS fecha_entrada
                FROM 
                    pd_pickandup PAU
                    LEFT JOIN pd_entrada ENT ON PAU.fk_entrada = ENT.id_entrada
                    LEFT JOIN cliente CLI ON PAU.fk_cliente = CLI.id_cliente
                    LEFT JOIN pd_agenda AGE ON PAU.fk_agenda = AGE.id_agenda
                    LEFT JOIN pd_motivo_programacion_arribo MPA ON AGE.fk_motivo_programacion_arribo = MPA.id_motivo_programacion_arribo
                WHERE
                    ENT.fecha_entrada IS NOT NULL
                    AND DATE(ENT.fecha_entrada) = CURRENT_DATE()
                    AND PAU.base = :base;
            `,
            {
                type: Sequelize.QueryTypes.SELECT,
                replacements: { base: base }
            }
            );

            return res.status(200).json({
                OK: true,
                result: ingresos
            });

        } catch (error) {
            console.error('Error al obtener Agenda - ingresos:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    //#endregion

    //#region Omisiones proceso

    app.confirmarOmisionProceso = async (req, res) => {

        let t;

        try {
            t = await Sequelize.transaction();

            let { idpickandup, ...omisionData } = req.body;

            if(omisionData.evidencia_autorizacion){
                omisionData.evidencia_autorizacion = saveBase64File(omisionData.evidencia_autorizacion, 'autorizacion_omision');
            }

            const omisionRegistrada = await OmisionProceso.create(omisionData, { transaction: t });

            let fk;
            let estatus;

            switch (omisionData.modulo) {
                case 'intercambios_entrada':

                    fk = 'fk_omision_intercambios_entrada';
                    const unidadEnCaseta = await Pickandup.findOne({
                        attributes: ['estatus', 'fk_entrada', 'fk_intercambios_entrada'],
                        where: {
                            idpickandup: idpickandup
                        },
                        transaction: t
                    });
                    
                    if(!unidadEnCaseta.fk_entrada) {
                        estatus = 'en_caseta_entrada'
                    } else {
                        estatus = 'entrada'
                    }

                    break;

                case 'inspeccion_entrada':
                    fk = 'fk_omision_inspeccion_entrada';
                    break;

                case 'mantenimiento_entrada':
                    fk = 'fk_omision_mantenimiento';
                    break;

                case 'inspeccion_salida':
                    fk = 'fk_omision_inspeccion_salida';
                    break;

                case 'intercambios_salida':
                    fk = 'fk_omision_intercambios_salida';
                    const unidadEnCasetaSalida = await Pickandup.findOne({
                        attributes: ['estatus', 'fk_salida', 'fk_intercambios_salida'],
                        include: [
                            {
                                model: Salida,
                                attributes: ['estatus'],
                            }
                        ],
                        where: {
                            idpickandup: idpickandup
                        },
                        transaction: t
                    });
                    
                    if(!unidadEnCasetaSalida?.fk_salida) {
                        estatus = 'en_caseta_salida';
                    } else {
                        estatus = unidadEnCasetaSalida?.Salida?.estatus;
                    }
                    break;
            
                default:
                    break;
            }

             await Pickandup.update(
                {
                    [fk]: omisionRegistrada.id_omision_proceso,
                    estatus: estatus
                },
                {
                    where: { idpickandup: idpickandup },
                    transaction: t
                }
            );

            await t.commit();

            switch (omisionData.modulo) {
                case 'intercambios_entrada':
                    io.emit('OMISION_INTERCAMBIOS_ENTRADA');
                    break;

                case 'inspeccion_entrada':
                    
                    break;

                case 'mantenimiento_entrada':
                    
                    break;

                case 'inspeccion_salida':
                    
                    break;

                case 'intercambios_salida':
                    io.emit('OMISION_INTERCAMBIOS_SALIDA');
                    break;
            
                default:
                    break;
            }

            return res.status(200).json({
                OK: true,
                msg: 'Proceso omitido correctamente',
                result: null
            });

        } catch (error) {
            if (t) await t.rollback();
            console.error('Error al crear omision de proceso:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    //#endregion

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
