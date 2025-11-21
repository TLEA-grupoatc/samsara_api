const fs = require('fs');
const moment = require('moment');
const path = require('path');

const axios = require('axios');
const { Op } = require('sequelize');


module.exports = app => {

    const Pickandup = app.database.models.PickAndUp;
    const Entrada = app.database.models.Entrada;
    const Evidencias = app.database.models.Evidencias;
    const InspeccionEntrada = app.database.models.InspeccionEntrada;
    const InspeccionReporteDanos = app.database.models.InspeccionReporteDanos;

    const Cliente = app.database.models.Clientes;

    const Sequelize = app.database.sequelize;

    app.obtenerUnidadesMantenimientoEv = async (req, res) => {
        
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
                    estatus: 'mantenimiento',
                    base: base,
                    fk_evidencias: null
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

    app.ObtenerBusquedaEvidencias = async(request, response) => {
        try {
            const { search } = request.body;
            const { page = 1, limit = 100 } = request.query;
            const offset = (page - 1) * limit;
    
            const unidades = await Pickandup.findAll({
                attributes: [
                    'idpickandup',
                    'unidad',
                    'operador',
                    'estatus',
                    'division',
                    'unidad_negocio',
                    'cargado',
                ],
                include: [
                    {
                        model: Entrada,
                        attributes: ['fecha_entrada', 'reporte_operador']
                    },
                    {
                        model: Evidencias,
                    },
                    {
                        model: InspeccionEntrada,
                        attributes: ['fk_insp_reporte_danos'],
                        include: [
                            {
                                model: InspeccionReporteDanos,
                                attributes: ['pdf_reporte_danos'],
                            },
                            {
                                model: InspeccionReporteDanos,
                                as: 'ReporteDanos2',
                                attributes: ['pdf_reporte_danos'],
                            }
                        ]
                    },
                    {
                        model: Cliente,
                        attributes: ['cliente']
                    }
                ],
                where: {
                    [Op.and]: [
                        {
                            [Op.or]: [
                                { unidad: { [Op.like]: `%${search}%` } },
                                { operador: { [Op.like]: `%${search}%` } },
                                Sequelize.where(
                                    Sequelize.fn('DATE_FORMAT', Sequelize.col('Entrada.fecha_entrada'), '%d/%m/%Y'),
                                    {
                                        [Op.like]: `%${search}%`
                                    }
                                )
                            ]
                        }
                    ]
                },
                order: [
                    [{ model: Entrada }, 'id_entrada', 'DESC']
                ],
                limit: parseInt(limit),
                offset: parseInt(offset)
            });

            // console.log(unidades)
        
            return response.status(200).json({
                page: parseInt(page),
                limit: parseInt(limit),
                unidades: unidades
            });
        } catch (error) {
            console.error('Error al buscar', error);
            return response.status(500).json({ error: 'Error interno del servidor' });
        }
    };

    app.confirmarEntradaAMtto = async (req, res) => {
        
        const { idpickandup, id_usuario, EntradaIngresoMtto } = req.body;

        let t;

        try {

            t = await Sequelize.transaction();

            let ingreso_mtto = false;
            
            let estatus; 

            if(EntradaIngresoMtto){
                ingreso_mtto = true;
                // estatus = 'evidencias'
            } else {
                // estatus = 'resguardo'
            }

            const nuevaEvidencia = await Evidencias.create(
                {
                    ingreso_mtto: ingreso_mtto,
                    fk_usuario: id_usuario,
                },
                { transaction: t }
            );

            await Pickandup.update(
                {
                    fk_evidencias: nuevaEvidencia.id_evidencias,
                    estatus: estatus
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
                unidades: nuevaEvidencia
            });
            
        } catch (error) {
            if (t) await t.rollback();
            console.error('Error en confirmar entrada mtto:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.obtenerUnidadesyEvidencias = async (req, res) => {

        const { base } = req.params

        try {

            const unidades = await Pickandup.findAll({
                attributes: [
                    'idpickandup',
                    'unidad',
                    'operador',
                    'estatus',
                    'division',
                    'unidad_negocio',
                    'cargado',
                ],
                include: [
                    {
                        model: Entrada,
                        attributes: ['fecha_entrada', 'reporte_operador']
                    },
                    {
                        model: Evidencias,
                    },
                    {
                        model: InspeccionEntrada,
                        attributes: ['fk_insp_reporte_danos'],
                        include: [
                            {
                                model: InspeccionReporteDanos,
                                attributes: [
                                    'pdf_reporte_danos',
                                ],
                            },
                            {
                                model: InspeccionReporteDanos,
                                as: 'ReporteDanos2',
                                attributes: [
                                    'pdf_reporte_danos',
                                ],
                            }
                        ]
                    },
                    {
                        model: Cliente,
                        attributes: ['cliente']
                    }
                ],
                where: {
                    estatus: {
                        [Op.notIn]: ['salida_salida', 'salida_hallazgo']
                    },
                    fk_evidencias: {
                        [Op.ne]: null
                    },
                    base: base
                },
                order: [
                    [{ model: Evidencias }, 'ingreso_mtto', 'DESC'],
                    [{ model: Entrada }, 'fecha_entrada', 'ASC']
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

    app.actualizarEvidencias = async (req, res) => {
        // console.log(req);
        // console.log(req.files);
        // console.log(req.body);
        const datosEvidencias = req.body;
        const documentosEvidencias = req.files;
        
        const evidenciasPath = path.join(__dirname, '../../../uploads/evidenciasunidades');
        
        let t;
        let evidenciasPorActualizar = {...datosEvidencias};

        try {
            t = await Sequelize.transaction();

            const columnasEvidencias = [
                'firma_operador',
                'video_inspeccion_salida',
                'tracto_ot_mtto_correctivo',
                'tracto_ot_mtto_preventivo',
                're1_ot_mtto_correctivo',
                're1_ot_mtto_preventivo',
                'dl_ot_mtto_correctivo',
                'dl_ot_mtto_preventivo',
                're2_ot_mtto_correctivo',
                're2_ot_mtto_preventivo',
            ];

            // console.log(datosEvidencias)

            const evidenciasExistentes = await Evidencias.findOne({
                attributes: columnasEvidencias,
                where: { id_evidencias: datosEvidencias.id_evidencias },
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
                // console.log(archivoRecibido);
                if (archivoRecibido) {
                    // console.log(archivoRecibido, 'archivoRecibido');

                    if (evidenciasExistentes[evidencia]) {
                        EliminarEvidenciaAnterior(evidenciasExistentes[evidencia], evidenciasPath);
                    }
                    evidenciasPorActualizar[evidencia] = archivoRecibido;
                }
            }

            await Evidencias.update(
                evidenciasPorActualizar,
                {
                    where: { id_evidencias: datosEvidencias.id_evidencias },
                    transaction: t,
                }
            );

            await t.commit();

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

    // const unidadesProgramadasConEntrada = async (req, res) => {

    //     try {

    //     } catch (error) {
    //         console.error('Error en Programar Arribo:', error);
    //         return res.status(500).json({ 
    //             OK: false,
    //             msg: error,
    //         });
    //     }
    // }

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