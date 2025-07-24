const { QueryTypes } = require('sequelize');
const moment = require("moment");
const path = require('path');
const fs = require('fs');

const { Op } = require('sequelize');

module.exports = app => {

    const Pickandup = app.database.models.PickAndUp;
    
    const Salida = app.database.models.Salida;
    const Usuarios = app.database.models.Usuarios;
    const Evidencias = app.database.models.Evidencias;

    const sequelize = app.database.sequelize;

    app.pruebaAdvan = async (req, res) => {
        
        try {
            
            return res.json({ 
                OK: true, 
                result: result
            });
        } catch (err) {
            console.error('Error en :', err);
            return res.status(500).json({ 
                OK: false,
                msg: err,
            });
        }
    }

    app.obtenerUnidadesEnBase = async (req, res) => {

        const base = req.params.base;
        
        try {
            
            const unidades = await Pickandup.findAll({
                attributes: ['idpickandup', 'unidad', 'estatus', 'autorizacion_salida_con_omision'],
                where: {
                    fk_entrada: {
                        [Op.ne]: null
                    },
                    fk_salida: {
                        [Op.eq]: null
                    },
                    base: base
                },
                include: [
                    {
                        model: Evidencias,
                        attributes: ['video_inspeccion_salida', 'firma_operador', 'ingreso_mtto']
                    }
                ]
            })

            return res.json({ 
                OK: true, 
                result: unidades
            });
        } catch (err) {
            console.error('Error en :', err);
            return res.status(500).json({ 
                OK: false,
                msg: err,
            });
        }
    }

    app.ObtenerBusquedaSalida = async(request, response) => {

        try {
            const { search } = request.body;
            const { page = 1, limit = 100 } = request.query;
            const offset = (page - 1) * limit;

            const query = `
                SELECT
                    PAU.idpickandup,
                    S.id_salida,
                    PAU.base,
                    S.operador,
                    PAU.autorizacion_salida_con_omision,
                    PAU.division,
                    PAU.unidad_negocio,
                    PAU.unidad,
                    S.comentarios,
                    S.fk_usuario,
                    S.estatus,
                    E.fecha_entrada,
                    S.fecha_salida
                FROM
                    pd_salida AS S
                    LEFT JOIN pd_pickandup PAU ON S.id_salida = PAU.fk_salida
                    LEFT JOIN pd_entrada E ON PAU.fk_entrada = E.id_entrada
                WHERE (
                    PAU.unidad LIKE :search 
                    OR PAU.operador LIKE :search 
                    OR DATE_FORMAT(S.fecha_salida, '%d/%m/%Y') LIKE :search
                )
                ORDER BY
                    S.id_salida DESC
                LIMIT :limit 
                OFFSET :offset
            `;

            const results = await sequelize.query(query, {
                replacements: {
                    search: `%${search}%`,
                    limit: parseInt(limit),
                    offset: parseInt(offset)
                },
                type: QueryTypes.SELECT
            });

            return response.status(200).json({
                page: parseInt(page),
                limit: parseInt(limit),
                data: results
            });
        } catch (error) {
            console.error('Error al buscar', error);
            return response.status(500).json({ error: 'Error interno del servidor' });
        }

    };

    app.obtenerSalidas = async (request, response) => {

        try {
            const { base } = request.params;

            const query = `
                SELECT
                    PAU.idpickandup,
                    S.id_salida,
                    PAU.base,
                    S.operador,
                    PAU.autorizacion_salida_con_omision,
                    PAU.division,
                    PAU.unidad_negocio,
                    PAU.unidad,
                    S.comentarios,
                    S.fecha_salida,
                    S.fk_usuario,
                    S.estatus,
                    E.fecha_entrada
                FROM
                    pd_salida AS S
                    LEFT JOIN pd_pickandup PAU ON S.id_salida = PAU.fk_salida
                    LEFT JOIN pd_entrada E ON PAU.fk_entrada = E.id_entrada
                WHERE
                    PAU.base = :base
                ORDER BY
                    S.estatus ASC,
                    S.fecha_salida DESC,
                    S.id_salida ASC
                LIMIT 80
            `;

            const result = await sequelize.query(query, {
                replacements: { base },
                type: QueryTypes.SELECT
            });

            response.status(200).json({
                OK: true,
                result
            });
        } catch (error) {
            response.status(500).send('Error al obtener los registros: ' + error.message);
        }

    };

    app.ObtenerDetallesSalida = async (req, res) => {
        
        try {

            const idpickandup = req.params.id;

            const detalles = await Pickandup.findByPk(idpickandup, {
                attributes: [
                    'idpickandup',
                    'base',
                    'unidad',
                    'operador',
                    'unidad_negocio',
                    'division',
                ],
                include: [
                    {
                        model: Salida,
                        include: { model: Usuarios, attributes: ['id_usuario', 'nombre_empleado']},
                        include: { model: Usuarios, as: 'UsuarioAutoSalidaHallazgo', attributes: ['id_usuario', 'nombre_empleado']}
                    },
                ]
            });
            
            return res.json({
                OK: true, 
                result: detalles
            });
        } catch (err) {
            console.error('Error en obtener detalles de entrada:', err);
            return res.status(500).json({ 
                OK: false,
                msg: err,
            });
        }
    }

    app.obtenerUnidadEnCasetaSalida = async (req, res) => {

        const base = req.params.base;

        try {
            const unidadEnCaseta = await Pickandup.findOne({
                attributes: ['unidad', 'operador', 'estatus', 'fk_salida', 'fk_intercambios_salida'],
                where: {
                    base: base,
                    estatus: 'en_caseta_salida'
                }
            });

            return res.status(200).json({
                OK: true,
                msg: '',
                result: unidadEnCaseta
            });

        } catch (error) {
            console.error('Error al :', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }
    
    app.autorizarSalidaConOmisiones = async (req, res) => {
        
        try {
        
            const idpickandup = req.body.idpickandup;
            const fk_usuario = req.body.fk_usuario_auto_salida_omision;

            const estatus = 'salida_omision_autorizada'

            const salidaAutorizada = Pickandup.update(
                {
                    autorizacion_salida_con_omision: true,
                    fk_usuario_auto_salida_omision: fk_usuario,
                    estatus: estatus
                },
                { where: { idpickandup: idpickandup } }
            );

            await Pickandup.update(
                {
                    estatus: estatus
                },
                { where: {idpickandup: idpickandup} }
            );

            return res.json({
                OK: true,
                msg: 'Autorizada correctamente',
                result: salidaAutorizada
            });
        } catch (err) {
            console.error('Error en :', err);
            return res.status(500).json({ 
                OK: false,
                msg: err,
            });
        }
    }

    app.crearSalida = async (req, res) => {

        const {
            idpickandup,
            fecha_salida,
            fecha_hora_inicio,
            fecha_hora_fin,
            departamento_responsable,
            reporte_descripcion,
            operador,
            placas_rem_1,
            placas_rem_2,
            comentarios,
            fk_usuario,

            check_defensa,
            check_motor_bateria_filtros,
            check_llantas_rines,
            check_piso_tracto,
            check_tanques_combustible,
            check_cabina_interior,
            check_compartimiento_herramientas,
            check_tanques_de_aire,
            check_compartimientos_baterias,
            check_mofles,
            check_quinta_rueda,
            check_debajo_del_chasis,
            check_llantas_rines_remolque,
            check_estructura_nodriza,
            check_rampas,
            check_caja_herramientas_remolque,
            check_lona,
            check_libre_de_plagas,
            check_libre_de_semillas_hojas,

            observacion_defensa,
            observacion_motor_bateria_filtros,
            observacion_llantas_rines,
            observacion_piso_tracto,
            observacion_tanques_combustible,
            observacion_cabina_interior,
            observacion_compartimiento_herramientas,
            observacion_tanques_de_aire,
            observacion_compartimientos_baterias,
            observacion_mofles,
            observacion_quinta_rueda,
            observacion_debajo_del_chasis,
            observacion_llantas_rines_remolque,
            observacion_estructura_nodriza,
            observacion_rampas,
            observacion_caja_herramientas_remolque,
            observacion_lona,
            observacion_libre_de_plagas,
            observacion_libre_de_semillas_hojas,

            firma_guardia,
            firma_operador
        } = req.body;

        const salida_fotos = req.files

        // console.log(req.body);
        // console.log(req.files);

        let DatosSalida;

        let t;

        try {

            t = await sequelize.transaction();

            const toBoolean = (value) => value === 'true';

            const nowBoolean = {
                check_defensa: toBoolean(check_defensa),
                check_motor_bateria_filtros: toBoolean(check_motor_bateria_filtros),
                check_llantas_rines: toBoolean(check_llantas_rines),
                check_piso_tracto: toBoolean(check_piso_tracto),
                check_tanques_combustible: toBoolean(check_tanques_combustible),
                check_cabina_interior: toBoolean(check_cabina_interior),
                check_compartimiento_herramientas: toBoolean(check_compartimiento_herramientas),
                check_tanques_de_aire: toBoolean(check_tanques_de_aire),
                check_compartimientos_baterias: toBoolean(check_compartimientos_baterias),
                check_mofles: toBoolean(check_mofles),
                check_quinta_rueda: toBoolean(check_quinta_rueda),
                check_debajo_del_chasis: toBoolean(check_debajo_del_chasis),
                check_llantas_rines_remolque: toBoolean(check_llantas_rines_remolque),
                check_estructura_nodriza: toBoolean(check_estructura_nodriza),
                check_rampas: toBoolean(check_rampas),
                check_caja_herramientas_remolque: toBoolean(check_caja_herramientas_remolque),
                check_lona: toBoolean(check_lona),
                check_libre_de_plagas: toBoolean(check_libre_de_plagas),
                check_libre_de_semillas_hojas: toBoolean(check_libre_de_semillas_hojas)
            };

            Object.assign(req.body, nowBoolean);

            DatosSalida = {
                fecha_salida: fecha_salida,
                fecha_hora_inicio: fecha_hora_inicio,
                fecha_hora_fin: fecha_hora_fin,
                departamento_responsable: departamento_responsable,
                reporte_descripcion: reporte_descripcion,
                operador: operador,
                placas_rem_1: placas_rem_1,
                placas_rem_2: placas_rem_2,
                comentarios: comentarios,
                fk_usuario: fk_usuario,
                check_defensa: nowBoolean.check_defensa,
                check_motor_bateria_filtros: nowBoolean.check_motor_bateria_filtros,
                check_llantas_rines: nowBoolean.check_llantas_rines,
                check_piso_tracto: nowBoolean.check_piso_tracto,
                check_tanques_combustible: nowBoolean.check_tanques_combustible,
                check_cabina_interior: nowBoolean.check_cabina_interior,
                check_compartimiento_herramientas: nowBoolean.check_compartimiento_herramientas,
                check_tanques_de_aire: nowBoolean.check_tanques_de_aire,
                check_compartimientos_baterias: nowBoolean.check_compartimientos_baterias,
                check_mofles: nowBoolean.check_mofles,
                check_quinta_rueda: nowBoolean.check_quinta_rueda,
                check_debajo_del_chasis: nowBoolean.check_debajo_del_chasis,
                check_llantas_rines_remolque: nowBoolean.check_llantas_rines_remolque,
                check_estructura_nodriza: nowBoolean.check_estructura_nodriza,
                check_rampas: nowBoolean.check_rampas,
                check_caja_herramientas_remolque: nowBoolean.check_caja_herramientas_remolque,
                check_lona: nowBoolean.check_lona,
                check_libre_de_plagas: nowBoolean.check_libre_de_plagas,
                check_libre_de_semillas_hojas: nowBoolean.check_libre_de_semillas_hojas,
                observacion_defensa,
                observacion_motor_bateria_filtros,
                observacion_llantas_rines,
                observacion_piso_tracto,
                observacion_tanques_combustible,
                observacion_cabina_interior,
                observacion_compartimiento_herramientas,
                observacion_tanques_de_aire,
                observacion_compartimientos_baterias,
                observacion_mofles,
                observacion_quinta_rueda,
                observacion_debajo_del_chasis,
                observacion_llantas_rines_remolque,
                observacion_estructura_nodriza,
                observacion_rampas,
                observacion_caja_herramientas_remolque,
                observacion_lona,
                observacion_libre_de_plagas,
                observacion_libre_de_semillas_hojas,
            }

            const fotosChecklist = [
                'foto_hallazgo',

                'foto_unidad_1',
                'foto_unidad_2',
                'foto_unidad_3',
                'foto_unidad_4',
                'foto_unidad_5',
                'foto_unidad_6',

                'foto_defensa',
                'foto_motor_bateria_filtros',
                'foto_llantas_rines',
                'foto_piso_tracto',
                'foto_tanques_combustible',
                'foto_cabina_interior',
                'foto_compartimiento_herramientas',
                'foto_tanques_de_aire',
                'foto_compartimientos_baterias',
                'foto_mofles',
                'foto_quinta_rueda',
                'foto_debajo_del_chasis',
                'foto_llantas_rines_remolque',
                'foto_estructura_nodriza',
                'foto_rampas',
                'foto_caja_herramientas_remolque',
                'foto_lona',
                'foto_libre_de_plagas',
                'foto_libre_de_semillas_hojas',
                'firma_guardia',
                'firma_operador'
            ];
    
            const uploadedFotos = {};
            if (Array.isArray(salida_fotos)) {
                for (const doc of salida_fotos) {
                    uploadedFotos[doc.fieldname] = [doc];
                }
            } else {
                uploadedFotos = documentosEvidencias || {};
            }

            for (let foto of fotosChecklist) {
                const archivoRecibido = uploadedFotos?.[foto]?.[0]?.filename;
                if (archivoRecibido) {
                    DatosSalida[foto] = archivoRecibido;
                }
            }

            if(firma_guardia !== 'undefined'){
                DatosSalida['firma_guardia'] = saveBase64File(firma_guardia, 'firma_guardia');
            }

            if(firma_operador !== 'undefined'){
                DatosSalida['firma_operador'] = saveBase64File(firma_operador, 'firma_operador');
            }

            // Si tiene un reporte o hallazgo no llega a las firmas
            // console.log(firma_guardia, firma_operador)
            const checkHallazgos = (firma_guardia !== 'undefined' || firma_operador !== 'undefined');

            const estatus = checkHallazgos ? 'salida_salida' : 'salida_hallazgo';

            DatosSalida['estatus'] = estatus;

            const salidaCreada = await Salida.create(DatosSalida, { transaction: t });

            await Pickandup.update(
                {
                    fk_salida: salidaCreada.id_salida,
                    estatus: salidaCreada.estatus
                },
                { where: {idpickandup: idpickandup}, transaction: t }
            )

            // console.log(test)

            await t.commit();

            return res.status(200).json({ 
                OK: true,
                msg: 'Salida creada correctamente',
            });

        } catch (error) {
            if (t) await t.rollback();
            console.error('Error en crear salida:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.confirmarUnidadEnCaseta = async (req, res) => {
        
        const idpickandup = req.body.idpickandup;

        try {

            const unidadEnCaseta = await Pickandup.update(
                { estatus: 'en_caseta_salida' },
                {
                    where: {idpickandup: idpickandup }
                }
            );
            
            return res.json({ 
                OK: true,
                msg: 'Unidad en caseta confirmada',
                result: unidadEnCaseta
            });
        } catch (err) {
            console.error('Error en confirmar unidad en caseta:', err);
            return res.status(500).json({ 
                OK: false,
                msg: err,
            });
        }
    }

    app.cancelarUnidadEnCaseta = async (req, res) => {

        const idpickandup = req.body.idpickandup;
        const estatusAnterior = req.body.estatusAnterior;
        
        try {
            
            const unidadEnCaseta = await Pickandup.update(
                { estatus: estatusAnterior },
                {
                    where: {idpickandup: idpickandup }
                }
            );

            return res.json({ 
                OK: true, 
                result: unidadEnCaseta
            });
        } catch (err) {
            console.error('Error en cancelar unidad en caseta:', err);
            return res.status(500).json({ 
                OK: false,
                msg: err,
            });
        }
    }

    app.autorizarSalidaConHallazgos = async (req, res) => {
        
        const id_salida = req.body.id_salida;
        const fk_usuario = req.body.fk_usuario_auto_salida_hallazgo;
        const idpickandup = req.body.idpickandup;

        const estatus = 'salida_pte_firma';

        let t

        try {
            t = await sequelize.transaction();

            const salidaAutorizada = await Salida.update(
                {
                    estatus: estatus,
                    fk_usuario_auto_salida_hallazgo: fk_usuario,
                    autorizacion_salida_con_hallazgo: true
                },
                {
                    where: { id_salida: id_salida },
                    transaction: t 
                }
            );

            await Pickandup.update(
                {
                    estatus: estatus
                },
                { where: {idpickandup: idpickandup}, transaction: t }
            );
            
            await t.commit();

            return res.json({ 
                OK: true,
                msg: 'Autorizada correctamente',
                result: salidaAutorizada
            });
        } catch (err) {
            if (t) await t.rollback();
            console.error('Error en autorizar salida con hallazgos:', err);
            return res.status(500).json({ 
                OK: false,
                msg: err,
            });
        }
    }

    app.confirmarSalida = async (req, res) => {

        let t
        
        try {
            const {
                idpickandup,
                id_salida,
                check_defensa,
                check_motor_bateria_filtros,
                check_llantas_rines,
                check_piso_tracto,
                check_tanques_combustible,
                check_cabina_interior,
                check_compartimiento_herramientas,
                check_tanques_de_aire,
                check_compartimientos_baterias,
                check_mofles,
                check_quinta_rueda,
                check_debajo_del_chasis,
                check_llantas_rines_remolque,
                check_estructura_nodriza,
                check_rampas,
                check_caja_herramientas_remolque,
                check_lona,
                check_libre_de_plagas,
                check_libre_de_semillas_hojas,
                
                firma_guardia,
                firma_operador,
            } = req.body;
            
    
            let DatosSalida;
            t = await sequelize.transaction();

            DatosSalida = {
                check_defensa: check_defensa,
                check_motor_bateria_filtros: check_motor_bateria_filtros,
                check_llantas_rines: check_llantas_rines,
                check_piso_tracto: check_piso_tracto,
                check_tanques_combustible: check_tanques_combustible,
                check_cabina_interior: check_cabina_interior,
                check_compartimiento_herramientas: check_compartimiento_herramientas,
                check_tanques_de_aire: check_tanques_de_aire,
                check_compartimientos_baterias: check_compartimientos_baterias,
                check_mofles: check_mofles,
                check_quinta_rueda: check_quinta_rueda,
                check_debajo_del_chasis: check_debajo_del_chasis,
                check_llantas_rines_remolque: check_llantas_rines_remolque,
                check_estructura_nodriza: check_estructura_nodriza,
                check_rampas: check_rampas,
                check_caja_herramientas_remolque: check_caja_herramientas_remolque,
                check_lona: check_lona,
                check_libre_de_plagas: check_libre_de_plagas,
                check_libre_de_semillas_hojas: check_libre_de_semillas_hojas,
            }

            if(firma_guardia !== 'undefined'){
                DatosSalida['firma_guardia'] = saveBase64File(firma_guardia, 'firma_guardia');
            }

            if(firma_operador !== 'undefined'){
                DatosSalida['firma_operador'] = saveBase64File(firma_operador, 'firma_operador');
            }

            const estatus = 'salida_salida'

            DatosSalida['estatus'] = estatus;
            DatosSalida['fecha_salida'] = moment();

            const salidaConfirmada = await Salida.update(
                DatosSalida,
                {
                    where: {id_salida: id_salida},
                    transaction: t
                }
            )

            await Pickandup.update(
                {
                    estatus: estatus
                },
                { where: {idpickandup: idpickandup}, transaction: t }
            )
            
            await t.commit();
            // if (t) await t.rollback();

            return res.json({ 
                OK: true,
                msg: 'Actualizado correctamente',
                result: salidaConfirmada
            });
        } catch (err) {
            if (t) await t.rollback();
            console.error('Error en confirmar salida:', err);
            return res.status(500).json({ 
                OK: false,
                msg: err,
            });
        }
    }

    return app;
}

const saveBase64File = (base64Data, type) => {

  const evidenciaEntregadasPath = path.join(__dirname, '../../../uploads/fotos_checklist_salida');

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
  let filename = `${type}_${DateFormated}.${extension}`;
  
  const filePath = path.join(evidenciaEntregadasPath, filename);
  fs.writeFileSync(filePath, buffer);
  return filename;
}