const fs = require('fs');
const fsx = require('fs-extra')
const moment = require('moment');
const path = require('path');

const puppeteer = require('puppeteer');
const handlebars = require('handlebars');



module.exports = app => {

    const Pickandup = app.database.models.PickAndUp;
    const Entrada = app.database.models.Entrada;
    const InspeccionEntrada = app.database.models.InspeccionEntrada;
    const InspeccionReporteDanos = app.database.models.InspeccionReporteDanos;
    const PiezasReporteDanos = app.database.models.PiezasReporteDanos;
    
    
    const Sequelize = app.database.sequelize;

    app.obtenerUnidadesConEntrada = async (req, res) => {
        
        const { base } = req.params;

        try {

            const unidades = await Pickandup.findAll({
                attributes: [
                    'idpickandup',
                    'unidad',
                ],
                include: [
                    {
                        model: Entrada,
                        attributes: ['fecha_entrada']
                    }
                ],
                where: {
                    estatus: 'entrada',
                    base: base,
                },
                order: [
                    [{ model: Entrada }, 'fecha_entrada', 'ASC'],
                ]
            });

            return res.status(200).json({
                OK: true,
                unidades: unidades
            });
            
        } catch (error) {
            console.error('Error en Programar Arribo:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.confirmarIngresoAFosa = async (req, res) => {
        
        const { idpickandup, id_usuario } = req.body;
        let t;
        try {
            t = await Sequelize.transaction();

            const inspeccionCreada = await InspeccionEntrada.create(
                {fk_usuario_confirmacion_fosa: id_usuario},
                { transaction: t }
            )

            await Pickandup.update(
                {
                    estatus: 'en_fosa_inspeccion',
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
                    PAU.cargado,
                    PAU.operador,
                    IE.fk_insp_reporte_danos,
                    IE.creado_el,
                    IE.actualizado_el,
                    E.fecha_entrada,
                    E.rem_1
                FROM 
                    pd_pickandup PAU
                    LEFT JOIN pd_inspeccion_entrada IE ON PAU.fk_inspeccion_entrada = IE.id_inspeccion_entrada
                    LEFT JOIN pd_entrada E ON PAU.fk_entrada = E.id_entrada
                WHERE
                    PAU.estatus = 'en_fosa_inspeccion'
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