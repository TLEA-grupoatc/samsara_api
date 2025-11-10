const path = require('path');
const fs = require('fs');
const moment = require("moment");

module.exports = app => {

    const Pickandup = app.database.models.PickAndUp;
    const IntercambiosEntrada = app.database.models.IntercambiosEntrada;
    const HallazgosIntercambios = app.database.models.HallazgosIntercambios;
    const CatalogoComponente = app.database.models.CatalogoComponente;
    const CatalogoFamilia = app.database.models.CatalogoFamilia;
    
    const Sequelize = app.database.sequelize;

    const io = app.io;

    const saveBase64File = (base64Data, type, id, sucesivo) => {
    
      const evidenciaEntregadasPath = path.join(__dirname, '../../../uploads/fotos_intercambios');
    
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

    if(id){
        filename = `${id}_${sucesivo}_${type}_${DateFormated}.${extension}`
    } else {
        filename = `${type}_${DateFormated}.${extension}`
    }
      
      const filePath = path.join(evidenciaEntregadasPath, filename);
      fs.writeFileSync(filePath, buffer);
      return filename;
    }

    app.obtenerIntercambiosEntrada = async (req, res) => {

        const base = req.params.base;

        try {
            const query = `
                SELECT
                    PAU.idpickandup,
                    PAU.unidad,
                    PAU.rem_1,
                    IE.id_intercambios_entrada,
                    IE.pqs_vencimiento,
                    IE.pqs_presion,
                    IE.pqs_seguro,
                    IE.espuma_vencimiento,
                    IE.espuma_presion,
                    IE.espuma_seguro,
                    IE.fecha_intercambio,
                    IE.observaciones
                FROM
                    pd_intercambios_entrada AS IE
                    LEFT JOIN pd_pickandup AS PAU ON IE.id_intercambios_entrada = PAU.fk_intercambios_entrada
                WHERE
                    PAU.base = :base
                ORDER BY
                    IE.id_intercambios_entrada DESC
                LIMIT 25;
            `;

            const result = await Sequelize.query(query, {
                replacements: { base },
                type: Sequelize.QueryTypes.SELECT
            });

            res.status(200).json({
                OK: true,
                result
            });

        } catch (error) {
            console.error('Error al obtener intercambios:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.obtenerBusquedaIntercambiosEntrada = async (req, res) => {

        const searchTerm = req.params.searchTerm;

        try {
            const query = `
                SELECT
                    PAU.idpickandup,
                    PAU.unidad,
                    PAU.rem_1,
                    IE.id_intercambios_entrada,
                    IE.pqs_vencimiento,
                    IE.pqs_presion,
                    IE.pqs_seguro,
                    IE.espuma_vencimiento,
                    IE.espuma_presion,
                    IE.espuma_seguro,
                    IE.fecha_intercambio,
                    IE.observaciones
                FROM
                    pd_intercambios_entrada AS IE
                    LEFT JOIN pd_pickandup AS PAU ON IE.id_intercambios_entrada = PAU.fk_intercambios_entrada
                WHERE
                    PAU.unidad LIKE :searchTerm
                ORDER BY
                    IE.id_intercambios_entrada DESC;
            `;

            const result = await Sequelize.query(query, {
                replacements: { searchTerm: `%${searchTerm}%` },
                type: Sequelize.QueryTypes.SELECT
            });

            res.status(200).json({
                OK: true,
                result
            });

        } catch (error) {
            console.error('Error al obtener intercambios:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.obtenerIntercambiosOmitidosEntrada = async (req, res) => {

        const base = req.params.base;

        try {
            const queryOmisiones = `
                SELECT
                    PAU.idpickandup,
                    PAU.base,
                    PAU.division,
                    PAU.unidad_negocio,
                    OP.comentario AS comentario_omision,
                    OP.autorizo,
                    OP.evidencia_autorizacion,
                    OP.usr_omision,
                    nombre_usuario
                FROM
                    pd_pickandup PAU
                    LEFT JOIN pd_omision_proceso OP ON PAU.fk_omision_intercambios_entrada = OP.id_omision_proceso
                    LEFT JOIN usuarios U ON OP.usr_omision = U.id_usuario
                WHERE
                    PAU.base = :base;
            `;

            const resultOmisiones = await Sequelize.query(queryOmisiones, {
                replacements: { base },
                type: Sequelize.QueryTypes.SELECT
            });

            res.status(200).json({
                OK: true,
                result: resultOmisiones
            });

        } catch (error) {
            console.error('Error al obtener intercambios omitidos:', error);
            return res.status(500).json({
                OK: false,
                msg: error,
            });
        }
    }

    app.crearIntercambioEntrada = async (req, res) => {

        let t;

        try {
            t = await Sequelize.transaction();

            let { checklist, idpickandup, placas_tracto, rem_1, rem_2, placas_rem_1, placas_rem_2, ...intercambio } = req.body;

            if(intercambio.firma_intercambista){
                intercambio.firma_intercambista = saveBase64File(intercambio.firma_intercambista, 'firma_intercambista');
            }

            if(intercambio.firma_operador){
                intercambio.firma_operador = saveBase64File(intercambio.firma_operador, 'firma_operador');
            }

            if(intercambio.foto_tarjeta_iave){
                intercambio.foto_tarjeta_iave = saveBase64File(intercambio.foto_tarjeta_iave, 'foto_tarjeta_iave');
            }

            const intercambioCreado = await IntercambiosEntrada.create(intercambio, { transaction: t });

            let sucesivo = 0;

            if(checklist.length > 0){
                checklist.forEach((check) => {
                    check.fk_intercambios_entrada = intercambioCreado.id_intercambios_entrada
                    if(check.foto_hallazgo_1){
                        check.foto_hallazgo_1 = saveBase64File(check.foto_hallazgo_1, 'foto_hallazgo_1', intercambioCreado.id_intercambios_entrada, sucesivo);
                        sucesivo++;
                    }
    
                    if(check.foto_hallazgo_2){
                        check.foto_hallazgo_2 = saveBase64File(check.foto_hallazgo_2, 'foto_hallazgo_2', intercambioCreado.id_intercambios_entrada, sucesivo);
                        sucesivo++;
                    }
                });
    
                await HallazgosIntercambios.bulkCreate(checklist, { transaction: t } );
            }

            const unidadEnCaseta = await Pickandup.findOne({
                attributes: ['estatus', 'fk_entrada', 'fk_intercambios_entrada'],
                where: {
                    idpickandup: idpickandup
                }
            });
            
            if(!unidadEnCaseta.fk_entrada) {
                estatus = 'en_caseta_entrada'
            } else {
                estatus = 'entrada'
            }
            
            await Pickandup.update(
                {
                    fk_intercambios_entrada: intercambioCreado.id_intercambios_entrada,
                    estatus: estatus,
                    placas_tracto: placas_tracto,
                    rem_1: rem_1,
                    rem_2: rem_2,
                    placas_rem_1: placas_rem_1,
                    placas_rem_2: placas_rem_2,
                },
                {
                    where: { idpickandup: idpickandup },
                    transaction: t
                }
            )

            await t.commit();

            io.emit('CASETA_ENTRADA_ACTUALIZADA');
            io.emit('INTERCAMBIO_CREADO');
            return res.status(200).json({
                OK: true,
                msg: '',
                result: null
            });

        } catch (error) {
            console.error('Error al crear intercambio:', error);
            if (t) await t.rollback();
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.obtenerDetallesIntercambiosEntrada = async (req, res) => {

        // let t;

        try {
            // t = await Sequelize.transaction();

            const idpickandup = req.params.idpickandup;

            const intercambio = await Pickandup.findByPk(
                idpickandup,
                {
                    attributes: [
                        'unidad',
                        'division',
                        'unidad_negocio',
                        'rem_1',
                        'placas_rem_1',
                        'rem_2',
                        'placas_rem_2',
                        'operador'
                    ],
                    include: [
                        {
                            model: IntercambiosEntrada,
                            include: [
                                {
                                    model: HallazgosIntercambios,
                                    include: [
                                        {
                                            model: CatalogoFamilia,
                                            attributes: ['nombre_familia']
                                        },
                                        {
                                            model: CatalogoComponente,
                                            attributes: ['nombre_componente']
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            )

            // await t.commit();
            return res.status(200).json({
                OK: true,
                msg: 'Detalles de intercambio obtenido correctamente',
                result: intercambio
            });

        } catch (error) {
            // if (t) await t.rollback();
            console.error('Error al obtener detalles intercambios entrada:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.obtenerIntercambiosReporteAccesorios = async (req, res) => {

        try {

            const query = `
                SELECT
                    PAU.idpickandup,
                    PAU.base,
                    PAU.unidad,
                    PAU.division,
                    PAU.unidad_negocio,
                    INTER.fecha_hora_inicio,
                    INTER.fecha_hora_fin,
                    INTER.cinchos,
                    INTER.malla,
                    INTER.antifaz,
                    INTER.cojin,
                    INTER.liga,
                    INTER.llave_lona,
                    INTER.barra
                FROM
                    pd_intercambios_entrada INTER
                    LEFT JOIN pd_pickandup PAU ON INTER.id_intercambios_entrada = PAU.fk_intercambios_entrada
                WHERE 
                    PAU.unidad IS NOT NULL
                    AND INTER.fecha_hora_inicio IS NOT NULL
                    ORDER BY fecha_hora_inicio;
            `;

            const result = await Sequelize.query(query, {
                type: Sequelize.QueryTypes.SELECT
            });

            return res.status(200).json(result);

        } catch (error) {
            console.error('Error al obtener reporte accesorios:', error);
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
