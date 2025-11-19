const { QueryTypes, Op } = require('sequelize');
const path = require('path');
const fs = require('fs');
const moment = require("moment");
const axios = require('axios');

module.exports = app => {

    const sequelize = app.database.sequelize;
    
    const Agenda = app.database.models.Agenda;
    const ReprogramacionesArribos = app.database.models.Reprogramaciones_arribos;
    const Pickandup = app.database.models.PickAndUp;
    const Entrada = app.database.models.Entrada;

    const Usuarios = app.database.models.Usuarios;

    const io = app.io;

    app.obtenerProgramacionAgenda = async (request, response) => {

        const base = request.params.base;

        let horariosYUnidades = {
            primerTurno: [],
            segundoTurno: [],
            tercerTurno: [],
            agendaDiasPasados: [],
            agendaDiasProximos: [],
        };

        const diaActual = moment().format('YYYY-MM-DD');

        try {
            const agenda = await agendaDiaActual(sequelize, base);

            agenda.forEach(programacion => {
            const fechaProgramada = moment(programacion.fecha_programada);

            if (fechaProgramada.isSame(diaActual, 'day')) {
                if (programacion.horario_arribo === 1) {
                horariosYUnidades.primerTurno.push(programacion);
                } else if (programacion.horario_arribo === 2) {
                horariosYUnidades.segundoTurno.push(programacion);
                } else if (programacion.horario_arribo === 3) {
                horariosYUnidades.tercerTurno.push(programacion);
                }
            } else if (fechaProgramada.isBefore(diaActual, 'day')) {
                horariosYUnidades.agendaDiasPasados.push(programacion);
            } else if (fechaProgramada.isAfter(diaActual, 'day')) {
                horariosYUnidades.agendaDiasProximos.push(programacion);
            }
            });

            return response.status(200).json({
                OK: true,
                result: horariosYUnidades,
                agenda: agenda,
            });
            
        } catch (err) {
            console.error('Error al obtener programaciones:', err);
            return res.status(500).json({ 
                OK: false,
                msg: err,
            });
        }
    }

    app.obtenerBusquedaEntrada = async(request, response) => {
        try {
            const { search } = request.body;
            const { page = 1, limit = 100 } = request.query;
            const offset = (page - 1) * limit;
    
            const query = `
                SELECT
                    PAU.idpickandup,
                    PAU.base,
                    PAU.operador, 
                    E.alcoholimetro, 
                    PAU.unidad,
                    E.placas,
                    E.rem_1,
                    E.rem_2,
                    E.kilometraje,
                    E.tarjeta_iave,
                    E.foto_tarjeta_iave,
                    E.tarjeta_ug,
                    E.foto_tarjeta_ug,
                    PAU.cargado,
                    PAU.division,
                    E.comentarios,
                    E.fecha_entrada,
                    E.fk_usuario
                FROM 
                    pd_entrada E
                    LEFT JOIN pd_pickandup PAU ON E.id_entrada = PAU.fk_entrada
                WHERE (
                    PAU.unidad LIKE :search 
                    OR PAU.operador LIKE :search 
                    OR DATE_FORMAT(E.fecha_entrada, '%d/%m/%Y') LIKE :search
                )
                ORDER BY 
                    E.id_entrada DESC 
                LIMIT :limit 
                -- OFFSET :offset
            `;

            const results = await sequelize.query(query, {
                replacements: {
                    search: `%${search}%`,
                    limit: parseInt(limit),
                    offset: parseInt(offset)
                },
                type: QueryTypes.SELECT
            });

            // console.log(results)

            response.status(200).json({
                page: parseInt(page),
                limit: parseInt(limit),
                data: results
            });

        } catch (error) {
            console.error('Error al buscar', error);
            response.status(500).json({ error: 'Error interno del servidor' });
        }
    }
    
    app.obtenerEntradas = async (request, response) => {

        const base = request.params.base;

        try {
            const query = `
                SELECT
                    PAU.idpickandup, 
                    E.id_entrada,
                    PAU.base,
                    PAU.operador,
                    PAU.cargado,
                    PAU.division,
                    PAU.unidad,
                    E.alcoholimetro,
                    E.placas,
                    E.rem_1,
                    E.rem_2,
                    E.kilometraje,
                    E.tarjeta_iave,
                    E.tarjeta_ug,
                    E.comentarios,
                    E.fecha_entrada,
                    E.fk_usuario
                FROM 
                    pd_entrada AS E
                    LEFT JOIN pd_pickandup AS PAU ON E.id_entrada = PAU.fk_entrada
                WHERE
                    PAU.base = :base
                ORDER BY
                    id_entrada DESC
                LIMIT 50
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
    }

    app.obtenerDetallesEntrada = async (req, res) => {
        
        try {

            const idpickandup = req.params.id;

            const detalles = await Pickandup.findOne({
                where: { idpickandup: idpickandup },
                attributes: [
                    'idpickandup',
                    'base',
                    'unidad',
                    'operador',
                    'unidad_negocio',
                    'division',
                    'cargado',
                    'placas_tracto',
                    'rem_1',
                    'rem_2',
                ],
                include: [
                    {
                        model: Entrada,
                        include: { model: Usuarios, attributes: ['id_usuario', 'nombre_empleado']}
                    },
                ],
            });

            const query = `
                SELECT
                    estructura
                FROM 
                    unidad
                WHERE
                    name = :unidad
            `;

            const [estructura] = await sequelize.query(query, {
                replacements: { unidad: detalles.unidad },
                type: QueryTypes.SELECT
            });
            
            return res.json({
                OK: true, 
                result: detalles,
                estructura: estructura
            });
        } catch (err) {
            console.error('Error en obtener detalles de entrada:', err);
            return res.status(500).json({ 
                OK: false,
                msg: err,
            });
        }
    }

    app.obtenerUnidadEnCaseta = async (req, res) => {

        // let t;
        const base = req.params.base;

        try {
            // t = await Sequelize.transaction();
            const unidadEnCaseta = await Pickandup.findAll({
                attributes: ['idpickandup', ['fk_agenda', 'id_agenda'], 'unidad', 'operador', 'estatus', 'fk_entrada', 'fk_intercambios_entrada', 'fk_omision_intercambios_entrada'],
                where: {
                    base: base,
                    estatus: 'en_caseta_entrada'
                }
            });

            // await t.commit();
            return res.status(200).json({
                OK: true,
                msg: 'Unidad en caseta obtenido correctamente',
                result: unidadEnCaseta
            });

        } catch (error) {
            // if (t) await t.rollback();
            console.error('Error al obtener unidad en caseta:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.opcionesFormulario = async (req, res) => {
        
        try {
            
            const operadoresRaw = await listadoOperadors();
            const operadores = Array.isArray(operadoresRaw)
                ? operadoresRaw.map(({ OPERADOR_NOMBRE }) => ({
                    operador: OPERADOR_NOMBRE,
                }))
                : [];

            return res.json({ 
                OK: true, 
                result: {
                    operadores
                }
            });
        } catch (err) {
            console.error('Error en obtener catalogo de operadores:', err);
            return res.status(500).json({ 
                OK: false,
                msg: err,
            });
        }
    }

    app.checkUnidadProgramada = async (req, res) => {

        try {

            const unidad = req.params.unidad;

            const [agenda] = await sequelize.query(
                `
                SELECT
                    PAU.idpickandup,
                    PAU.operador,
                    PAU.division,
                    PAU.unidad_negocio,
                    PAU.cargado,
                    PAU.fk_entrada,
                    PAU.fk_agenda AS id_agenda
                FROM
                    pd_pickandup PAU
                    -- LEFT JOIN pd_agenda A ON PAU.fk_agenda = A.id_agenda
                WHERE
                    PAU.unidad = :unidad
                ORDER
                    BY PAU.idpickandup DESC
                LIMIT 1
                `,
                {
                    replacements: { unidad },
                    type: sequelize.QueryTypes.SELECT
                }
            );

            // console.log('Agenda:', agenda);
            
            if(agenda && agenda.id_agenda !== null && !agenda.fk_entrada) {
                return res.json({
                    OK: true,
                    result: agenda
                });
            }
            
            return res.json({ 
                OK: true,
                result: null
            });
        } catch (err) {
            console.error('Error en :', err);
            return res.status(500).json({ 
                OK: false,
                msg: err,
            });
        }
    }

    app.obtenerUnidadesPendientesRegreso = async (request, response) => {

        const base = request.params.base;

        try {
            const query = `
                SELECT
                    idpickandup,
                    unidad,
                    salida_temporal,
                    fecha_salida_temporal
                FROM 
                    pd_pickandup
                WHERE
                    base = :base
                    AND salida_temporal = 1;
            `;

            const result = await sequelize.query(query, {
                replacements: { base },
                type: QueryTypes.SELECT
            });

            response.status(200).json({
                OK: true,
                result: result
            });
        } catch (error) {
            response.status(500).send('Error al obtener los registros: ' + error.message);
        }
    }

    app.confirmarRegresoDeSalida = async (req, res) => {

        try {

            const { idsUnidades } = req.body;

            
            await Pickandup.update(
                {
                    salida_temporal: 0,
                    fecha_regreso_salida_temporal: moment()
                },
                {
                    where: { 
                        idpickandup: { [Op.in]: idsUnidades }
                    }
                }
            );

            io.emit('SALIDA_TEMPORAL_CONFIRMADA');

            return res.status(200).json({
                OK: true,
                msg: 'Regreso de unidad confirmado correctamente',
                result: null
            });

        } catch (error) {
            console.error('Error al confirmar regreso de salida temporal:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.crearInitEntrada = async (req, res) => {

        // let t;
        const {
            idpickandup,
            id_agenda,
            unidad,
            operador,
            base,
        } = req.body
        try {
            // console.log(req.body);

            const estatus = 'en_caseta_entrada'

            if(idpickandup && id_agenda){
                await Pickandup.update(
                    {estatus: estatus},
                    { where:{ idpickandup: idpickandup } }
                )
            
                io.emit('CASETA_ENTRADA_ACTUALIZADA');
                return res.status(200).json({
                    OK: true,
                    msg: 'Ingreso en caseta confirmada',
                    result: null
                });
            }

            if(!idpickandup){
                const unidadEnCaseta = await Pickandup.create(
                    {
                        base: base,
                        unidad: unidad,
                        operador: operador,
                        estatus: estatus
                    },
                )
                
                io.emit('CASETA_ENTRADA_ACTUALIZADA');
                return res.status(200).json({
                    OK: true,
                    msg: 'Ingreso en caseta confirmada',
                    result: unidadEnCaseta.idpickandup
                });
            }
            
        } catch (error) {
            // if (t) await t.rollback();
            console.error('Error al :', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }
    
    app.createNewInto = async (req, res) => {

        let t;

        // console.log(req.files)

        try {

            t = await sequelize.transaction();
            const {
                idpickandup,
                id_agenda,
                base,
                operador,
                cargado,
                division,
                
                fk_usuario,
                fecha_entrada,
                fecha_hora_inicio,
                fecha_hora_fin,
                alcoholimetro,
                placas,
                rem_1,
                rem_2,
                placas_rem_1,
                placas_rem_2,
                kilometraje,
                tarjeta_iave,
                tarjeta_ug,

                motivo_ingreso,

                comentarios,

                departamento_responsable,
                reporte_descripcion,

                camara_cabina,

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

                reporte_operador,

                foto_unidad_1,
                foto_unidad_2,
                foto_unidad_3,
                foto_unidad_4,
                foto_unidad_5,
                foto_unidad_6,

                foto_camara_cabina,

                foto_alcoholimetro,
                foto_hallazgo,
                foto_tarjeta_iave,
                foto_tarjeta_ug,
                foto_defensa,
                foto_motor_bateria_filtros,
                foto_llantas_rines,
                foto_piso_tracto,
                foto_tanques_combustible,
                foto_cabina_interior,
                foto_compartimiento_herramientas,
                foto_tanques_de_aire,
                foto_compartimientos_baterias,
                foto_mofles,
                foto_quinta_rueda,
                foto_debajo_del_chasis,
                foto_llantas_rines_remolque,
                foto_estructura_nodriza,
                foto_rampas,
                foto_caja_herramientas_remolque,
                foto_lona,
                foto_libre_de_plagas,
                foto_libre_de_semillas_hojas,

                firma_guardia,
                firma_operador,
                firma_supervisor,
            } = req.body;

            // console.log(req.body)
            let DatosEntrada;
    
            DatosEntrada = {
                alcoholimetro: alcoholimetro,
                placas: placas,
                rem_1: rem_1,
                rem_2: rem_2,
                placas_rem_1: placas_rem_1,
                placas_rem_2: placas_rem_2,
                departamento_responsable: departamento_responsable,
                reporte_descripcion: reporte_descripcion,

                kilometraje: kilometraje,
                tarjeta_iave: tarjeta_iave,
                tarjeta_ug: tarjeta_ug,

                motivo_ingreso: motivo_ingreso,

                camara_cabina: camara_cabina,

                comentarios: comentarios,
                fecha_entrada: fecha_entrada,
                fecha_hora_inicio: fecha_hora_inicio,
                fecha_hora_fin: fecha_hora_fin,
                fk_usuario: fk_usuario,
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

            // console.log('Datos de entrada:', DatosEntrada); 

            const fotosChecklist = [
                { campo: 'reporte_operador', base64: reporte_operador },
                { campo: 'foto_camara_cabina', base64: foto_camara_cabina },
                { campo: 'foto_unidad_1', base64: foto_unidad_1 },
                { campo: 'foto_unidad_2', base64: foto_unidad_2 },
                { campo: 'foto_unidad_3', base64: foto_unidad_3 },
                { campo: 'foto_unidad_4', base64: foto_unidad_4 },
                { campo: 'foto_unidad_5', base64: foto_unidad_5 },
                { campo: 'foto_unidad_6', base64: foto_unidad_6 },
                { campo: 'foto_hallazgo', base64: foto_hallazgo },
                { campo: 'foto_alcoholimetro', base64: foto_alcoholimetro },
                { campo: 'foto_tarjeta_iave', base64: foto_tarjeta_iave },
                { campo: 'foto_tarjeta_ug', base64: foto_tarjeta_ug },
                { campo: 'foto_defensa', base64: foto_defensa },
                { campo: 'foto_motor_bateria_filtros', base64: foto_motor_bateria_filtros },
                { campo: 'foto_llantas_rines', base64: foto_llantas_rines },
                { campo: 'foto_piso_tracto', base64: foto_piso_tracto },
                { campo: 'foto_tanques_combustible', base64: foto_tanques_combustible },
                { campo: 'foto_cabina_interior', base64: foto_cabina_interior },
                { campo: 'foto_compartimiento_herramientas', base64: foto_compartimiento_herramientas },
                { campo: 'foto_tanques_de_aire', base64: foto_tanques_de_aire },
                { campo: 'foto_compartimientos_baterias', base64: foto_compartimientos_baterias },
                { campo: 'foto_mofles', base64: foto_mofles },
                { campo: 'foto_quinta_rueda', base64: foto_quinta_rueda },
                { campo: 'foto_debajo_del_chasis', base64: foto_debajo_del_chasis },
                { campo: 'foto_llantas_rines_remolque', base64: foto_llantas_rines_remolque },
                { campo: 'foto_estructura_nodriza', base64: foto_estructura_nodriza },
                { campo: 'foto_rampas', base64: foto_rampas },
                { campo: 'foto_caja_herramientas_remolque', base64: foto_caja_herramientas_remolque },
                { campo: 'foto_lona', base64: foto_lona },
                { campo: 'foto_libre_de_plagas', base64: foto_libre_de_plagas },
                { campo: 'foto_libre_de_semillas_hojas', base64: foto_libre_de_semillas_hojas },
                { campo: 'firma_guardia', base64: firma_guardia },
                { campo: 'firma_operador', base64: firma_operador },
                { campo: 'firma_supervisor', base64: firma_supervisor }
            ];

            for (let foto of fotosChecklist) {
                if (foto.base64) {
                    DatosEntrada[foto.campo] = saveBase64File(foto.base64, foto.campo);
                }
            }

            // console.log('Datos de entrada:', DatosEntrada); 
    
            const EntradaCreada = await Entrada.create(DatosEntrada, { transaction: t });

            let pickandupData;
            let estatus;

            estatus = 'entrada';

            // Validacion para saber si ya se cumplio con intercambios y guardias
            const unidadEnCaseta = await Pickandup.findOne({
                attributes: ['unidad', 'operador', 'estatus', 'fk_entrada', 'fk_intercambios_entrada', 'fk_omision_intercambios_entrada'],
                where: {
                    base: base,
                    idpickandup: idpickandup
                }
            });
            
            if(!unidadEnCaseta.fk_intercambios_entrada && !unidadEnCaseta.fk_omision_intercambios_entrada) {
                estatus = 'en_caseta_entrada'
            } else {
                estatus = 'entrada'
            }

            const check_id_agenda = id_agenda === 'null' ? null : id_agenda
            
            if(check_id_agenda){
                // Trae solo la última reprogramación (o null)
                const reprogramacionAnteriorCheck = await ReprogramacionesArribos.findOne({
                    where: { fk_agenda: check_id_agenda },
                    attributes: ['id_reprogramacion_arribo', 'fecha_arribo_reprogramado'],
                    order: [['id_reprogramacion_arribo', 'DESC']],
                    transaction: t,
                    raw: true,
                });

                const Programacion = await Agenda.findByPk(check_id_agenda, {
                    attributes: ['id_agenda', 'fecha_arribo_programado'],
                    transaction: t,
                    raw: true,
                });

                const fmt = 'YYYY-MM-DD HH:mm:ss';

                const fecha_programacion = Programacion?.fecha_arribo_programado
                ? moment(Programacion.fecha_arribo_programado, fmt)
                : null;

                const fecha_reprogramacion = reprogramacionAnteriorCheck?.fecha_arribo_reprogramado
                ? moment(reprogramacionAnteriorCheck.fecha_arribo_reprogramado, fmt)
                : null;

                const fecha_entrada_unidad = moment(fecha_entrada, );

                const checkCumplimientoProgramacion =  !!(fecha_programacion && fecha_entrada_unidad.isSameOrBefore(fecha_programacion, 'day'));
                const checkCumplimientoReprogramacion = !!(fecha_reprogramacion && fecha_entrada_unidad.isSameOrBefore(fecha_reprogramacion, 'day'));
                
                // console.log({ fecha_programacion, fecha_reprogramacion, fecha_entrada_unidad });
                // console.log({ checkCumplimientoProgramacion, checkCumplimientoReprogramacion });
                
                if (reprogramacionAnteriorCheck) {
                    const id_reprogramacion_arribo = reprogramacionAnteriorCheck.id_reprogramacion_arribo;

                    let cumplimiento = checkCumplimientoReprogramacion ? 'cumplio_arribo' : 'incumplio_arribo';

                    await ReprogramacionesArribos.update(
                        { cumplimiento_arribo_reprogramacion: cumplimiento },
                        {
                            where: { id_reprogramacion_arribo },
                            transaction: t
                        }
                    );
                } else {
                    let cumplimiento = checkCumplimientoProgramacion ? 'cumplio_arribo' : 'incumplio_arribo';

                    await Agenda.update(
                        { cumplimiento_arribo: cumplimiento },
                        {
                            where: { id_agenda: check_id_agenda },
                            transaction: t
                        }
                    );
                }


                pickandupData = {
                    fk_entrada: EntradaCreada.id_entrada,
                    base: base,
                    operador: operador,
                    cargado: cargado,
                    estatus: estatus,
                }

                await Pickandup.update(
                    pickandupData,
                    { where: {idpickandup: idpickandup}, transaction: t }
                )
            } else {                
                pickandupData = {
                    base: base,
                    operador: operador,
                    cargado: cargado,
                    division: division === 'null' ? null : division,
                    fk_entrada: EntradaCreada.id_entrada,
                    estatus: estatus,
                }
                await Pickandup.update(
                    pickandupData,
                    { where: {idpickandup: idpickandup}, transaction: t }
                );
            }
    
            await t.commit();
            io.emit('CASETA_ENTRADA_ACTUALIZADA');
            return res.status(200).json({
                OK: true,
                msg: 'Entrada registrada correctamente',
                Entrada: EntradaCreada
            });
        } catch (error) {
            if (t) await t.rollback();
            console.error('Error en crear entrada:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.guardarFirmaSupervisorEntrada = async (req, res) => {

        try {

            let { firma_supervisor, id_entrada } = req.body;

            if (firma_supervisor){
                firma_supervisor = saveBase64File(firma_supervisor, 'firma_supervisor');

                await Entrada.update(
                    { firma_supervisor: firma_supervisor },
                    { where: { id_entrada: id_entrada }}
                )
            }

            return res.status(200).json({
                OK: true,
                msg: 'Firma guardada correctamente',
                result: null
            });

        } catch (error) {
            console.error('Error al guardar firma supervisor:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.unidadEnCasetaCancelada = async (req, res) => {

        const idpickandup = req.params.idpickandup;
        const id_agenda = req.params.id_agenda;
        
        try {

            let pickandupActualizado;

            if(id_agenda !== 'null'){

                pickandupActualizado = await Pickandup.update(
                    { estatus: 'programado' },
                    { where: { idpickandup: idpickandup } }
                )

            } else {
                pickandupActualizado = await Pickandup.destroy({
                    where: {
                        idpickandup: idpickandup,
                    },
                });
            }

            io.emit('CASETA_ENTRADA_ACTUALIZADA');
            return res.status(200).json({
                OK: true,
                msg: 'Cancelado correctamente',
                result: pickandupActualizado
            });

        } catch (error) {
            // if (t) await t.rollback();
            console.error('Error al :', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    return app;
}

const saveBase64File = (base64Data, type) => {

  const evidenciaEntregadasPath = path.join(__dirname, '../../../uploads/fotos_checklist');

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

const listadoOperadors = async () => {
    try {
        const response = await axios.get('https://servidorlocal.ngrok.app/listadoOperadores');
        return response.data.Registros;
    } catch (error) {
        console.error('Error consultando la API de operadores:', error.message);
        return null;
    }
}

// const listadoTracto = async () => {
//     try {
//         const response = await axios.get('https://servidorlocal.ngrok.app/catalogoTracto');
//         return response.data.result;
//     } catch (error) {
//         console.error('Error consultando catalogo tractos:', error.message);
//         return null;
//     }
// }

//#region Consultas SQL

const agendaDiaActual = async (sequelize, base) => {

    try {

        const agendaDiaActual = await sequelize.query(
        `
            WITH
                reprogramadas_arribo_hoy AS (
                    SELECT
                        RA.fk_agenda AS id_agenda,
                        RA.id_reprogramacion_arribo AS id_reprogramacion_arribo,
                        RA.fecha_arribo_reprogramado AS fecha_programada,
                        RA.cumplimiento_arribo_reprogramacion AS cumplimiento,
                        RA.horario_arribo_reprogramado AS horario_arribo,
                        MPA.motivo AS motivo_agenda
                    FROM
                        (
                            SELECT *,
                                ROW_NUMBER() OVER (PARTITION BY fk_agenda ORDER BY id_reprogramacion_arribo DESC) AS rn
                            FROM pd_reprogramaciones_arribos
                        ) RA
                        LEFT JOIN pd_agenda CA ON RA.fk_agenda = CA.id_agenda
                        LEFT JOIN pd_motivo_programacion_arribo MPA ON CA.fk_motivo_programacion_arribo = MPA.id_motivo_programacion_arribo
                    WHERE
                        CA.base = :base
                        -- AND RA.fecha_arribo_reprogramado <= current_date()
                        AND RA.rn = 1
                ),
                programadas_hoy AS (
                    SELECT
                        CA.id_agenda,
                        NULL AS id_reprogramacion_arribo,
                        CA.fecha_arribo_programado AS fecha_programada,
                        CA.cumplimiento_arribo AS cumplimiento,
                        CA.horario_arribo_programado AS horario_arribo,
                        MPA.motivo AS motivo_agenda
                    FROM
                        pd_agenda CA
                        LEFT JOIN pd_motivo_programacion_arribo MPA ON CA.fk_motivo_programacion_arribo = MPA.id_motivo_programacion_arribo
                    WHERE
                        CA.base = :base
                        -- AND DATE(CA.fecha_arribo_programado) <= current_date()
                        AND cumplimiento_arribo IS NULL
                ),
                   
                union_arribos AS (
                    SELECT * FROM reprogramadas_arribo_hoy
                    UNION
                    SELECT * FROM programadas_hoy
                )
                
                SELECT
                    PAU.idpickandup,
                    UA.id_agenda,
                    PAU.unidad,
                    PAU.operador,
                    PAU.division,
                    PAU.unidad_negocio,
                    UA.motivo_agenda,
                    DATE(UA.fecha_programada) AS fecha_programada,
                    UA.horario_arribo
                FROM
                    union_arribos UA
                    LEFT JOIN pd_pickandup PAU ON UA.id_agenda = PAU.fk_agenda
                WHERE
                    PAU.estatus = 'programado';
        `,
        {
            replacements: {
                base: base,
            },
            type: sequelize.QueryTypes.SELECT,
        }
        );

        return agendaDiaActual;
        
    } catch (error) {
        console.error('Error en obtener agenda dia actual:', error);
        throw new Error(error);
    }
}

//#endregion
    