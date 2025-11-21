const path = require('path');
const fs = require('fs');
const moment = require("moment");

const axios = require('axios');


module.exports = app => {
    
    const Pickandup = app.database.models.PickAndUp;

    const InspeccionEntrada = app.database.models.InspeccionEntrada;
    const Entrada = app.database.models.Entrada;
    const Mantenimiento = app.database.models.Mantenimiento;

    const Sequelize = app.database.sequelize;
    const io = app.io;

    const sql = require('mssql');
    const sqlConfig = require('../../libs/configMSSQL');

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

    // Advan
    app.obtenerRefaccionesOT = async (req, res) => {
        try {

            const ots = req.body;

            console.log(ots)

            await sql.connect(sqlConfig);

            const query = `
                SELECT
                    folio AS ot,
                    TRIM(num_eco) AS unidad,
                    TRIM(producto_clave) AS producto_clave,
                    TRIM(unidad_clave) AS unidad_clave,
                    TRIM(producto_descrip) AS producto_descrip,
                    cantidad,
                    cantidad_rec
                FROM
                    vConsInsumosPendientes
                WHERE
                    folio IN (${ots});
            `
            const result = await sql.query(query);

            return res.status(200).json({
                OK: true,
                msg: 'Refacciones obtenidas correctamente',
                result: result.recordset
            });
        } catch (error) {
            res.status(500).send('Error al Obtener los registros: ' + error.message);
        } finally {
            sql.close();
        }
    }

    app.obtenerUnidadesCarrilesEspejo = async (req, res) => {
        try {

            const { base } = req.params;

            const carrilesEspejo = await Sequelize.query(
                `
                SELECT
                    PAU.idpickandup,
                    PAU.unidad,
                    PAU.division,
                    PAU.unidad_negocio,
                    ENT.fecha_entrada AS fecha_ingreso_base,
                    INSP_ENT.fecha_hora_fin AS 	fecha_ingreso_taller,
                    DATEDIFF(CURDATE(), DATE(INSP_ENT.fecha_hora_fin)) AS dias_taller,
                    MAN.carril,
                    MAN.estatus,
                    MAN.tipo_mtto,
                    COALESCE(MAN.eta_2, MAN.eta_1, NULL) AS eta,
                    MAN.fecha_ingreso_carril,
                    MAN.id_mantenimiento,
                    MAN.tracto_ot_correctivo,
                    MAN.re1_ot_correctivo,
                    MAN.dl_ot_correctivo,
                    MAN.re2_ot_correctivo,
                    MAN.tracto_ot_preventivo,
                    MAN.re1_ot_preventivo,
                    MAN.dl_ot_preventivo,
                    MAN.re2_ot_preventivo
                FROM
                    pd_mantenimiento MAN
                    LEFT JOIN pd_pickandup PAU ON MAN.id_mantenimiento = PAU.fk_mantenimiento
                    LEFT JOIN pd_entrada ENT ON PAU.fk_entrada = ENT.id_entrada
                    LEFT JOIN pd_inspeccion_entrada INSP_ENT ON PAU.fk_inspeccion_entrada = INSP_ENT.id_inspeccion_entrada
                WHERE
                    MAN.carril LIKE 'e-%'
                    AND PAU.base = :base;
                `,
                {
                    replacements: { base: base, },
                    type: Sequelize.QueryTypes.SELECT
                }
            );

            const carriles = {
                'e-1': null,
                'e-2': null,
                'e-3': null,
                'e-4': null,
                'e-5': null,
                'e-6': null,
                'e-7': null,
                'e-8': null,
                'e-9': null,
                'e-10': null,
                'e-11': null,
                'e-12': null,
                'e-13': null,
                // 'e-14': null,
                // 'e-15': null,
            };

            if(carrilesEspejo.length !== 0){
                const unidadesEnCarril = await obtenerAvanceOT(carrilesEspejo);
    
                Object.keys(carriles).forEach(key => {
                    const matches = unidadesEnCarril.filter(item => item.carril === key);
                    if (matches.length === 1) {
                        carriles[key] = matches[0];
                    } else {
                        carriles[key] = null;
                    }
                });
            }

            return res.status(200).json({
                OK: true,
                msg: 'Carriles espejo obtenidos correctamente',
                result: carriles
            });
        } catch (error) {
            return res.status(500).send('Error al Obtener carriles taller: ' + error.message);
        }
    }

    app.obtenerUnidadesCarrilesTaller = async (req, res) => {
        try {

            const { base } = req.params;

            const carrilesTaller = await Sequelize.query(
                `
                SELECT
                    PAU.idpickandup,
                    PAU.unidad,
                    PAU.division,
                    PAU.unidad_negocio,
                    ENT.fecha_entrada AS fecha_ingreso_base,
                    INSP_ENT.fecha_hora_fin AS 	fecha_ingreso_taller,
                    DATEDIFF(CURDATE(), DATE(INSP_ENT.fecha_hora_fin)) AS dias_taller,
                    MAN.carril,
                    MAN.estatus,
                    MAN.tipo_mtto,
                    COALESCE(MAN.eta_2, MAN.eta_1, NULL) AS eta,
                    MAN.fecha_ingreso_carril,
                    MAN.id_mantenimiento,
                    MAN.tracto_ot_correctivo,
                    MAN.re1_ot_correctivo,
                    MAN.dl_ot_correctivo,
                    MAN.re2_ot_correctivo,
                    MAN.tracto_ot_preventivo,
                    MAN.re1_ot_preventivo,
                    MAN.dl_ot_preventivo,
                    MAN.re2_ot_preventivo
                FROM
                    pd_mantenimiento MAN
                    LEFT JOIN pd_pickandup PAU ON MAN.id_mantenimiento = PAU.fk_mantenimiento
                    LEFT JOIN pd_entrada ENT ON PAU.fk_entrada = ENT.id_entrada
                    LEFT JOIN pd_inspeccion_entrada INSP_ENT ON PAU.fk_inspeccion_entrada = INSP_ENT.id_inspeccion_entrada
                WHERE
                    ( MAN.carril LIKE 't-%' OR MAN.carril = 'llan' OR MAN.carril = 'imagen' )
                    AND PAU.base = :base;
                `,
                {
                    replacements: { base: base, },
                    type: Sequelize.QueryTypes.SELECT
                }
            );


            const carriles = {
                't-1': null,
                't-2': null,
                't-3': null,
                't-4': null,
                't-5': null,
                't-6': null,
                't-7': null,
                't-8': null,
                't-9': null,
                't-10': null,
                'imagen': null,
                'llan': null,
            };

            if(carrilesTaller.length > 0){
                const unidadesEnCarril = await obtenerAvanceOT(carrilesTaller);
    
                Object.keys(carriles).forEach(key => {
                    const matches = unidadesEnCarril.filter(item => item.carril === key);
                    if (matches.length === 1) {
                        carriles[key] = matches[0];
                    } else {
                        carriles[key] = null;
                    }
                });
            }

            
            return res.status(200).json({
                OK: true,
                msg: 'Carriles taller obtenidos correctamente',
                result: carriles
            });
        } catch (error) {
            return res.status(500).send('Error al Obtener carriles taller: ' + error.message);
        }
    }

    app.obtenerCuarentena = async (req, res) => {

        try {

            const { base } = req.params;

            const cuarentena = await Sequelize.query(
                `
                    SELECT
                        PAU.idpickandup,
                        PAU.unidad,
                        PAU.division,
                        PAU.unidad_negocio,
                        ENT.fecha_entrada AS fecha_ingreso_base,
                        INSP_ENT.id_inspeccion_entrada,
                        INSP_ENT.fecha_hora_fin AS fecha_ingreso_taller,
                        DATEDIFF(CURDATE(), INSP_ENT.fecha_hora_fin) AS dias_taller,
                        MAN.tipo_mtto,
                        MAN.id_mantenimiento,
                        MAN.estatus
                    FROM
                        pd_pickandup PAU
                        LEFT JOIN pd_entrada ENT ON PAU.fk_entrada = ENT.id_entrada
                        LEFT JOIN pd_inspeccion_entrada INSP_ENT ON PAU.fk_inspeccion_entrada = INSP_ENT.id_inspeccion_entrada
                        LEFT JOIN pd_mantenimiento MAN ON PAU.fk_mantenimiento = MAN.id_mantenimiento
                    WHERE
                        PAU.base = :base
                        AND PAU.estatus = :estatus
                        AND MAN.carril IS NULL
                    ORDER BY
                        INSP_ENT.fecha_hora_fin DESC;
                `,
                {
                    replacements: { base: base, estatus: 'mantenimiento' },
                    type: Sequelize.QueryTypes.SELECT
                }
            );

            return res.status(200).json({
                OK: true,
                msg: 'Unidades en cuarentena obtenidas correctamente',
                result: cuarentena
            });

        } catch (error) {
            console.error('Error al obtener unidades en cuarentena:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.actualizarMovimientosCarriles = async (req, res) => {

        let t;

        try {
            t = await Sequelize.transaction();

            const {
                id_mantenimiento_origen,
                carril_origen,
                id_mantenimiento_destino,
                carril_destino,
                socketID
            } = req.body;

            // console.log(req.body)

            await actualizarCarril(id_mantenimiento_origen, carril_origen, t);

            if(id_mantenimiento_destino){
                await actualizarCarril(id_mantenimiento_destino, carril_destino, t);
            }

            await t.commit();

            if(carril_origen.includes('e-') || carril_destino?.includes('e-')){
                io.emit('MANTENIMIENTO_CARRILES_ESPEJO_ACTUALIZADOS')
            }

            
            if(
                   carril_origen.includes('t-')
                || carril_origen.includes('llan')
                || carril_origen?.includes('ima')

                || carril_destino?.includes('t-')
                || carril_destino?.includes('llan')
                || carril_destino?.includes('ima')
            ){
                io.emit('MANTENIMIENTO_CARRILES_TALLER_ACTUALIZADOS')
            }

            if(carril_origen.includes('cua') || carril_destino?.includes('cua')){
                io.emit('MANTENIMIENTO_CUARENTENA_ACTUALIZADA')
            }

            return res.status(200).json({
                OK: true,
                msg: 'Carril actualizado correctamente',
                result: null
            });

        } catch (error) {
            console.error('Error al actualizar carril:', error);
            if (t) await t.rollback();
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.obtenerDetallesMantenimiento = async (req, res) => {

        try {

            const { idpickandup } = req.params;

            const unidad = await Pickandup.findByPk(
                idpickandup,
                {
                    attributes: [
                        'base',
                        'cargado',
                        'unidad',
                        'unidad_negocio',
                        'division',
                    ],
                    include: [
                        {
                            model: Entrada,
                            attributes: [
                                ['fecha_entrada', 'fecha_ingreso_base'],
                            ],
                        },
                        {
                            model: InspeccionEntrada,
                            attributes: [
                                ['fecha_hora_fin', 'fecha_ingreso_taller']
                            ]
                        },
                        {
                            model: Mantenimiento,
                            attributes: [
                                'id_mantenimiento',
                                'tipo_mtto',
                                'eta_1',
                                'eta_2',
                                'comentarios',
                                'estatus',
                                'carril',
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
                }
            );

            let unidadParsed = JSON.parse(JSON.stringify(unidad));

            let ots = [];

            const mantenimiento = unidadParsed.Mantenimiento;

            if (mantenimiento?.tracto_ot_correctivo) ots.push(mantenimiento.tracto_ot_correctivo);
            if (mantenimiento?.re1_ot_correctivo) ots.push(mantenimiento.re1_ot_correctivo);
            if (mantenimiento?.dl_ot_correctivo) ots.push(mantenimiento.dl_ot_correctivo);
            if (mantenimiento?.re2_ot_correctivo) ots.push(mantenimiento.re2_ot_correctivo);
            if (mantenimiento?.tracto_ot_preventivo) ots.push(mantenimiento.tracto_ot_preventivo);
            if (mantenimiento?.re1_ot_preventivo) ots.push(mantenimiento.re1_ot_preventivo);
            if (mantenimiento?.dl_ot_preventivo) ots.push(mantenimiento.dl_ot_preventivo);
            if (mantenimiento?.re2_ot_preventivo) ots.push(mantenimiento.re2_ot_preventivo);
            
            const accionesOT = await obtenerAccionesDeOTs(ots, true);

            const otsMap = accionesOT.reduce((acc, item) => {
                const otKey = item.ORDEN_CLAVE;
                if (acc[otKey]) {
                    acc[otKey].push(item);
                } else {
                    acc[otKey] = [item];
                }
                return acc;
            }, {});

            const getAccionMayorHoras = (acciones) => {
                if (!acciones || acciones.length === 0) {
                    return null;
                }

                const pendientes = acciones.filter(a => a.estatus_accion !== 'Terminada');

                if (pendientes.length === 0) {
                    return null;
                }
                
                return pendientes.reduce((maxAction, currentAction) => {
                    const currentHours = parseFloat(currentAction.ACCION_HORAS) || 0;
                    const maxHours = parseFloat(maxAction.ACCION_HORAS) || 0;
                    
                    return currentHours > maxHours ? currentAction : maxAction;
                }, pendientes[0]);
            };

            let mayor_horas = 0;
            let mayor_accion = null;
            let total_acciones = 0;
            let acciones_completas = 0;

            let newItem = Object.entries(mantenimiento).reduce((acc, [key, value]) => {

                if (key.includes('_ot_') && value !== null) {
                    
                    const relatedActions = otsMap[value];
                    if (relatedActions) {

                        const accionMayorHoras = getAccionMayorHoras(relatedActions);

                        const totalCompletas = relatedActions.filter(action => action.estatus_accion === 'Terminada').length;
                        const totalPendientes = relatedActions.filter(action => action.estatus_accion !== 'Terminada').length;

                        const totalHorasCompletas = parseFloat(relatedActions
                            .filter(action => action.estatus_accion === 'Terminada')
                            .reduce((sum, a) => sum + (parseFloat(a.ACCION_HORAS) || 0), 0)
                            .toFixed(2));
                        const totalHorasPendientes = parseFloat(relatedActions
                            .filter(action => action.estatus_accion !== 'Terminada')
                            .reduce((sum, a) => sum + (parseFloat(a.ACCION_HORAS) || 0), 0)
                            .toFixed(2));

                        const horas_actual = accionMayorHoras?.ACCION_HORAS;
                        const accion_actual = accionMayorHoras?.ACCION_DESCRIP;
                        
                        if (horas_actual && (horas_actual > mayor_horas)) {
                            mayor_horas = horas_actual;
                            mayor_accion = accion_actual;
                        }
                        
                        total_acciones += relatedActions.length;
                        acciones_completas += totalCompletas;
                        acc[key] = {
                            horas_completas: totalHorasCompletas,
                            horas_pendientes: totalHorasPendientes,
                            acciones_completas: totalCompletas,
                            acciones_pendientes: totalPendientes,
                            acciones: relatedActions
                        };
                    }
                } else if (!key.includes('_ot_')) {
                    acc[key] = value;
                }

                return acc;
            }, {});

            newItem.mayor_accion = mayor_accion;
            newItem.mayor_horas = mayor_horas;
            newItem.total_acciones = total_acciones;
            newItem.acciones_completas = acciones_completas;
            newItem.porcentaje_avance = Math.floor((acciones_completas/total_acciones)*100);
            

            unidadParsed.Mantenimiento = newItem;

            return res.status(200).json({
                OK: true,
                msg: 'Detalles mantenimiento obtenidos correctamente',
                result: unidadParsed
            });

        } catch (error) {
            console.error('Error al obtener detalles mantenimiento:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.actualizarUnidadMantenimiento = async (req, res) => {

        try {

            // const { id_mantenimiento, eta_1, eta_2, estatus, comentarios } = req.body;
            const { id_mantenimiento, carril, ...unidad } = req.body;

            await Mantenimiento.update(
                unidad,
                {
                    where: { id_mantenimiento: id_mantenimiento }
                }
            );

            if(carril?.includes('e-')){
                io.emit('MANTENIMIENTO_CARRILES_ESPEJO_ACTUALIZADOS')
            }
            
            if(carril?.includes('t-') || carril?.includes('llan') || carril?.includes('ima')){
                io.emit('MANTENIMIENTO_CARRILES_TALLER_ACTUALIZADOS')
            }

            if(carril?.includes('cua')){
                io.emit('MANTENIMIENTO_CUARENTENA_ACTUALIZADA')
            }

            return res.status(200).json({
                OK: true,
                msg: 'Unidad actualizada correctamente',
                result: null
            });

        } catch (error) {
            console.error('Error al actualizar unidad mantenimiento:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.obtenerIngresosAMantenimiento = async (req, res) => {

        try {

            const { base } = req.params;

            const [{ingresos}] = await Sequelize.query(
                `
                    SELECT
                        COUNT(INS_ENT.fecha_hora_fin) AS ingresos
                    FROM
                        pd_inspeccion_entrada INS_ENT
                        LEFT JOIN pd_pickandup PAU ON INS_ENT.id_inspeccion_entrada = PAU.fk_inspeccion_entrada
                    WHERE
                        DATE(INS_ENT.fecha_hora_fin) = CURDATE()
                        AND PAU.base = :base;
                `,
                {
                    replacements: { base: base, },
                    type: Sequelize.QueryTypes.SELECT
                }
            );

            return res.status(200).json({
                OK: true,
                msg: 'Ctd ingresos obtenidas correctamente',
                result: ingresos
            });

        } catch (error) {
            console.error('Error al obtener ingresos mtto:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.obtenerLiberacionesMantenimiento = async (req, res) => {

        try {

            const { base } = req.params;

            const [{liberaciones}] = await Sequelize.query(
                `
                    SELECT
                        COUNT(INS_SAL.fecha_preliberacion) AS liberaciones
                    FROM
                        pd_inspeccion_salida INS_SAL
                        LEFT JOIN pd_pickandup PAU ON INS_SAL.id_inspeccion_salida = PAU.fk_inspeccion_salida
                    WHERE
                        DATE(INS_SAL.fecha_preliberacion) = CURDATE()
                        AND PAU.base = :base;
                `,
                {
                    replacements: { base: base, },
                    type: Sequelize.QueryTypes.SELECT
                }
            );

            return res.status(200).json({
                OK: true,
                msg: 'Ctd liberaciones obtenidas correctamente',
                result: liberaciones
            });

        } catch (error) {
            console.error('Error al obtener liberaciones mtto:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    // Advan (Pruebas local)
    // const obtenerAccionesDeOTs = async (ots, conMecanico) => {

    //     try {

    //         if(ots.length === 0){
    //             return;
    //         }

    //         await sql.connect(sqlConfig);

    //         const query = `
    //             SELECT
    //                 OM.ORDEN_CLAVE,
    //                 FORMAT(OM.ORDEN_FECHA,'dd/MM/yyyy') as FECHA_ORDEN,
    //                 CASE OM.ORDEN_STATUS
    //                     WHEN 0 THEN 'Abierta'
    //                     WHEN 1 THEN 'Terminada'
    //                     WHEN 2 THEN 'Cancelada'
    //                     WHEN 3 THEN 'Interrumpida'
    //                 END as estatus_ot,
    //                 OMA.CONSEC_ORDEN_ACCION,
    //                 AM.ACCION_DESCRIP,
    //                 (AM.ACCION_DIAS * 24) + AM.ACCION_HORAS AS ACCION_HORAS,
    //                 CASE OMA.STATUS_ACCION
    //                     WHEN 0 THEN 'Abierta'
    //                     WHEN 1 THEN 'Terminada'
    //                     WHEN 2 THEN 'Cancelada'
    //                     WHEN 3 THEN 'Interrumpida'
    //                     END as estatus_accion
    //                 ${conMecanico ? '' : '-- '} , MC.MECANICO_DESCRIP
    //             FROM
    //                 ORDEN_MANTTO as OM
    //                 LEFT JOIN ORDEN_MANTTO_ACCION as OMA ON OMA.ORDEN_CLAVE = OM.ORDEN_CLAVE
    //                 LEFT JOIN ACCION_MANTTO as AM ON AM.ACCION_CLAVE = OMA.ACCION_CLAVE
    //                 ${conMecanico ? '' : '-- '} LEFT JOIN ORDEN_MANTTO_MECANICO AS OMM ON (OMM.ORDEN_CLAVE = OM.ORDEN_CLAVE AND OMM.ACCION_CLAVE = OMA.ACCION_CLAVE)
    //                 ${conMecanico ? '' : '-- '} LEFT JOIN MECANICO AS MC ON MC.MECANICO_CLAVE = OMM.MECANICO_CLAVE
    //             WHERE
    //                 OM.ORDEN_STATUS != 2
    //                 AND OM.ORDEN_CLAVE IN (${ots})
    //             ORDER BY
    //                 OM.ORDEN_CLAVE desc, OMA.CONSEC_ORDEN_ACCION;
    //         `
    //         const result = await sql.query(query);

    //         return result.recordset;
            
    //     } catch (error) {
    //         throw new Error('Error al obtener acciones de ot')
    //     } finally {
    //         sql.close();
    //     }
    // }

    // Advan (Servidor)
    const obtenerAccionesDeOTs = async (ots, conMecanico) => {
        try {

            if(ots.length === 0){
                return;
            }

            const data = {
                ots: ots,
                conMecanico: conMecanico
            }

            const result = await axios.post('https://servidorlocal.ngrok.app/mantenimiento/acciones', data);

            return result.data.result;
        } catch (error) {
            console.error('Error al obtener acciones OTs:', error.message);
            return null;
        }
    }

    const obtenerAvanceOT = async (carriles) => {

        try {

            if(!carriles){
                return;
            }

            let ots = [];

            carriles.map(carril => {
                if (carril.tracto_ot_correctivo) ots.push(carril.tracto_ot_correctivo);
                if (carril.re1_ot_correctivo) ots.push(carril.re1_ot_correctivo);
                if (carril.dl_ot_correctivo) ots.push(carril.dl_ot_correctivo);
                if (carril.re2_ot_correctivo) ots.push(carril.re2_ot_correctivo);
                if (carril.tracto_ot_preventivo) ots.push(carril.tracto_ot_preventivo);
                if (carril.re1_ot_preventivo) ots.push(carril.re1_ot_preventivo);
                if (carril.dl_ot_preventivo) ots.push(carril.dl_ot_preventivo);
                if (carril.re2_ot_preventivo) ots.push(carril.re2_ot_preventivo);                
            });

            const accionesOT = await obtenerAccionesDeOTs(ots, false);

            const otsMap = accionesOT.reduce((acc, item) => {
                const otKey = item.ORDEN_CLAVE;
                if (acc[otKey]) {
                    acc[otKey].push(item);
                } else {
                    acc[otKey] = [item];
                }
                return acc;
            }, {});

            const getAccionMayorHoras = (acciones) => {
                if (!acciones || acciones.length === 0) {
                    return null;
                }
                
                return acciones.reduce((maxAction, currentAction) => {
                    const currentHours = parseFloat(currentAction.ACCION_HORAS);
                    const maxHours = parseFloat(maxAction.ACCION_HORAS);
                    
                    return currentHours > maxHours ? currentAction : maxAction;
                }, acciones[0]);
            };

            const arrayAnidado = carriles.map(itemOriginal => {

                let mayor_horas = 0;
                let mayor_accion = null;
                let total_acciones = 0;
                let acciones_completas = 0;

                const newItem = Object.entries(itemOriginal).reduce((acc, [key, value]) => {

                    if (key.includes('_ot_') && value !== null) {
                        
                        const relatedActions = otsMap[value];
                        if (relatedActions) {

                            const accionMayorHoras = getAccionMayorHoras(relatedActions);
                            const totalCompletas = relatedActions.filter(action => action.estatus_accion === 'Terminada').length;
                            const horas_actual = accionMayorHoras.ACCION_HORAS;
                            const accion_actual = accionMayorHoras.ACCION_DESCRIP;
                            
                            if (horas_actual > mayor_horas) {
                                mayor_horas = horas_actual;
                                mayor_accion = accion_actual;
                            }
                            
                            total_acciones += relatedActions.length;
                            acciones_completas += totalCompletas;

                            // acc[key] = value;
                        }

                    } else if (!key.includes('_ot_')) {
                        acc[key] = value;
                    }

                    return acc;
                }, {});

                newItem.mayor_accion = mayor_accion;
                newItem.mayor_horas = mayor_horas;
                newItem.total_acciones = total_acciones;
                newItem.acciones_completas = acciones_completas;
                newItem.porcentaje_avance = Math.floor((acciones_completas/total_acciones)*100);
                
                return newItem;
            });

            return arrayAnidado;
            
        } catch (error) {
            throw new Error('Error al obtener acciones de ot')
        }
    }

    const actualizarCarril = async (id_mantenimiento, carril, t) => {

        try {

            let estatus;

            if(carril === 'cuarentena'){
                carril = null;
                estatus = 'en_espera'
            }else {
                estatus = 'en_proceso'
            }

            await Mantenimiento.update(
                { carril: carril, estatus: estatus },
                {
                    where: { id_mantenimiento: id_mantenimiento },
                    transaction: t
                }
            );

            return;

        } catch (error) {
            throw new Error('Error al actualizar carril')
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
