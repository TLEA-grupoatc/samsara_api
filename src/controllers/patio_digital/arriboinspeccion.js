const fs = require('fs');
const fsx = require('fs-extra')
const moment = require('moment');
const path = require('path');

const puppeteer = require('puppeteer');
const handlebars = require('handlebars');
const { Op } = require('sequelize');



module.exports = app => {

    const Pickandup = app.database.models.PickAndUp;
    const Entrada = app.database.models.Entrada;
    const InspeccionReporteDanos = app.database.models.InspeccionReporteDanos;
    const PiezasReporteDanos = app.database.models.PiezasReporteDanos;
    
    const InspeccionEntrada = app.database.models.InspeccionEntrada;
    const InspeccionesInspEntrada = app.database.models.InspeccionesInspEntrada;
    const HallazgosInspEntrada = app.database.models.HallazgosInspEntrada;

    const Mantenimiento = app.database.models.Mantenimiento;

    const CatalogoFamilia = app.database.models.CatalogoFamilia;
    const CatalogoComponente = app.database.models.CatalogoComponente;
    const Usuarios = app.database.models.Usuarios;
    
    const Sequelize = app.database.sequelize;

    const io = app.io;

    const saveBase64File = (base64Data, type, id, sucesivo) => {
        
          const evidenciaEntregadasPath = path.join(__dirname, '../../../uploads/fotos_inspeccion_entrada');
        
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

    app.obtenerUnidadesConEntrada = async (req, res) => {
        
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
                include: [
                    {
                        model: Entrada,
                        attributes: ['fecha_entrada', 'motivo_ingreso']
                    }
                ],
                where: {
                    estatus: {
                        [Op.in]: ['entrada', 'en_caseta_entrada']
                    },
                    base: base,
                },
                order: [
                    [{ model: Entrada }, 'fecha_entrada', 'ASC'],
                ]
            });

            let unidadesMantenimiento = [];
            let unidadesOtros = [];

            unidades.forEach((unidad) => {
                const motivo = unidad?.Entrada?.motivo_ingreso ?? '';
                if (motivo.includes('Mantenimiento')) {
                    unidadesMantenimiento.push(unidad);
                } else {
                    unidadesOtros.push(unidad);
                }
            });

            return res.status(200).json({
                OK: true,
                mantenimiento: unidadesMantenimiento,
                otros: unidadesOtros
            });
            
        } catch (error) {
            console.error('Error en Programar Arribo:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.obtenerUnidadEnFosa = async (req, res) => {
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
                    IE.id_inspeccion_entrada,
                    IE.fk_insp_reporte_danos,
                    IE.fk_insp_ext_1,
                    IE.fk_insp_ext_2,
                    IE.fk_insp_fosa,
                    IE.fk_insp_reporte_operador,
                    IE.fk_insp_expres,
                    IE.creado_el,
                    IE.actualizado_el,
                    E.fecha_entrada,
                    PAU.rem_1,
                    prev_IE.ultima_inspeccion
                FROM 
                    pd_pickandup PAU
                    LEFT JOIN pd_inspeccion_entrada IE ON PAU.fk_inspeccion_entrada = IE.id_inspeccion_entrada
                    LEFT JOIN pd_entrada E ON PAU.fk_entrada = E.id_entrada
                    LEFT JOIN (
                        SELECT 
                            PAU2.unidad,
                            IE2.creado_el,
                            LAG(IE2.creado_el) OVER (
                                PARTITION BY PAU2.unidad 
                                ORDER BY IE2.creado_el ASC
                            ) AS ultima_inspeccion
                        FROM 
                            pd_pickandup PAU2
                            LEFT JOIN pd_inspeccion_entrada IE2 ON PAU2.fk_inspeccion_entrada = IE2.id_inspeccion_entrada
                        ORDER BY
                            IE2.creado_el DESC
                        LIMIT 1
                    ) AS prev_IE ON prev_IE.unidad = PAU.unidad
                WHERE
                    PAU.estatus = 'en_fosa_inspeccion_entrada' AND PAU.base = :base;
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

    app.obtenerDetallesInspeccion = async (req, res) => {

        try {

            const { id_inspeccion_entrada } = req.params;

            const detalles = await InspeccionEntrada.findByPk(
                id_inspeccion_entrada,
                {
                    attributes: [
                        'id_inspeccion_entrada',
                        'fk_insp_ext_1',
                        'fk_insp_ext_2',
                        'fk_insp_fosa',
                        'fk_insp_reporte_operador',
                        'fk_insp_reporte_danos',
                        'fk_insp_reporte_danos_2',
                        'video_insp_ext_1',
                        'video_insp_ext_2',
                        'video_insp_fosa',
                        'video_insp_reporte_operador',
                        'creado_el'
                    ],
                    include: [
                        {
                            model: Pickandup,
                            attributes: [
                                'idpickandup',
                                'unidad',
                                'base',
                                'unidad_negocio',
                                'division'
                            ],
                            include: [
                                {
                                    model: Mantenimiento,
                                    attributes: [
                                        'tracto_ot_correctivo',
                                        're1_ot_correctivo',
                                        'dl_ot_correctivo',
                                        're2_ot_correctivo',
                                        'tracto_ot_preventivo',
                                        're1_ot_preventivo',
                                        'dl_ot_preventivo',
                                        're2_ot_preventivo',
                                    ]
                                }
                            ]
                        },
                        {
                            model: InspeccionesInspEntrada,
                            as: 'InspExt1',
                            attributes: [
                                'id_checklist_insp_ent',
                                'checklist',
                                'tipo_checklist',
                                'fecha_hora_inicio',
                                'fecha_hora_fin',
                                'fk_usuario_cre'
                            ],
                            include: [
                                {
                                    model: HallazgosInspEntrada,
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
                                },
                                {
                                    model: Usuarios,
                                    attributes: ['nombre_empleado']
                                }
                            ]
                        },
                        {
                            model: InspeccionesInspEntrada,
                            as: 'InspExt2',
                            attributes: [
                                'checklist',
                                'tipo_checklist',
                                'fecha_hora_inicio',
                                'fecha_hora_fin',
                                'fk_usuario_cre'
                            ],
                            include: [
                                {
                                    model: HallazgosInspEntrada,
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
                                },
                                {
                                    model: Usuarios,
                                    attributes: ['nombre_empleado']
                                }
                            ]
                        },
                        {
                            model: InspeccionesInspEntrada,
                            as: 'InspFosa',
                            attributes: [
                                'checklist',
                                'tipo_checklist',
                                'fecha_hora_inicio',
                                'fecha_hora_fin',
                                'fk_usuario_cre'
                            ],
                            include: [
                                {
                                    model: HallazgosInspEntrada,
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
                                },
                                {
                                    model: Usuarios,
                                    attributes: ['nombre_empleado']
                                }
                            ]
                        },
                        {
                            model: InspeccionesInspEntrada,
                            as: 'InspRepOp',
                            attributes: [
                                'checklist',
                                'tipo_checklist',
                                'fecha_hora_inicio',
                                'fecha_hora_fin',
                                'fk_usuario_cre'
                            ],
                            include: [
                                {
                                    model: Usuarios,
                                    attributes: ['nombre_empleado']
                                },
                                {
                                    model: HallazgosInspEntrada,
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
                        {
                            model: InspeccionesInspEntrada,
                            as: 'InspExpres',
                            attributes: [
                                'checklist',
                                'tipo_checklist',
                                'fecha_hora_inicio',
                                'fecha_hora_fin',
                                'fk_usuario_cre'
                            ],
                            include: [
                                {
                                    model: Usuarios,
                                    attributes: ['nombre_empleado']
                                },
                                {
                                    model: HallazgosInspEntrada,
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
                }
            );

            const unidad = detalles?.PickAndUp?.unidad;
            const creadoEl = detalles?.creado_el;

            let previo = null;
            if (unidad && creadoEl) {
                previo = await InspeccionEntrada.findOne({
                    attributes: ['id_inspeccion_entrada', 'creado_el'],
                    include: [
                    {
                        model: Pickandup,
                        attributes: [],
                        where: { unidad }
                    }
                    ],
                    where: {
                        creado_el: { [Op.lt]: creadoEl }
                    },
                    order: [['creado_el', 'DESC']],
                    limit: 1
                });
            }

            return res.status(200).json({
                OK: true,
                msg: 'Obtenido unidades inspeccionadas correctamente',
                result: detalles,
                previo: previo,
            });

        } catch (error) {
            console.error('Error al obtener Unidades inspeccionadas:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.obtenerUnidadesinspeccionadas = async (req, res) => {

        try {

            const { base } = req.params;

            const inspecciones = await Sequelize.query(
                `
                SELECT
                    INSP_ENT.id_inspeccion_entrada,
                    PAU.idpickandup,
                    PAU.unidad,
                    PAU.rem_1,
                    PAU.unidad_negocio,
                    PAU.division,
                    PAU.operador,
                    ENT.fecha_entrada,
                    INSP_ENT.creado_el AS fecha_hora_inicio_inspeccion,
                    NULLIF(
                        GREATEST(
                            COALESCE(INSP_EXT1.fecha_hora_fin, '1970-01-01 00:00:00'),
                            COALESCE(INSP_EXT2.fecha_hora_fin, '1970-01-01 00:00:00'),
                            COALESCE(INSP_FOSA.fecha_hora_fin, '1970-01-01 00:00:00'),
                            COALESCE(INSP_REPOP.fecha_hora_fin, '1970-01-01 00:00:00'),
                            COALESCE(INSP_EXP.fecha_hora_fin, '1970-01-01 00:00:00')
                        ),
                        '1970-01-01 00:00:00'
                    ) AS fecha_hora_fin_inspeccion,
                    CASE 
                        WHEN INSP_EXT1.fecha_hora_fin IS NOT NULL
                            AND INSP_EXT2.fecha_hora_fin IS NOT NULL
                            AND INSP_FOSA.fecha_hora_fin IS NOT NULL
                            AND INSP_REPOP.fecha_hora_fin IS NOT NULL
                            THEN 1
                        WHEN INSP_REPOP.fecha_hora_fin IS NOT NULL
                            AND INSP_EXP.fecha_hora_fin IS NOT NULL
                            THEN 1
                        ELSE 0
                    END AS inspeccion_finalizada
                FROM
                    pd_inspeccion_entrada INSP_ENT
                    LEFT JOIN pd_pickandup PAU ON INSP_ENT.id_inspeccion_entrada = PAU.fk_inspeccion_entrada
                    LEFT JOIN pd_entrada ENT ON PAU.fk_entrada = ENT.id_entrada
                    LEFT JOIN pd_inspecciones_insp_entrada INSP_EXT1 ON INSP_ENT.fk_insp_ext_1 = INSP_EXT1.id_checklist_insp_ent
                    LEFT JOIN pd_inspecciones_insp_entrada INSP_EXT2 ON INSP_ENT.fk_insp_ext_2 = INSP_EXT2.id_checklist_insp_ent
                    LEFT JOIN pd_inspecciones_insp_entrada INSP_FOSA ON INSP_ENT.fk_insp_fosa = INSP_FOSA.id_checklist_insp_ent
                    LEFT JOIN pd_inspecciones_insp_entrada INSP_REPOP ON INSP_ENT.fk_insp_reporte_operador = INSP_REPOP.id_checklist_insp_ent
                    LEFT JOIN pd_inspecciones_insp_entrada INSP_EXP ON INSP_ENT.fk_insp_expres = INSP_EXP.id_checklist_insp_ent
                WHERE
                    PAU.base = :base
                ORDER BY
                    INSP_ENT.id_inspeccion_entrada DESC
                LIMIT 25;
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

    app.obtenerBusquedaInspeccionEntrada = async (req, res) => {

        try {

            const { searchTerm } = req.params;

            const inspecciones = await Sequelize.query(
                `
                SELECT
                    INSP_ENT.id_inspeccion_entrada,
                    PAU.idpickandup,
                    PAU.unidad,
                    PAU.rem_1,
                    PAU.unidad_negocio,
                    PAU.division,
                    PAU.operador,
                    ENT.fecha_entrada,
                    INSP_ENT.creado_el AS fecha_hora_inicio_inspeccion,
                    NULLIF(
                        GREATEST(
                            COALESCE(INSP_EXT1.fecha_hora_fin, '1970-01-01 00:00:00'),
                            COALESCE(INSP_EXT2.fecha_hora_fin, '1970-01-01 00:00:00'),
                            COALESCE(INSP_FOSA.fecha_hora_fin, '1970-01-01 00:00:00'),
                            COALESCE(INSP_REPOP.fecha_hora_fin, '1970-01-01 00:00:00'),
                            COALESCE(INSP_EXP.fecha_hora_fin, '1970-01-01 00:00:00')
                        ),
                        '1970-01-01 00:00:00'
                    ) AS fecha_hora_fin_inspeccion,
                    CASE 
                        WHEN INSP_EXT1.fecha_hora_fin IS NOT NULL
                            AND INSP_EXT2.fecha_hora_fin IS NOT NULL
                            AND INSP_FOSA.fecha_hora_fin IS NOT NULL
                            AND INSP_REPOP.fecha_hora_fin IS NOT NULL
                            THEN 1
                        WHEN INSP_REPOP.fecha_hora_fin IS NOT NULL
                            AND INSP_EXP.fecha_hora_fin IS NOT NULL
                            THEN 1
                        ELSE 0
                    END AS inspeccion_finalizada
                FROM
                    pd_inspeccion_entrada INSP_ENT
                    LEFT JOIN pd_pickandup PAU ON INSP_ENT.id_inspeccion_entrada = PAU.fk_inspeccion_entrada
                    LEFT JOIN pd_entrada ENT ON PAU.fk_entrada = ENT.id_entrada
                    LEFT JOIN pd_inspecciones_insp_entrada INSP_EXT1 ON INSP_ENT.fk_insp_ext_1 = INSP_EXT1.id_checklist_insp_ent
                    LEFT JOIN pd_inspecciones_insp_entrada INSP_EXT2 ON INSP_ENT.fk_insp_ext_2 = INSP_EXT2.id_checklist_insp_ent
                    LEFT JOIN pd_inspecciones_insp_entrada INSP_FOSA ON INSP_ENT.fk_insp_fosa = INSP_FOSA.id_checklist_insp_ent
                    LEFT JOIN pd_inspecciones_insp_entrada INSP_REPOP ON INSP_ENT.fk_insp_reporte_operador = INSP_REPOP.id_checklist_insp_ent
                    LEFT JOIN pd_inspecciones_insp_entrada INSP_EXP ON INSP_ENT.fk_insp_expres = INSP_EXP.id_checklist_insp_ent
                WHERE
                    PAU.unidad LIKE :searchTerm
                ORDER BY
                    INSP_ENT.id_inspeccion_entrada DESC;
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

    app.confirmarIngresoAFosa = async (req, res) => {
        
        const { idpickandup, id_usuario, base } = req.body;
        let t;
        try {
            t = await Sequelize.transaction();

            const UnidadEnFosaExist = await Pickandup.findOne({
                where: {
                    estatus: 'en_fosa_inspeccion_entrada',
                    base: base
                }
            });

            if(UnidadEnFosaExist){
                // console.log(UnidadEnFosaExist)
                return res.status(200).json({
                    OK: false,
                    msg: 'Ya hay una unidad en fosa',
                    result: null
                });
            }

            const inspeccionCreada = await InspeccionEntrada.create(
                {
                    fk_usuario_confirmacion_fosa: id_usuario,
                    fecha_hora_inicio: moment()
                },
                { transaction: t }
            )

            await Pickandup.update(
                {
                    estatus: 'en_fosa_inspeccion_entrada',
                    fk_inspeccion_entrada: inspeccionCreada.id_inspeccion_entrada
                },
                {
                    where: {
                        idpickandup: idpickandup
                    },
                    transaction: t
                }
            );
            
            await t.commit();
            io.emit('FOSA_INSPECCION_ENTRADA_ACTUALIZADA');
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

    app.crearReporteDanos = async (req, res) => {

        let t;

        try {
            t = await Sequelize.transaction();

            // console.log(req.body);
            // console.log(req.files);
            
            const {
                idpickandup,
                fk_usuario,
                fecha_reporte,
                folio_intercambio,
                descripcion,
                aplica_cargo_operador,
                piezas,
                llanta_golpe_int_ext,
                llanta_numero,
                llanta_fecha_fabricacion,
                llanta_milimetraje,
                llanta_observaciones,
            } = req.body;

            const imagenesEvidencia = req.files;

            let dataReporteDanos = {
                fk_usuario: Number(fk_usuario),
                fecha_reporte: Date(fecha_reporte),
                folio_intercambio: folio_intercambio === 'null' ? null : folio_intercambio,
                descripcion: String(descripcion),
                aplica_cargo_operador: aplica_cargo_operador === 'true' || aplica_cargo_operador === true,
                llanta_golpe_int_ext,
                llanta_numero,
                llanta_fecha_fabricacion,
                llanta_milimetraje,
                llanta_observaciones,
            };

            const piezasReportadas = JSON.parse(piezas)

            const fotosEvidencia = [                
                'foto_evidencia_1',
                'foto_evidencia_2',
                'foto_evidencia_3',
                'foto_evidencia_4',
                'foto_evidencia_5',
                'foto_evidencia_6',
            ];
    
            const uploadedFotos = {};
            if (Array.isArray(imagenesEvidencia)) {
                for (const doc of imagenesEvidencia) {
                    uploadedFotos[doc.fieldname] = [doc];
                }
            } else {
                uploadedFotos = documentosEvidencias || {};
            }

            for (let foto of fotosEvidencia) {
                const archivoRecibido = uploadedFotos?.[foto]?.[0]?.filename;
                if (archivoRecibido) {
                    dataReporteDanos[foto] = archivoRecibido;
                }
            }

            const reportedanos = await InspeccionReporteDanos.create(dataReporteDanos, { transaction: t });
            const fk_insp_reporte_danos = reportedanos.id_insp_reporte_danos;

            let id_inspeccion_entrada;

            const checkInspeccionExiste = await Pickandup.findOne({
                where: { idpickandup: idpickandup },
                attributes: ['fk_inspeccion_entrada'],
                include: [
                    {
                        model: InspeccionEntrada,
                        attributes: ['fk_insp_reporte_danos', 'fk_insp_reporte_danos_2']
                    }
                ]
            });

            const InspeccionExistente = checkInspeccionExiste?.dataValues;

            id_inspeccion_entrada = InspeccionExistente?.fk_inspeccion_entrada

            // console.log(InspeccionExistente)

            if(!InspeccionExistente.fk_inspeccion_entrada){
                const inspeccionInit = await InspeccionEntrada.create(
                    { fk_insp_reporte_danos: fk_insp_reporte_danos },
                    { transaction: t }
                );

                id_inspeccion_entrada = inspeccionInit.id_inspeccion_entrada;

                await Pickandup.update(
                    { fk_inspeccion_entrada: id_inspeccion_entrada },
                    { 
                        where: { idpickandup: idpickandup },
                        transaction: t
                    }
                )
            }

            const checkEsPrimerReporte = !InspeccionExistente?.InspeccionEntrada?.fk_insp_reporte_danos
            if(checkEsPrimerReporte){

                await InspeccionEntrada.update(
                    { fk_insp_reporte_danos: fk_insp_reporte_danos},
                    {
                        where: { id_inspeccion_entrada: id_inspeccion_entrada },
                        transaction: t
                    }
                );
            } else {
                await InspeccionEntrada.update(
                    { fk_insp_reporte_danos_2: fk_insp_reporte_danos},
                    {
                        where: { id_inspeccion_entrada: id_inspeccion_entrada },
                        transaction: t
                    }
                );
            }

            for (let i = 0; i < piezasReportadas.length; i++) {
                if(piezasReportadas[i].cantidad === ''){
                    piezasReportadas[i] = { ...piezasReportadas[i], cantidad: null };
                }
                if(piezasReportadas[i].costo === ''){
                    piezasReportadas[i] = { ...piezasReportadas[i], costo: null };
                }
                piezasReportadas[i] = { ...piezasReportadas[i], fk_insp_reporte_danos };
            }

            await PiezasReporteDanos.bulkCreate(piezasReportadas, { transaction: t });

            const ReporteDanosCompleto = await Pickandup.findOne({
                where: {
                    fk_inspeccion_entrada: id_inspeccion_entrada,

                },
                attributes: [
                    'idpickandup',
                    'unidad',
                    'division',
                    'unidad_negocio',
                    'cargado',
                    'operador',
                    'fk_inspeccion_entrada'
                ],
                include: [
                    {model: Entrada, attributes: ['rem_1']},
                    {
                        model: InspeccionEntrada,
                        attributes: ['fk_insp_reporte_danos'],
                        include: [
                            {
                                model: InspeccionReporteDanos,
                                attributes: [
                                    'id_insp_reporte_danos',
                                    'fk_usuario',
                                    'fecha_reporte',
                                    'folio_intercambio',
                                    'descripcion',
                                    'aplica_cargo_operador',
                                    'llanta_golpe_int_ext',
                                    'llanta_numero',
                                    'llanta_fecha_fabricacion',
                                    'llanta_milimetraje',
                                    'llanta_observaciones',
                                ],
                                include: [
                                    {
                                        model: PiezasReporteDanos,
                                        as: 'piezas_reporte_danos',
                                        attributes: ['fk_insp_reporte_danos','cantidad', 'pieza', 'costo']
                                    }
                                ],
                            },
                            {
                                model: InspeccionReporteDanos,
                                as: 'ReporteDanos2',
                                attributes: [
                                    'id_insp_reporte_danos',
                                    'fk_usuario',
                                    'fecha_reporte',
                                    'folio_intercambio',
                                    'descripcion',
                                    'aplica_cargo_operador',
                                    'llanta_golpe_int_ext',
                                    'llanta_numero',
                                    'llanta_fecha_fabricacion',
                                    'llanta_milimetraje',
                                    'llanta_observaciones',
                                ],
                                include: [
                                    {
                                        model: PiezasReporteDanos,
                                        as: 'piezas_reporte_danos',
                                        attributes: ['fk_insp_reporte_danos','cantidad', 'pieza', 'costo']
                                    }
                                ],
                            }
                        ]
                    }
                ],
                transaction: t
            });

            let dataset = {}

            if(checkEsPrimerReporte){
                dataset = {
                    idpickandup: ReporteDanosCompleto.idpickandup,
                    unidad: ReporteDanosCompleto.unidad,
                    rem_1: ReporteDanosCompleto.Entrada.rem_1,
                    division: ReporteDanosCompleto.division,
                    unidad_negocio: ReporteDanosCompleto.unidad_negocio,
                    cargado: ReporteDanosCompleto.cargado,
                    operador: ReporteDanosCompleto.operador,
                    fk_inspeccion_entrada: ReporteDanosCompleto.fk_inspeccion_entrada,
                    ...(ReporteDanosCompleto.InspeccionEntrada && ReporteDanosCompleto.InspeccionEntrada.InspeccionReporteDano
                    ? {
                        id_insp_reporte_danos: ReporteDanosCompleto.InspeccionEntrada.InspeccionReporteDano.id_insp_reporte_danos,
                        fk_usuario: ReporteDanosCompleto.InspeccionEntrada.InspeccionReporteDano.fk_usuario,
                        fecha_reporte: moment(ReporteDanosCompleto.InspeccionEntrada.InspeccionReporteDano.fecha_reporte).format('DD/MM/YY HH:mm'),
                        folio_intercambio: ReporteDanosCompleto.InspeccionEntrada.InspeccionReporteDano.folio_intercambio,
                        descripcion: ReporteDanosCompleto.InspeccionEntrada.InspeccionReporteDano.descripcion,
                        aplica_cargo_operador: ReporteDanosCompleto.InspeccionEntrada.InspeccionReporteDano.aplica_cargo_operador,
                        llanta_golpe_int_ext: ReporteDanosCompleto.InspeccionEntrada.InspeccionReporteDano.llanta_golpe_int_ext,
                        llanta_numero: ReporteDanosCompleto.InspeccionEntrada.InspeccionReporteDano.llanta_numero,
                        llanta_fecha_fabricacion: ReporteDanosCompleto.InspeccionEntrada.InspeccionReporteDano.llanta_fecha_fabricacion,
                        llanta_milimetraje: ReporteDanosCompleto.InspeccionEntrada.InspeccionReporteDano.llanta_milimetraje,
                        llanta_observaciones: ReporteDanosCompleto.InspeccionEntrada.InspeccionReporteDano.llanta_observaciones,
                        piezas_reporte_danos: ReporteDanosCompleto.InspeccionEntrada.InspeccionReporteDano.piezas_reporte_danos.map(pieza => pieza.dataValues)
                    }
                    : {})
                }
            } else {
                dataset = {
                    idpickandup: ReporteDanosCompleto.idpickandup,
                    unidad: ReporteDanosCompleto.unidad,
                    rem_1: ReporteDanosCompleto.Entrada.rem_1,
                    division: ReporteDanosCompleto.division,
                    unidad_negocio: ReporteDanosCompleto.unidad_negocio,
                    cargado: ReporteDanosCompleto.cargado,
                    operador: ReporteDanosCompleto.operador,
                    fk_inspeccion_entrada: ReporteDanosCompleto.fk_inspeccion_entrada,
                    ...(ReporteDanosCompleto.InspeccionEntrada && ReporteDanosCompleto.InspeccionEntrada.ReporteDanos2
                    ? {
                        id_insp_reporte_danos: ReporteDanosCompleto.InspeccionEntrada.ReporteDanos2.id_insp_reporte_danos,
                        fk_usuario: ReporteDanosCompleto.InspeccionEntrada.ReporteDanos2.fk_usuario,
                        fecha_reporte: moment(ReporteDanosCompleto.InspeccionEntrada.ReporteDanos2.fecha_reporte).format('DD/MM/YY HH:mm'),
                        folio_intercambio: ReporteDanosCompleto.InspeccionEntrada.ReporteDanos2.folio_intercambio,
                        descripcion: ReporteDanosCompleto.InspeccionEntrada.ReporteDanos2.descripcion,
                        aplica_cargo_operador: ReporteDanosCompleto.InspeccionEntrada.ReporteDanos2.aplica_cargo_operador,
                        llanta_golpe_int_ext: ReporteDanosCompleto.InspeccionEntrada.ReporteDanos2.llanta_golpe_int_ext,
                        llanta_numero: ReporteDanosCompleto.InspeccionEntrada.ReporteDanos2.llanta_numero,
                        llanta_fecha_fabricacion: ReporteDanosCompleto.InspeccionEntrada.ReporteDanos2.llanta_fecha_fabricacion,
                        llanta_milimetraje: ReporteDanosCompleto.InspeccionEntrada.ReporteDanos2.llanta_milimetraje,
                        llanta_observaciones: ReporteDanosCompleto.InspeccionEntrada.ReporteDanos2.llanta_observaciones,
                        piezas_reporte_danos: ReporteDanosCompleto.InspeccionEntrada.ReporteDanos2.piezas_reporte_danos.map(pieza => pieza.dataValues)
                    }
                    : {})
                }
            }

            // console.log(dataset)
            
            const imagenes = req.files.map(file => {
                const fullPath = path.resolve(file.path);
                const ext = path.extname(fullPath).substring(1);
                const base64 = fs.readFileSync(fullPath, { encoding: 'base64' });
                return `data:image/${ext};base64,${base64}`;
            });           
            
            // Cargar plantilla
            const templateHtml = await fsx.readFile('./templates/reporte_danos_template.hbs', 'utf8');
            const template = handlebars.compile(templateHtml);

            // Renderizar HTML con datos
            const html = template({
                ...dataset,
                imagenes,
            });

            // Generar PDF con Puppeteer
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.setContent(html, { waitUntil: 'networkidle0' });

            // Crear pdf
            const pdfName = `reportedanos-${dataset.unidad}-${dataset.id_insp_reporte_danos}-${Date.now()}.pdf`;
            const pdfPath = `./uploads/inspeccion/reportedanos/${pdfName}`;
            await page.pdf({ path: pdfPath, format: 'A4', printBackground: true });

            await browser.close();

            await InspeccionReporteDanos.update(
                { pdf_reporte_danos: pdfName },
                {
                    where: { id_insp_reporte_danos: dataset.id_insp_reporte_danos },
                    transaction: t
                }
            );

            await t.commit();
            return res.status(200).json({
                OK: true,
                msg: 'Reporte de daños creado correctamente',
                result: pdfName
            });

        } catch (error) {
            if (t) await t.rollback();
            console.error('Error al crear reporte daños:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.guardarChecklistInspeccion = async (req, res) => {

        let t;

        try {
            t = await Sequelize.transaction();
            let { checklist, id_inspeccion_entrada, checklistSeleccionado, ...inspeccionData } = req.body;

            inspeccionData.checklist = checklistSeleccionado;
            const inspeccionHecha = await InspeccionesInspEntrada.create(inspeccionData, { transaction: t });

            let sucesivo = 0;

            if(checklist.length > 0){
                checklist.forEach((check) => {
                    check.fk_checklist_insp_ent = inspeccionHecha.id_checklist_insp_ent;
                    if(check.foto_hallazgo_1){
                        check.foto_hallazgo_1 = saveBase64File(check.foto_hallazgo_1, 'foto_hallazgo_1', inspeccionHecha.id_checklist_insp_ent, sucesivo);
                        sucesivo++;
                    }
    
                    if(check.foto_hallazgo_2){
                        check.foto_hallazgo_2 = saveBase64File(check.foto_hallazgo_2, 'foto_hallazgo_2', inspeccionHecha.id_checklist_insp_ent, sucesivo);
                        sucesivo++;
                    }
                });
                // console.log(checklist)
                await HallazgosInspEntrada.bulkCreate(checklist, { transaction: t });
            }

            let fk;

            switch (checklistSeleccionado) {
                case 'pd_insp_ext_1':
                    fk = 'fk_insp_ext_1'
                    break;

                case 'pd_insp_ext_2':
                    fk = 'fk_insp_ext_2'
                    break;

                case 'pd_insp_fosa':
                    fk = 'fk_insp_fosa'
                    break;

                case 'insp_reporte_op':
                    fk = 'fk_insp_reporte_operador'
                    break;

                case 'pd_insp_expres':
                    fk = 'fk_insp_expres'
                    break;
            
                default:
                    break;
            }

            await InspeccionEntrada.update(
                { [fk]: inspeccionHecha.id_checklist_insp_ent },
                {
                    where: { id_inspeccion_entrada: id_inspeccion_entrada },
                    transaction: t
                }
            )

            const unidadInspeccionada = await InspeccionEntrada.findOne({
                attributes: ['fk_insp_ext_1', 'fk_insp_ext_2', 'fk_insp_fosa', 'fk_insp_reporte_operador', 'fk_insp_expres'],
                where: { id_inspeccion_entrada: id_inspeccion_entrada },
                transaction: t
            });

            if(unidadInspeccionada.fk_insp_expres){

                if(unidadInspeccionada.fk_insp_expres && unidadInspeccionada.fk_insp_reporte_operador){
                    await Pickandup.update(
                        {estatus: 'mantenimiento'},
                        {
                            where: { fk_inspeccion_entrada: id_inspeccion_entrada },
                            transaction: t
                        }
                    );

                    await InspeccionEntrada.update(
                        { fecha_hora_fin: moment() },
                        {
                            where: { 
                                id_inspeccion_entrada: id_inspeccion_entrada
                            },
                            transaction: t
                        }
                    );
                }
                
            } else {

                if(unidadInspeccionada.fk_insp_ext_1 && unidadInspeccionada.fk_insp_ext_2 && unidadInspeccionada.fk_insp_fosa && unidadInspeccionada.fk_insp_reporte_operador){
                    await Pickandup.update(
                        {estatus: 'mantenimiento'},
                        {
                            where: { fk_inspeccion_entrada: id_inspeccion_entrada },
                            transaction: t
                        }
                    );

                    await InspeccionEntrada.update(
                        { fecha_hora_fin: moment() },
                        {
                            where: { 
                                id_inspeccion_entrada: id_inspeccion_entrada
                            },
                            transaction: t
                        }
                    );
                }

            }


            await t.commit();

            io.emit('FOSA_INSPECCION_ENTRADA_ACTUALIZADA');
            io.emit('INSPECCION_ENTRADA_FINALIZADA');

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

    app.actualizarEvidenciasInspeccionEntrada = async (req, res) => {

        const {
            idpickandup,
            id_inspeccion_entrada,
            id_usuario,
            tracto_ot_correctivo,
            re1_ot_correctivo,
            dl_ot_correctivo,
            re2_ot_correctivo,
            tracto_ot_preventivo,
            re1_ot_preventivo,
            dl_ot_preventivo,
            re2_ot_preventivo
        } = req.body;

        const documentosEvidencias = req.files;
        
        const evidenciasPath = path.join(__dirname, '../../../uploads/videos_inspeccion_entrada');
        
        let t;
        let evidenciasPorActualizar = {};

        try {
            t = await Sequelize.transaction();

            const columnasEvidencias = [
                'video_insp_ext_1',
                'video_insp_ext_2',
                'video_insp_fosa',
                'video_insp_reporte_operador',
            ];

            const evidenciasExistentes = await InspeccionEntrada.findOne({
                attributes: columnasEvidencias,
                where: { id_inspeccion_entrada: id_inspeccion_entrada },
                transaction: t,
            });

            let documentosMap = {};
            if (Array.isArray(documentosEvidencias)) {
                for (const doc of documentosEvidencias) {
                    documentosMap[doc.fieldname] = [doc];
                }
            } else {
                documentosMap = documentosEvidencias || {};
            }

            for (let evidencia of columnasEvidencias) {
                const archivoRecibido = documentosMap?.[evidencia]?.[0]?.filename;
                if (archivoRecibido) {
                    if (evidenciasExistentes[evidencia]) {
                        EliminarEvidenciaAnterior(evidenciasExistentes[evidencia], evidenciasPath);
                    }
                    evidenciasPorActualizar[evidencia] = archivoRecibido;
                }
            }

            await InspeccionEntrada.update(
                evidenciasPorActualizar,
                {
                    where: { id_inspeccion_entrada: id_inspeccion_entrada },
                    transaction: t,
                }
            );

            const mantenimiento = await Pickandup.findByPk(
                idpickandup,
                {
                    attributes: ['fk_mantenimiento'],
                    transaction: t
                }
            )

            const check_ots = (
                tracto_ot_correctivo
                || re1_ot_correctivo
                || dl_ot_correctivo
                || re2_ot_correctivo
                || tracto_ot_preventivo
                || re1_ot_preventivo
                || dl_ot_preventivo
                || re2_ot_preventivo
            );
            
            const check_mtto = mantenimiento.fk_mantenimiento ? true : false;

            const ots = {
                tracto_ot_correctivo: tracto_ot_correctivo,
                re1_ot_correctivo: re1_ot_correctivo,
                dl_ot_correctivo: dl_ot_correctivo,
                re2_ot_correctivo: re2_ot_correctivo,
                tracto_ot_preventivo: tracto_ot_preventivo,
                re1_ot_preventivo: re1_ot_preventivo,
                dl_ot_preventivo: dl_ot_preventivo,
                re2_ot_preventivo: re2_ot_preventivo
            }

            if( check_mtto && check_ots ) {
                await Mantenimiento.update(
                    ots,
                    {
                        where: { id_mantenimiento: mantenimiento.fk_mantenimiento },
                        transaction: t
                    }
                )
            } else if( !check_mtto && check_ots ) {
                const mantenimientoCreado = await Mantenimiento.create(ots, { transaction: t });

                await Pickandup.update(
                    { fk_mantenimiento: mantenimientoCreado.id_mantenimiento },
                    { where: { idpickandup: idpickandup }, transaction: t}
                )
            }

            await t.commit();

            io.emit('INSPECCION_ENTRADA_EVIDENCIAS_ACTUALIZADAS');

            return res.json({
                OK: true,
                msg: 'Evidencias actualizadas correctamente'
            });

        } catch (error) {
            if (t) await t.rollback();
            console.error('Error en actualizar evidencias:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.obtenerResumenInspeccionesEntrada = async (req, res) => {

        try {

            const query = `
                SELECT
                    PAU.base,
                    PAU.unidad,
                    PAU.division,
                    PAU.unidad_negocio,
                    DATE(INS_ENT.creado_el) as fecha_inspeccion
                FROM
                    pd_inspeccion_entrada INS_ENT
                    LEFT JOIN pd_pickandup PAU ON INS_ENT.id_inspeccion_entrada = PAU.fk_inspeccion_entrada;
            `;

            const results = await Sequelize.query(query, {
                type: Sequelize.QueryTypes.SELECT
            });

            return res.status(200).json(results);

        } catch (error) {
            console.error('Error al obtener reporte unidades inspeccionadas entrada:', error);
            return res.status(500).json({
                OK: false,
                msg: error,
            });
        }
    }

    return app;
}

const EliminarEvidenciaAnterior = (nombreArchivo, filepath) => {
  if(nombreArchivo){
    const previousFilePath = path.join(filepath, nombreArchivo);
    if (fs.existsSync(previousFilePath)) {
      fs.unlinkSync(previousFilePath);
    }
  }
}