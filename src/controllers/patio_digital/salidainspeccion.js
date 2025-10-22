const fs = require('fs');
const moment = require('moment');
const path = require('path');
const { Op } = require('sequelize');



module.exports = app => {

    const Pickandup = app.database.models.PickAndUp;
    const Entrada = app.database.models.Entrada;

    const InspeccionSalida = app.database.models.InspeccionSalida;
    const InspeccionesInspSalida = app.database.models.InspeccionesInspSalida;
    const HallazgosInspSalida = app.database.models.HallazgosInspEntrada;

    const CatalogoFamilia = app.database.models.CatalogoFamilia;
    const CatalogoComponente = app.database.models.CatalogoComponente;
    const Usuarios = app.database.models.Usuarios;
    
    const Sequelize = app.database.sequelize;

    const io = app.io;

    const saveBase64File = (base64Data, type, id, sucesivo) => {
        
          const evidenciaEntregadasPath = path.join(__dirname, '../../../uploads/fotos_inspeccion_salida');
        
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

    const saveBase64FileLiberadas = (base64Data, type) => {
        
          const evidenciaEntregadasPath = path.join(__dirname, '../../../uploads/ev_inspeccion_salida');
        
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
    
          const filename =`${type}_${DateFormated}.${extension}`
              
          const filePath = path.join(evidenciaEntregadasPath, filename);
          fs.writeFileSync(filePath, buffer);
          return filename;
    }

    app.obtenerUnidadesMantenimientoSalidaInsp = async (req, res) => {
        
        const { base } = req.params;

        try {

            const unidades = await Pickandup.findAll({
                attributes: [
                    'idpickandup',
                    'unidad',
                    'estatus',
                    'fk_entrada',
                    'fk_intercambios_entrada',
                    'fk_omision_intercambios_entrada'
                ],
                where: {
                    estatus: {
                        [Op.in]: ['mantenimiento', 'evidencias']
                    },
                    base: base,
                },
            });


            return res.status(200).json({
                OK: true,
                mantenimiento: unidades,
            });
            
        } catch (error) {
            console.error('Error en obtener unidades en mantenimiento salida inspeccion:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.obtenerUnidadEnFosaSalida = async (req, res) => {
        const { base } = req.params;

        try {
            const [unidad] = await Sequelize.query(
                `
                SELECT 
                    PAU.idpickandup,
                    PAU.unidad,
                    PAU.division,
                    PAU.unidad_negocio,
                    PAU.operador,
                    INPS_S.id_inspeccion_salida,
                    INPS_S.creado_el,
                    INPS_S.actualizado_el,
                    INPS_S.evidencia_ajuste_parametros_1,
                    INPS_S.evidencia_ajuste_parametros_2,
                    PAU.rem_1
                FROM 
                    pd_pickandup PAU
                    LEFT JOIN pd_inspeccion_salida INPS_S ON PAU.fk_inspeccion_salida = INPS_S.id_inspeccion_salida
                WHERE
                    PAU.estatus = 'en_fosa_inspeccion_salida'
                    AND PAU.base = :base
                `,
                {
                    replacements: { base },
                    type: Sequelize.QueryTypes.SELECT
                }
            );

            if (!unidad) {
                return res.status(200).json({
                    OK: true,
                    msg: 'Sin unidad en fosa',
                    result: null
                });
            }

            return res.status(200).json({
                OK: true,
                msg: 'Unidad en fosa obtenida correctamente',
                result: unidad
            });
            
        } catch (error) {
            console.error('Error al obtener unidad en fosa:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.obtenerDetallesInspeccionSalida = async (req, res) => {

        try {

            const { id_inspeccion_salida } = req.params;

            const detalles = await InspeccionSalida.findByPk(
                id_inspeccion_salida,
                {
                    attributes: ['id_inspeccion_salida', 'fk_insp_salida'],
                    include: [
                        {
                            model: Pickandup,
                            attributes: ['unidad', 'base', 'unidad_negocio', 'division'],
                        },
                        {
                            model: InspeccionesInspSalida,
                            as: 'InspSal',
                            attributes: ['checklist', 'tipo_checklist', 'fecha_hora_inicio', 'fecha_hora_fin', 'fk_usuario_cre'],
                            include: [
                                {
                                    model: Usuarios,
                                    attributes: ['nombre_empleado']
                                },
                                {
                                    model: HallazgosInspSalida,
                                    include: [
                                        {
                                            model: CatalogoFamilia,
                                            attributes: ['id_familia', 'nombre_familia']
                                        },
                                        {
                                            model: CatalogoComponente,
                                            attributes: ['id_componente', 'nombre_componente']
                                        }
                                    ]
                                }
                            ]
                        },
                    ],
                    // where: { id_inspeccion_entrada: id_inspeccion_entrada }
                }
            );

            return res.status(200).json({
                OK: true,
                msg: 'Obtenido unidades inspeccionadas correctamente',
                result: detalles
            });

        } catch (error) {
            console.error('Error al obtener Unidades inspeccionadas:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.obtenerUnidadesPreliberadas = async (req, res) => {

        try {

            const { base } = req.params;

            const inspecciones = await Sequelize.query(
                `
                SELECT
                    INSP_SAL.id_inspeccion_salida,
                    PAU.idpickandup,
                    PAU.unidad,
                    PAU.rem_1,
                    PAU.rem_2,
                    PAU.operador,
                    PAU.unidad_negocio,
                    PAU.division,
                    INSP_ENT.creado_el AS fecha_inspeccion_entrada,
                    INSP_SAL.fecha_preliberacion
                FROM
                    pd_inspeccion_salida INSP_SAL
                    LEFT JOIN pd_pickandup PAU ON INSP_SAL.id_inspeccion_salida = PAU.fk_inspeccion_salida
                    LEFT JOIN pd_inspeccion_entrada INSP_ENT ON PAU.fk_inspeccion_entrada = INSP_ENT.id_inspeccion_entrada
                WHERE
                    PAU.base = :base
                    AND PAU.estatus = 'preliberada_inspeccion';
                `,
                {
                    replacements: { base },
                    type: Sequelize.QueryTypes.SELECT
                }
            );


            return res.status(200).json({
                OK: true,
                msg: 'Obtenido unidades inspeccionadas correctamente',
                result: inspecciones
            });

        } catch (error) {
            console.error('Error al obtener detalles unidad inspeccionada:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.obtenerBusquedaUnidadesPreliberadas = async (req, res) => {

        try {

            const { searchTerm } = req.params;

            const inspecciones = await Sequelize.query(
                `
                SELECT
                    INSP_SAL.id_inspeccion_salida,
                    PAU.idpickandup,
                    PAU.unidad,
                    PAU.rem_1,
                    PAU.rem_2,
                    PAU.operador,
                    PAU.unidad_negocio,
                    PAU.division,
                    INSP_ENT.creado_el AS fecha_inspeccion_entrada,
                    INSP_SAL.fecha_preliberacion
                FROM
                    pd_inspeccion_salida INSP_SAL
                    LEFT JOIN pd_pickandup PAU ON INSP_SAL.id_inspeccion_salida = PAU.fk_inspeccion_salida
                    LEFT JOIN pd_inspeccion_entrada INSP_ENT ON PAU.fk_inspeccion_entrada = INSP_ENT.id_inspeccion_entrada
                WHERE
                    PAU.unidad LIKE :searchTerm
                    AND INSP_SAL.fecha_preliberacion IS NOT NULL;
                `,
                {
                    replacements: { searchTerm: `%${searchTerm}%` },
                    type: Sequelize.QueryTypes.SELECT
                }
            );


            return res.status(200).json({
                OK: true,
                msg: 'Obtenido unidades inspeccionadas correctamente',
                result: inspecciones
            });

        } catch (error) {
            console.error('Error al obtener detalles unidad inspeccionada:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.confirmarIngresoAFosaSalida = async (req, res) => {
        const { idpickandup, id_usuario, base } = req.body;
        let t;

        try {
            t = await Sequelize.transaction();

            const UnidadEnFosaExist = await Pickandup.findOne({
                where: {
                    estatus: 'en_fosa_inspeccion_salida',
                    base: base
                }
            });

            if(UnidadEnFosaExist){
                return res.status(200).json({
                    OK: false,
                    msg: 'Ya hay una unidad en fosa',
                    result: null
                });
            }

            const inspeccionCreada = await InspeccionSalida.create(
                {fk_usuario_confirmacion_fosa: id_usuario},
                { transaction: t }
            );

            await Pickandup.update(
                {
                    estatus: 'en_fosa_inspeccion_salida',
                    fk_inspeccion_salida: inspeccionCreada.id_inspeccion_salida
                },
                {
                    where: {
                        idpickandup: idpickandup
                    },
                    transaction: t
                }
            );
            
            await t.commit();
            io.emit('FOSA_INSPECCION_SALIDA_ACTUALIZADA');
            return res.status(200).json({
                OK: true,
                msg: 'Confirmado correctamente',
                result: null
            });
        } catch (error) {
            if (t) await t.rollback();
            console.error('Error en confirmar ingreso a fosa:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.guardarChecklistInspeccionSalida = async (req, res) => {

        let t;

        try {

            let { checklist, id_inspeccion_salida, checklistSeleccionado, ...inspeccionData } = req.body;

            t = await Sequelize.transaction();

            inspeccionData.checklist = checklistSeleccionado;
            const inspeccionHecha = await InspeccionesInspSalida.create(inspeccionData, { transaction: t });

            let sucesivo = 0;

            if(checklist.length > 0){
                checklist.forEach((check) => {
                    check.fk_checklist_insp_sal = inspeccionHecha.id_checklist_insp_sal;
                    if(check.foto_hallazgo_1){
                        check.foto_hallazgo_1 = saveBase64File(check.foto_hallazgo_1, 'foto_hallazgo_1', inspeccionHecha.id_checklist_insp_sal, sucesivo);
                        sucesivo++;
                    }
    
                    if(check.foto_hallazgo_2){
                        check.foto_hallazgo_2 = saveBase64File(check.foto_hallazgo_2, 'foto_hallazgo_2', inspeccionHecha.id_checklist_insp_sal, sucesivo);
                        sucesivo++;
                    }
                });
                
                await HallazgosInspSalida.bulkCreate(checklist, { transaction: t });
            }

            await InspeccionSalida.update(
                {
                    fk_insp_salida: inspeccionHecha.id_checklist_insp_sal,
                    fecha_preliberacion: moment(),
                },
                {
                    where: { id_inspeccion_salida: id_inspeccion_salida },
                    transaction: t
                }
            )

            const unidadInspeccionada = await InspeccionSalida.findOne({
                attributes: ['evidencia_ajuste_parametros_1'],
                include: [
                    {
                        model: InspeccionesInspSalida,
                        as: 'InspSal',
                        attributes: ['id_checklist_insp_sal']
                    }
                ],
                where: { id_inspeccion_salida: id_inspeccion_salida },
                transaction: t
            });

            if(unidadInspeccionada.evidencia_ajuste_parametros_1 !== null && unidadInspeccionada.InspSal!== null){
                await Pickandup.update(
                    {estatus: 'preliberada_inspeccion'},
                    {
                        where: { fk_inspeccion_salida: id_inspeccion_salida },
                        transaction: t
                    }
                );
            }


            await t.commit();

            io.emit('FOSA_INSPECCION_SALIDA_ACTUALIZADA');

            if(unidadInspeccionada.evidencia_ajuste_parametros_1 !== null && unidadInspeccionada.InspSal!== null){
                io.emit('INSPECCION_SALIDA_FINALIZADA');
            }

            return res.status(200).json({
                OK: true,
                msg: 'Inpseccion guardada correctamente',
                result: null
            });

        } catch (error) {
            console.error('Error al guardar inspeccion:', error);
            if (t) await t.rollback();
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.obtenerUnidadesLiberadas = async (req, res) => {

        try {

            const { base } = req.params;

            const inspecciones = await Sequelize.query(
                `
                SELECT
                    INSP_SAL.id_inspeccion_salida,
                    PAU.idpickandup,
                    PAU.unidad,
                    PAU.unidad_negocio,
                    PAU.division,
                    PAU.operador,
                    INSP_ENT.creado_el AS fecha_inspeccion_entrada,
                    INSP_SAL.fecha_preliberacion,
                    INSP_SAL.fecha_liberacion,
                    INSP_SAL.video_entrega
                FROM
                    pd_inspeccion_salida INSP_SAL
                    LEFT JOIN pd_pickandup PAU ON INSP_SAL.id_inspeccion_salida = PAU.fk_inspeccion_salida
                    LEFT JOIN pd_inspeccion_entrada INSP_ENT ON PAU.fk_inspeccion_entrada = INSP_ENT.id_inspeccion_entrada
                WHERE
                    PAU.base = :base
                    AND PAU.estatus = 'liberada_inspeccion';
                `,
                {
                    replacements: { base },
                    type: Sequelize.QueryTypes.SELECT
                }
            );


            return res.status(200).json({
                OK: true,
                msg: 'Obtenido unidades inspeccionadas correctamente',
                result: inspecciones
            });

        } catch (error) {
            console.error('Error al obtener detalles unidad inspeccionada:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

     app.guardarLiberacion = async (req, res) => {

        let t;
        
        try {
            t = await Sequelize.transaction();
            const { id_inspeccion_salida, idpickandup, ...liberacionForm } = req.body;
            const files = req.files;

            const data = {
                fecha_liberacion: liberacionForm.fecha_liberacion,
                comentarios_operador: liberacionForm.comentarios_operador,
                comentarios_inspector: liberacionForm.comentarios_inspector,
                firma_inspector: saveBase64FileLiberadas(liberacionForm.firma_inspector, 'firma_inspector' ),
                firma_operador: saveBase64FileLiberadas(liberacionForm.firma_operador, 'firma_operador' ),
                video_entrega: files[0]?.filename ?? null,
            };

            await InspeccionSalida.update(
                data,
                {
                    where: { id_inspeccion_salida: id_inspeccion_salida },
                    transaction: t
                }
            );

            const estatus = 'liberada_inspeccion'
            await Pickandup.update(
                {
                    estatus: estatus,
                },
                {
                    where: { idpickandup: idpickandup },
                    transaction: t
                }
            );

            await t.commit();

            io.emit('UNIDADES_PRELIBERADAS_ACTUALIZADA');
            io.emit('UNIDADES_LIBERADAS_ACTUALIZADA');
            return res.status(200).json({
                OK: true,
                msg: 'Liberacion guardada correctamente',
                result: null
            });

        } catch (error) {
            if (t) await t.rollback();
            console.error('Error al guardar liberacion:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

     app.guardarAjusteParametros = async (req, res) => {

        let t;

        try {
            t = await Sequelize.transaction();

            const { id_inspeccion_salida, evidencia_ajuste_parametros_1, evidencia_ajuste_parametros_2 } = req.body;

            let ajusteParametros = {
                fecha_carga_ajuste_param: moment()
            }

            let sucesivo = 0
            if(evidencia_ajuste_parametros_1){
                ajusteParametros.evidencia_ajuste_parametros_1 = saveBase64File(evidencia_ajuste_parametros_1, 'evidencia_ajuste_parametros_1', id_inspeccion_salida, sucesivo);
                sucesivo++
            }

            if(evidencia_ajuste_parametros_2){
                ajusteParametros.evidencia_ajuste_parametros_2 = saveBase64File(evidencia_ajuste_parametros_2, 'evidencia_ajuste_parametros_2', id_inspeccion_salida, sucesivo);
                sucesivo++
            }

            await InspeccionSalida.update(
                ajusteParametros,
                {
                    where: { id_inspeccion_salida: id_inspeccion_salida },
                    transaction: t
                }
            );

            const unidadInspeccionada = await InspeccionSalida.findOne({
                attributes: ['evidencia_ajuste_parametros_1'],
                include: [
                    {
                        model: InspeccionesInspSalida,
                        as: 'InspSal',
                        attributes: ['id_checklist_insp_sal']
                    }
                ],
                where: { id_inspeccion_salida: id_inspeccion_salida },
                transaction: t
            });

            if(unidadInspeccionada.evidencia_ajuste_parametros_1 !== null && unidadInspeccionada.InspSal!== null){
                await Pickandup.update(
                    {estatus: 'preliberada_inspeccion'},
                    {
                        where: { fk_inspeccion_salida: id_inspeccion_salida },
                        transaction: t
                    }
                );
            }

            io.emit('FOSA_INSPECCION_SALIDA_ACTUALIZADA');
            
            if(unidadInspeccionada.evidencia_ajuste_parametros_1 !== null && unidadInspeccionada.InspSal!== null){
                io.emit('INSPECCION_SALIDA_FINALIZADA');
            }
            await t.commit();
            return res.status(200).json({
                OK: true,
                msg: 'Ajuste de parametros cargado correctamente',
                result: null
            });

        } catch (error) {
            if (t) await t.rollback();
            console.error('Error al guardar ajuste de parametros:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }


    return app;
}

// const EliminarEvidenciaAnterior = (nombreArchivo, filepath) => {
//   if(nombreArchivo){
//     const previousFilePath = path.join(filepath, nombreArchivo);
//     if (fs.existsSync(previousFilePath)) {
//       fs.unlinkSync(previousFilePath);
//     }
//   }
// }