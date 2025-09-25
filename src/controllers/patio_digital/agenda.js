const moment = require("moment");
const { Op } = require('sequelize');

const axios = require('axios');

module.exports = app => {

    const io = app.io;

    const Agenda = app.database.models.Agenda;
    const ReprogramacionesArribos = app.database.models.Reprogramaciones_arribos;
    const Pickandup = app.database.models.PickAndUp;

    const MotivoArribo = app.database.models.Motivo_programacion_arribo;
    const Cliente = app.database.models.Clientes;
    const Unidades = app.database.models.Unidades;

    const sequelize = app.database.sequelize;

    app.pruebaAdvan = async (request, response) => {
        const test = moment('2025-06-19 14:21:28', 'YYYY-MM-DD')
        return response.status(200).json({test})
        // try {
        //     // await sql.connect(sqlConfig)
        //     // const result = await sql.query`
        //     //     SELECT
        //     //         OPERADOR_NOMBRE AS Operador
        //     //     FROM
        //     //         OPERADOR;
        //     // `
        //     // console.log(result.recordset)
        // } catch (error) {
        //     response.status(500).send('Error al Obtener los registros: ' + error.message);
        // }
    }

    app.obtenerArribosProgramados = async (req, res) => {

        const base = req.params.base;

        let opcionBase;
        
        switch(base) {
            case '3':
                opcionBase = {};
            break;
            default:
                opcionBase = {base: base};
            break;
        }

        try {

            const programaciones = await Agenda.findAll({
                include: [
                    { model: ReprogramacionesArribos },
                    { model: MotivoArribo },
                    {
                        model: Pickandup,
                        as: 'pickandup',
                        attributes: ['idpickandup', 'fk_agenda', 'fk_cliente', 'unidad', 'operador', 'estatus', 'unidad_negocio', 'division', 'cargado'],
                        include: [
                            {
                                model: Cliente,
                                attributes: ['id_cliente', 'cliente'],
                            },
                        ],
                    }
                ],
                where: opcionBase,
                order: [['id_agenda', 'DESC']],
                // limit: 150
            });
            
            const programadasArriboHoy = await ctdUnidadesProgramadasArriboHoy(sequelize, base);
            // console.log(programadasArriboHoy)
            const arribosHoy = await ctdUnidadesArriboHoy(sequelize, base);

            return res.json({ 
                OK: true, 
                result: { programaciones, programadasArriboHoy, arribosHoy },
            });
        } catch (error) {
            console.error('Error en obtenerArribosProgramados:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.ctdUnidadesProgramadasSemanaActual = async (req, res) => {

        const base = req.params.base;
        const fechaInicio = req.params.fechaInicio;
        const fechaFin = req.params.fechaFin;

        try {
            
            const programacionesDiariasSemanaActual = await sequelize.query(
            `
                WITH
                reprogramadas_arribo_hoy AS (
                SELECT
                    RA.fk_agenda AS id_agenda
                FROM
                    pd_reprogramaciones_arribos RA
                    LEFT JOIN pd_agenda CA ON RA.fk_agenda = CA.id_agenda
                WHERE
                    CA.base = :base
                    AND RA.fecha_arribo_reprogramado BETWEEN :fechaInicio AND :fechaFin
                    AND (
                        RA.cumplimiento_arribo_reprogramacion NOT IN ('cancelado', 'reprogramado', 'anulado')
                        OR RA.cumplimiento_arribo_reprogramacion IS NULL
                    )
                ),
                
                programadas_hoy AS (
                SELECT
                    CA.id_agenda
                FROM
                    pd_agenda CA
                WHERE
                    CA.base = :base
                    AND CA.fecha_arribo_programado BETWEEN :fechaInicio AND :fechaFin
                    AND (
                        CA.cumplimiento_arribo NOT IN ('cancelado', 'reprogramado', 'anulado')
                        OR CA.cumplimiento_arribo IS NULL
                    )
                ),

                union_arribos AS (
                SELECT id_agenda FROM reprogramadas_arribo_hoy
                UNION
                SELECT id_agenda FROM programadas_hoy
                )

                SELECT
                    COUNT(*) AS total_agendas_unicas
                FROM
                    union_arribos;
            `,
            {
                replacements: {
                base: base,
                fechaInicio: fechaInicio,
                fechaFin: fechaFin
                },
                type: sequelize.QueryTypes.SELECT,
            }
            );

            return res.json({
                OK: true, 
                result: programacionesDiariasSemanaActual[0],
            });

        } catch (error) {
            console.error('Error en obtener ctdUnidadesProgramadasSemanaActual:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.obtenerResumenAgendasPorMotivo = async (req, res) => {

        const base = req.params.base;

        try {
            
            const resumen = await sequelize.query(
            `
                SELECT
                    CASE
                        WHEN MPA.motivo = 'Mantenimiento Preventivo' THEN 'Mtto prev'
                        WHEN MPA.motivo = 'Mantenimiento Correctivo' THEN 'Mtto corr'
                        WHEN MPA.motivo = 'Procesos de liquidacion' THEN 'Procesos liq'
                        WHEN MPA.motivo = 'Personal' THEN 'Personal'
                        WHEN MPA.motivo = 'Issue DOO' THEN 'Issue DOO'
                        WHEN MPA.motivo = 'Resguardo' THEN 'Resguardo'
                        WHEN MPA.motivo = 'Intercambio de unidad' THEN 'Intercambio'
                        WHEN MPA.motivo = 'Relleno combustible' THEN 'Relleno'
                    ELSE MPA.motivo
                    END AS motivo,
                    COUNT(MPA.motivo) AS cantidad
                FROM
                    pd_agenda AG
                    LEFT JOIN pd_motivo_programacion_arribo MPA ON AG.fk_motivo_programacion_arribo = MPA.id_motivo_programacion_arribo
                    LEFT JOIN pd_pickandup PAU ON AG.id_agenda = PAU.fk_agenda
                    LEFT JOIN (
                        WITH                            
                        reprogramaciones AS (
                            SELECT
                                RA.fk_agenda,
                                RA.fecha_arribo_reprogramado AS fecha_primera_reprogramacion,
                                RA.cumplimiento_arribo_reprogramacion AS cumplimiento_primera_reprogramacion,
                                LEAD(RA.fecha_arribo_reprogramado) OVER (PARTITION BY RA.fk_agenda ORDER BY RA.id_reprogramacion_arribo ASC) AS fecha_segunda_reprogramacion,
                                LEAD(RA.cumplimiento_arribo_reprogramacion) OVER (PARTITION BY RA.fk_agenda ORDER BY RA.id_reprogramacion_arribo ASC) AS cumplimiento_segunda_reprogramacion,
                                ROW_NUMBER() OVER (PARTITION BY RA.fk_agenda ORDER BY RA.id_reprogramacion_arribo ASC) AS rn
                            FROM pd_reprogramaciones_arribos RA
                        )
                        SELECT
                            fk_agenda,
                            fecha_primera_reprogramacion,
                            cumplimiento_primera_reprogramacion,
                            fecha_segunda_reprogramacion,
                            cumplimiento_segunda_reprogramacion
                        FROM reprogramaciones
                        WHERE rn = 1
                    ) AS RE ON RE.fk_agenda = AG.id_agenda
                WHERE
                    (AG.cumplimiento_arribo NOT IN ('cumplio_arribo','incumplio_arribo','cancelado','anulado') OR AG.cumplimiento_arribo IS NULL)
                    AND (RE.cumplimiento_primera_reprogramacion NOT IN ('cumplio_arribo','incumplio_arribo','cancelado','anulado') OR RE.cumplimiento_primera_reprogramacion IS NULL)
                    AND (RE.cumplimiento_segunda_reprogramacion NOT IN ('cumplio_arribo','incumplio_arribo','cancelado','anulado') OR RE.cumplimiento_segunda_reprogramacion IS NULL)
                    AND COALESCE(RE.fecha_segunda_reprogramacion, RE.fecha_primera_reprogramacion, DATE(AG.fecha_arribo_programado)) = current_date()
                    AND PAU.base = :base
                GROUP BY
                    motivo
                ORDER BY
                    motivo ASC;
            `,
            {
                replacements: {
                    base: base,
                },
                type: sequelize.QueryTypes.SELECT,
            }
            );

            // console.log(resumen)

            return res.json({
                OK: true, 
                result: resumen,
            });

        } catch (error) {
            console.error('Error en obtener ctdUnidadesProgramadasSemanaActual:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.obtenerIngresosPorMotivo = async (req, res) => {

        // let t;

        try {
            const { base, fechainicio, fechafin } = req.params;

            const start = moment(fechainicio).locale('es-MX');
            const end = moment(fechafin).locale('es-MX');
            const dataset = [];
            let current = start.clone();
            
            while (current.isSameOrBefore(end)) {
                dataset.push(
                    {
                        fecha: current.format('YYYY-MM-DD'),
                        ingresosMantenimiento: [],
                        ingresosRelleno: [],
                        ingresosOtros: [],
                    }
                );
                current.add(1, 'days');
            }

            const ingresos = await sequelize.query(
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
                        AND DATE(ENT.fecha_entrada) BETWEEN :fecha_inicio AND :fecha_fin
                        AND PAU.base = :base;
                `,
                {
                    replacements: {
                        base: base,
                        fecha_inicio: fechainicio,
                        fecha_fin: fechafin,
                    },
                    type: sequelize.QueryTypes.SELECT,
                }
            );

            ingresos.forEach((ingreso) => {
                const fecha = dataset.find(f => f.fecha === ingreso.fecha_entrada);
                if (fecha) {
                    if (ingreso.motivo_agenda && ingreso.motivo_agenda.includes('Mantenimiento')) {
                        fecha.ingresosMantenimiento.push(ingreso);
                    } else if (ingreso.motivo_agenda && ingreso.motivo_agenda.includes('Relleno')) {
                        fecha.ingresosRelleno.push(ingreso);
                    } else {
                        fecha.ingresosOtros.push(ingreso);
                    }
                }
            });

            return res.status(200).json({
                OK: true,
                msg: 'ingresos por motivo obtenidos correctamente',
                result: dataset
            });

        } catch (error) {
            console.error('Error al obtener ingresos por motivo:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.obtenerBusqueda = async (request, response) => {
        try {
            const { busqueda } = request.body;

            const unidad = '%'+busqueda+'%'

            const programacionesBusqueda = await Agenda.findAll({
                include: [
                    { model: ReprogramacionesArribos },
                    { model: MotivoArribo },
                    {
                        model: Pickandup,
                        as: 'pickandup',
                        attributes: ['idpickandup', 'unidad', 'operador', 'estatus', 'unidad_negocio', 'division', 'cargado', 'fk_cliente'],
                        include: [
                            {
                                model: Cliente,
                                attributes: ['id_cliente', 'cliente'],
                                required: false,
                            },
                        ],
                        where: {
                            unidad: { [Op.like]: unidad },
                        },
                    }
                ],
                order: [['id_agenda', 'ASC']],
                limit: 100
            });
    
            response.status(200).json({
                programaciones: programacionesBusqueda
            });
        } catch (error) {
            console.error('Error al buscar', error);
            response.status(500).json({ error: 'Error interno del servidor' });
        }
    };

    app.dataVistaGeneral = async (req, res) => {

        const base = req.params.base;
        const fechaInicio = req.params.fechaInicio;
        const fechaFin = req.params.fechaFin;

        try {
            
            const data = await programacionesYEstatusDeLaSemana(sequelize, base, fechaInicio, fechaFin);
            
            // console.log(data)

            const start = moment(fechaInicio).locale('es-MX');
            const end = moment(fechaFin).locale('es-MX');
            const fechas = [];
            let current = start.clone();
            
            while (current.isSameOrBefore(end)) {
                fechas.push(current.format('YYYY-MM-DD'));
                current.add(1, 'days');
            }

            let dataset = {
                "00:00-08:00": [],
                "08:00-16:00": [],
                "16:00-24:00": [],
                // "global": []
            };

            const horarios = {
                1: "00:00-08:00",
                2: "08:00-16:00",
                3: "16:00-24:00"
            };

            for (const horario in dataset) {
                for (const fecha of fechas) {
                    dataset[horario].push({
                        fecha_programada: fecha,
                        arribos: []
                    });
                }
            }

            for (let i = 0; i < data.length; i++) {
                let programacion = data[i];
                let horarioKey = horarios[programacion.horario_arribo];
                let fechaObj;
                // console.log('programacion', programacion)

                let fechaFinal;
                if(programacion.cumplimiento === 'cumplio_arribo' || programacion.cumplimiento === 'incumplio_arribo' ){
                    fechaFinal = programacion.fecha_entrada ? programacion.fecha_entrada : programacion.fecha_programada;
                } else {
                    fechaFinal = programacion.fecha_programada;
                }
                
                if (horarioKey && dataset[horarioKey]) {
                    fechaObj = dataset[horarioKey].find(obj => obj.fecha_programada === fechaFinal);
                    if (fechaObj) {
                        fechaObj.arribos.push(programacion);
                    }
                }
                
                // let globalObj = dataset["global"].find(obj => obj.fecha_programada === fechaFinal);
                // if (globalObj) {
                //     globalObj.arribos.push(programacion);
                // }
            }

            Object.keys(dataset).forEach(horario => {
                dataset[horario].forEach(fechaObj => {
                    fechaObj.arribos.sort((a, b) => {
                        const valA = (a.cumplimiento || '').toLowerCase();
                        const valB = (b.cumplimiento || '').toLowerCase();
                        if (valA < valB) return -1;
                        if (valA > valB) return 1;
                        return 0;
                    });
                });
            });

            return res.json({ 
                OK: true, 
                result: dataset,
            });
        } catch (error) {
            console.error('Error en dataVistaGeneral:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }

    }

    app.pd_ag_obtenerUnidades = async (req, res) => {

        try {
            const unidades = await Unidades.findAll({
                attributes: [
                    'id_unidad',
                    'name',
                    'idcliente',
                    'tag',
                    'division',
                ],
                where: {
                    estado: 'A'
                }
            });
            return res.status(200).json({
                OK: true,
                msg: 'Unidades obtenidas correctamente',
                result: unidades
            });

        } catch (error) {
            console.error('Error al obtener unidadades:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.pd_ag_obtenerClientes = async (req, res) => {

        try {
            const clientes = await Cliente.findAll({
                attributes: [
                    ['id_cliente', 'value'],
                    ['cliente', 'label']
                ],
                where: { activo: 'A' }
            });
            return res.status(200).json({
                OK: true,
                msg: 'Clientes obtenidos correctamente',
                result: clientes
            });

        } catch (error) {
            console.error('Error al Obtener clientes:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.pd_ag_obtenerOperadores = async (req, res) => {

        try {
            const operadoresRaw = await listadoOperadors();
            const operadores = Array.isArray(operadoresRaw)
                ? operadoresRaw.map(({ OPERADOR_NOMBRE }) => ({
                    operador: OPERADOR_NOMBRE,
                }))
                : [];
            return res.status(200).json({
                OK: true,
                msg: 'Operadores obtenidos correctamente',
                result: operadores
            });

        } catch (error) {
            console.error('Error al obtener operadores:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.pd_ag_obtenerMotivos = async (req, res) => {

        try {

            const motivos = await MotivoArribo.findAll({
                attributes: [
                    ['id_motivo_programacion_arribo', 'value'],
                    ['motivo', 'label']
                ],
            });

            return res.json({ 
                OK: true,
                msg: 'Motivos obtenidos correctamente',
                result: motivos, 
            });
            
        } catch (error) {
            console.error('Error en obtenerArribosProgramados:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }   

    app.programarArribo = async (req, res) => {

        const {
            base,
            id_usuario,
            turno,
            unidad,
            operador,
            fecha_arribo_programado,
            horario_arribo_programado,
            id_cliente,
            unidad_neg,
            division,
            id_motivo_programacion_arribo,
            cargado,
            comentarios,
        } = req.body;

        // console.log('Datos para programar arribo:', req.body);

        let t;

        try {
            t = await sequelize.transaction();

             const programacion = new Agenda({    
                base: base,
                fk_usuario: id_usuario,
                turno: turno,
                fecha_arribo_programado: fecha_arribo_programado,
                horario_arribo_programado: horario_arribo_programado,
                comentarios: comentarios,
                fk_motivo_programacion_arribo: id_motivo_programacion_arribo,
            });
            // console.log('programacion', programacion.dataValues);

            const programacionCreada = await Agenda.create(
                programacion.dataValues, { transaction: t }
            );

            const pickandup = new Pickandup({
                base: base,
                unidad: unidad,
                operador: operador,
                estatus: 'programado',
                unidad_negocio: unidad_neg,
                division: division,
                cargado: cargado,
                fk_cliente: id_cliente,
                fk_agenda: programacionCreada.id_agenda,
                fk_usuario: id_usuario,
            });
            // console.log('pickandup', pickandup.dataValues);

            const pickandupCreado = await Pickandup.create(
                pickandup.dataValues, { transaction: t }
            );

            await t.commit();
            return res.status(200).json({ 
                OK: true,
                msg: 'Agendado correctamente',
                result: {pickandupCreado, programacionCreada},
            });
        } catch (error) {
            if (t) await t.rollback();
            console.error('Error en Programar Arribo:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.actualizarArribo = async (req, res) => {

        const arribo = req.body;
        // console.log(arribo)
        let t;

        try {
            t = await sequelize.transaction();

            const pickandup = {
                base: arribo.base,
                unidad: arribo.unidad,
                operador: arribo.operador,
                fk_cliente: arribo.cliente,
                unidad_negocio: arribo.unidad_negocio,
                division: arribo.division,
                cargado: arribo.cargado,
            }

            const programacion = {
                base: arribo.base,
                turno: arribo.turno,
                horario_arribo_programado: arribo.horario_arribo_programado,
                comentarios: arribo.comentarios,
                fk_motivo_programacion_arribo: arribo.id_motivo_programacion_arribo,
            }
            
            if(arribo.cancelada){

                const programacionCancelada = await Pickandup.update(
                    { estatus: 'cancelado' },
                    {
                        where: { idpickandup: arribo.idpickandup },
                        transaction: t
                    }
                )

                const reprogramacionAnteriorCheck = await ReprogramacionesArribos.findAll({
                    where: { fk_agenda: arribo.id_agenda },
                    attributes: ['id_reprogramacion_arribo'],
                    order: [['id_reprogramacion_arribo', 'DESC']],
                    limit: 1,
                    transaction: t
                });

                if(reprogramacionAnteriorCheck.length > 0){

                    const id_reprogramacion_arribo = reprogramacionAnteriorCheck[0].dataValues.id_reprogramacion_arribo;
                    
                    await ReprogramacionesArribos.update(
                        { cumplimiento_arribo_reprogramacion: 'cancelado' },
                        {
                            where: {id_reprogramacion_arribo: id_reprogramacion_arribo},
                            transaction: t
                        }
                    )
                }

                if(reprogramacionAnteriorCheck.length === 0){
                    await Agenda.update(
                        { cumplimiento_arribo: 'cancelado' },
                        {
                            where:{id_agenda: arribo.id_agenda},
                            transaction: t
                        }
                    )
                }

                await t.commit();

                return res.status(200).json({ 
                    OK: true,
                    msg: 'Programación cancelada correctamente',
                    result: programacionCancelada,
                });
            }

            if(arribo.reprogramada){

                const reprogramacionAnteriorCheck = await ReprogramacionesArribos.findOne({
                    where: { fk_agenda: arribo.id_agenda },
                    transaction: t
                });
                // console.log('reprogramacionAnteriorCheck', reprogramacionAnteriorCheck)

                if(reprogramacionAnteriorCheck){
                    await ReprogramacionesArribos.update(
                        { cumplimiento_arribo_reprogramacion: 'reprogramado' },
                        {
                            where: {id_reprogramacion_arribo: reprogramacionAnteriorCheck.id_reprogramacion_arribo},
                            transaction: t
                        }
                    )
                }

                if(!reprogramacionAnteriorCheck){
                    await Agenda.update(
                        { cumplimiento_arribo: 'reprogramado' },
                        {
                            where:{id_agenda: arribo.id_agenda},
                            transaction: t
                        }
                    )
                }

                const reprogramacion = {
                    fk_agenda: arribo.id_agenda,
                    fecha_arribo_reprogramado: arribo.fecha_arribo_reprogramado,
                    horario_arribo_reprogramado: arribo.horario_arribo_reprogramado,
                    causa_reprogramacion: arribo.causa_reprogramacion
                }

                await ReprogramacionesArribos.create(reprogramacion, { transaction: t });
                // console.log('Se creo reprogramacion')
            }

            // console.log('pickandup', pickandup);
            // console.log('programacion', programacion);

            const arriboActualizado = await Agenda.update(
                programacion,
                {
                    where: { id_agenda: arribo.id_agenda },
                    transaction: t
                }
            );

            // console.log('arriboActualizado', arriboActualizado);
            const pickAndUpActualizado = await Pickandup.update(
                pickandup,
                {
                    where: { idpickandup: arribo.idpickandup },
                    transaction: t
                }
            );
            // console.log('pickAndUpActualizado', pickAndUpActualizado)
            await t.commit();

            return res.status(200).json({ 
                OK: true,
                msg: 'Programación actualizada correctamente',
                result: {arriboActualizado, pickAndUpActualizado},
            });
        } catch (error) {

            if (t) await t.rollback();

            console.error('Error en Programar Arribo:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.arribosExportable = async (req, res) => {

        try {

            const ingresos = await sequelize.query(
                `
                    SELECT
                        PAU.idpickandup AS 'id',
                        CASE
                            WHEN PAU.base = 1 THEN 'SALINAS'
                            WHEN PAU.base = 2 THEN 'SALAMANCA'
                        END AS base,
                        PAU.unidad AS 'economico',
                        PAU.operador,
                        PAU.division,
                        PAU.unidad_negocio,
                        CASE 
                            WHEN PAU.fk_agenda IS NOT NULL THEN 1
                            ELSE 0
                        END AS agendado,
                        CASE 
                            WHEN PAU.fk_entrada IS NOT NULL THEN 1
                            ELSE 0
                        END AS entrada
                    FROM
                        pd_pickandup PAU
                    WHERE
                        PAU.fk_entrada IS NOT NULL
                        AND DATE(PAU.creado_el) >= CURDATE() - INTERVAL 62 DAY;
                `,
                {
                    type: sequelize.QueryTypes.SELECT,
                }
            );
            
            return res.status(200).json({ 
                OK: true,
                msg: 'Obtenido correctamente',
                result: ingresos,
            });
        } catch (error) {
            console.error('Error en obtener arribos exportable:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.estatusUnidades = async (req, res) => {

        try {

            const unidades = await sequelize.query(
                `
                    SELECT
                        CASE
                            WHEN PAU.base = 1 THEN 'MTY'
                            WHEN PAU.base = 2 THEN 'SAL'
                        END AS base,
                        PAU.unidad,
                        PAU.operador,
                        PAU.division,
                        PAU.unidad_negocio,
                        DATE(A.fecha_arribo_programado) AS fecha_agenda,
                        DATE(E.fecha_entrada) AS fecha_entrada,
                        CASE
                            WHEN EV.ingreso_mtto IS NULL THEN NULL
                            WHEN EV.ingreso_mtto = 0 THEN NULL
                            WHEN EV.ingreso_mtto = 1 THEN DATE(EV.creado_el)
                        END AS ingreso_mtto,
                        DATE(EV.creado_el) AS fecha_ingreso_mtto,
                        DATE(S.fecha_salida) AS fecha_salida
                    FROM
                        pd_pickandup PAU
                        LEFT JOIN pd_agenda A ON PAU.fk_agenda = A.id_agenda
                        LEFT JOIN pd_entrada E ON PAU.fk_entrada = E.id_entrada
                        LEFT JOIN pd_evidencias EV ON PAU.fk_evidencias = EV.id_evidencias
                        LEFT JOIN pd_salida S ON PAU.fk_salida = S.id_salida;
                `,
                {
                    type: sequelize.QueryTypes.SELECT,
                }
            );
            
            return res.status(200).json(unidades);
        } catch (error) {
            console.error('Error en obtener estatus unidades conexion:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    const anularAgendaAutomatico = async () => {
        let t;

        try {
            t = await sequelize.transaction();

            const unidadesAgendadas = await sequelize.query(
                `
                    SELECT
                        AG.id_agenda,
                        PAU.unidad,
                        DATE(AG.fecha_arribo_programado) AS fecha_arribo_programado,
                        AG.cumplimiento_arribo,
                        RE.id_primera_reprogramacion,
                        RE.fecha_primera_reprogramacion,
                        RE.cumplimiento_primera_reprogramacion,
                        RE.id_segunda_reprogramacion,
                        RE.fecha_segunda_reprogramacion,
                        RE.cumplimiento_segunda_reprogramacion
                    FROM
                        pd_agenda AG
                        LEFT JOIN pd_pickandup PAU ON AG.id_agenda = PAU.fk_agenda
                        LEFT JOIN (
                            WITH                            
                            reprogramaciones AS (
                                SELECT
                                    RA.fk_agenda,
                                    RA.id_reprogramacion_arribo AS id_primera_reprogramacion,
                                    RA.fecha_arribo_reprogramado AS fecha_primera_reprogramacion,
                                    RA.cumplimiento_arribo_reprogramacion AS cumplimiento_primera_reprogramacion,
                                    LEAD(RA.id_reprogramacion_arribo) OVER (PARTITION BY RA.fk_agenda ORDER BY RA.id_reprogramacion_arribo ASC) AS id_segunda_reprogramacion,
                                    LEAD(RA.fecha_arribo_reprogramado) OVER (PARTITION BY RA.fk_agenda ORDER BY RA.id_reprogramacion_arribo ASC) AS fecha_segunda_reprogramacion,
                                    LEAD(RA.cumplimiento_arribo_reprogramacion) OVER (PARTITION BY RA.fk_agenda ORDER BY RA.id_reprogramacion_arribo ASC) AS cumplimiento_segunda_reprogramacion,
                                    ROW_NUMBER() OVER (PARTITION BY RA.fk_agenda ORDER BY RA.id_reprogramacion_arribo ASC) AS rn
                                FROM pd_reprogramaciones_arribos RA
                            )
                            SELECT
                                fk_agenda,
                                id_primera_reprogramacion,
                                fecha_primera_reprogramacion,
                                cumplimiento_primera_reprogramacion,
                                id_segunda_reprogramacion,
                                fecha_segunda_reprogramacion,
                                cumplimiento_segunda_reprogramacion
                            FROM reprogramaciones
                            WHERE rn = 1
                        ) AS RE ON RE.fk_agenda = AG.id_agenda
                    WHERE
                    (AG.cumplimiento_arribo NOT IN ('cumplio_arribo','incumplio_arribo','cancelado','anulado') OR AG.cumplimiento_arribo IS NULL)
                    AND (cumplimiento_primera_reprogramacion NOT IN ('cumplio_arribo','incumplio_arribo','cancelado','anulado') OR cumplimiento_primera_reprogramacion IS NULL)
                    AND (cumplimiento_segunda_reprogramacion NOT IN ('cumplio_arribo','incumplio_arribo','cancelado','anulado') OR cumplimiento_segunda_reprogramacion IS NULL);
                `,
                {
                    type: sequelize.QueryTypes.SELECT,
                    transaction: t,
                }
            );

            let idsAgendasMayorDosDias = [];
            let idsReprogramacionesMayorDosDias = [];
            let idsAgendaAnuladasEnReprogramaciones = [];

            unidadesAgendadas.forEach((agenda) => {
                const fechaActual = moment();
                const fechaAgenda = moment(
                    agenda.fecha_segunda_reprogramacion
                    ?? agenda.fecha_primera_reprogramacion
                    ?? agenda.fecha_arribo_programado
                );

                const diferenciaDias = fechaActual.diff(fechaAgenda, 'days');

                const id_agenda = agenda.id_agenda;
                const id_reprogramacion = 
                    agenda.id_segunda_reprogramacion !== null ? agenda.id_segunda_reprogramacion 
                    : agenda.id_primera_reprogramacion !== null ? agenda.id_primera_reprogramacion 
                    : null;

                const cumpleAnulacion = diferenciaDias >= 2;
                const esReprogramado = id_reprogramacion !== null;
                // console.log(agenda.unidad, cumpleAnulacion, esReprogramado)
                // console.log(agenda.id_agenda, agenda.id_primera_reprogramacion, agenda.id_segunda_reprogramacion)
                if (cumpleAnulacion && !esReprogramado) {
                    idsAgendasMayorDosDias.push(id_agenda);
                }
                
                if (cumpleAnulacion && esReprogramado) {
                    idsReprogramacionesMayorDosDias.push(id_reprogramacion);
                    idsAgendaAnuladasEnReprogramaciones.push(id_agenda)
                }
            });

            if(idsReprogramacionesMayorDosDias.length > 0){
                await ReprogramacionesArribos.update(
                    { cumplimiento_arribo_reprogramacion: 'anulado' },
                    {
                        where: {
                            id_reprogramacion_arribo: { [Op.in]: idsReprogramacionesMayorDosDias }
                        },
                        transaction: t
                    }
                );

                await Pickandup.update(
                    { estatus: 'anulado' },
                    {
                        where: {
                            fk_agenda: { [Op.in]: idsAgendaAnuladasEnReprogramaciones }
                        },
                        transaction: t
                    }
                );
            }

            if(idsAgendasMayorDosDias.length > 0){
                await Agenda.update(
                    { cumplimiento_arribo: 'anulado' },
                    {
                        where: {
                            id_agenda: { [Op.in]: idsAgendasMayorDosDias }
                        },
                        transaction: t
                    }
                );

                await Pickandup.update(
                    { estatus: 'anulado' },
                    {
                        where: { 
                            fk_agenda: { [Op.in]: idsAgendasMayorDosDias }
                        },
                        transaction: t
                    }
                );
            }
            await t.commit();
            // console.log({idsAgendasMayorDosDias, idsReprogramacionesMayorDosDias})
            // console.log('pd_agenda: anulacion de agendas automaticas hecha');
            if(idsAgendasMayorDosDias.length > 0 || idsReprogramacionesMayorDosDias.length > 0){
                io.emit('agenda-recargarProgramaciones')
            }


        } catch (error) {
            console.error('Error al anular agendas automaticamente:', error);
            if (t) await t.rollback();
        }
    }

    const INTERVALO = 20 * 60 * 60 * 1000; // 20 Horas
    // const INTERVALO = 20 * 1000; //20 Segundos
    setInterval(() => {
        anularAgendaAutomatico().catch(console.error);
    }, INTERVALO);

    return app;
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

// #region consultas SQL

const ctdUnidadesArriboHoy = async (sequelize, base, res) => {

    try {
        
        const ctdUnidadesArriboHoy = await sequelize.query(
        `
            WITH
                reprogramadas_arribo_hoy AS (
                    SELECT
                        DATE(RA.fecha_arribo_reprogramado) AS fecha_programada,
                        COUNT(*) AS programadas
                    FROM
                        pd_reprogramaciones_arribos RA
                        LEFT JOIN pd_agenda CA ON RA.fk_agenda = CA.id_agenda
                    WHERE
                        CA.base = :base
                        AND DATE(RA.fecha_arribo_reprogramado) = current_date()
                        AND RA.cumplimiento_arribo_reprogramacion = 'cumplio_arribo'
                    GROUP BY 
                        RA.fecha_arribo_reprogramado
                ),
                programadas_hoy AS (
                    SELECT
                        DATE(CA.fecha_arribo_programado) AS fecha_programada,
                        COUNT(*) AS programadas
                    FROM
                        pd_agenda CA
                    WHERE
                        CA.base = :base
                        AND DATE(CA.fecha_arribo_programado) = current_date()
                        AND CA.cumplimiento_arribo = 'cumplio_arribo'
                    GROUP BY
                        CA.fecha_arribo_programado
                )

                SELECT 
                    P.fecha_programada,
                    SUM(P.programadas) AS total_arribos
                FROM (
                    SELECT * FROM reprogramadas_arribo_hoy
                    UNION ALL
                    SELECT * FROM programadas_hoy
                ) AS P
                GROUP BY P.fecha_programada;
            `,
            {
                replacements: {
                    base: base,
                },
                type: sequelize.QueryTypes.SELECT,
            }
        );

    return Number(ctdUnidadesArriboHoy[0]?.total_arribos);

    } catch (error) {
        console.error('Error en obtener ctdUnidadesProgramadasSemanaActual:', error);
        throw new Error(error);
    }
}

const ctdUnidadesProgramadasArriboHoy = async (sequelize, base) => {

    try {
        
        const ctdUnidadesProgramadasArriboHoy = await sequelize.query(
        `
           WITH
            reprogramadas_arribo_hoy AS (
                SELECT
                    DATE(RA.fecha_arribo_reprogramado) AS fecha_programada,
                    RA.fk_agenda AS id_agenda,
                    PAU.unidad_negocio
                FROM
                    pd_reprogramaciones_arribos RA
                    LEFT JOIN pd_agenda CA ON RA.fk_agenda = CA.id_agenda
                    LEFT JOIN pd_pickandup PAU ON CA.id_agenda = PAU.fk_agenda
                WHERE
                    CA.base = :base
                    AND DATE(RA.fecha_arribo_reprogramado) = current_date()
                    AND (
                        RA.cumplimiento_arribo_reprogramacion NOT IN ('cancelado', 'reprogramado', 'anulado')
                        OR RA.cumplimiento_arribo_reprogramacion IS NULL
                    )
                GROUP BY 
                    RA.fecha_arribo_reprogramado,
                    RA.fk_agenda,
                    PAU.unidad_negocio
            ),
            programadas_hoy AS (
                SELECT
                    DATE(CA.fecha_arribo_programado) AS fecha_programada,
                    CA.id_agenda,
                    PAU.unidad_negocio
                FROM
                    pd_agenda CA
                    LEFT JOIN pd_pickandup PAU ON CA.id_agenda = PAU.fk_agenda
                WHERE
                    CA.base = :base
                    AND DATE(CA.fecha_arribo_programado) = current_date()
                    AND (
                        CA.cumplimiento_arribo NOT IN ('cancelado', 'reprogramado', 'anulado')
                        OR CA.cumplimiento_arribo IS NULL
                    )
                GROUP BY
                    CA.fecha_arribo_programado,
                    CA.id_agenda,
                    PAU.unidad_negocio
            ),
            union_arribos AS (
                SELECT * FROM reprogramadas_arribo_hoy
                UNION
                SELECT * FROM programadas_hoy
            )
            SELECT 
                fecha_programada,
                unidad_negocio,
                COUNT(DISTINCT id_agenda) AS total_arribos
            FROM 
                union_arribos
            GROUP BY 
                fecha_programada,
                unidad_negocio
            ORDER BY
                fecha_programada,
                unidad_negocio;
        `,
        {
            replacements: {
            base: base,
            },
            type: sequelize.QueryTypes.SELECT,
        }
        );

    return ctdUnidadesProgramadasArriboHoy;

    } catch (error) {
        console.error('Error en obtener ctdUnidadesProgramadasSemanaActual:', error);
        throw new Error(error);
    }
}

const programacionesYEstatusDeLaSemana = async (sequelize, base, fechaInicio, fechaFin) => {

    try {

        const programacionesSemanaYEstatus = await sequelize.query(
        `
            WITH
            reprogramadas_arribo_hoy AS (
            SELECT
                RA.fk_agenda AS id_agenda,
                RA.fecha_arribo_reprogramado AS fecha_programada,
                RA.cumplimiento_arribo_reprogramacion AS cumplimiento,
                RA.horario_arribo_reprogramado AS horario_arribo,
                MA.motivo AS motivo
            FROM
                pd_reprogramaciones_arribos RA
                LEFT JOIN pd_agenda CA ON RA.fk_agenda = CA.id_agenda
                LEFT JOIN pd_motivo_programacion_arribo MA ON CA.fk_motivo_programacion_arribo = MA.id_motivo_programacion_arribo
            WHERE
                CA.base = :base
                AND RA.fecha_arribo_reprogramado BETWEEN :fechaInicio AND :fechaFin
            ),
            programadas_hoy AS (
            SELECT
                CA.id_agenda,
                CA.fecha_arribo_programado AS fecha_programada,
                CA.cumplimiento_arribo AS cumplimiento,
                CA.horario_arribo_programado AS horario_arribo,
                MA.motivo
            FROM
                pd_agenda CA
                LEFT JOIN pd_motivo_programacion_arribo MA ON CA.fk_motivo_programacion_arribo = MA.id_motivo_programacion_arribo
            WHERE
                CA.base = :base
                AND DATE(CA.fecha_arribo_programado) BETWEEN :fechaInicio AND :fechaFin
            ),
            union_arribos AS (
            SELECT * FROM reprogramadas_arribo_hoy
            UNION
            SELECT * FROM programadas_hoy
            )
            
            SELECT
                UA.id_agenda,
                PAU.unidad,
                DATE(UA.fecha_programada) AS fecha_programada,
                UA.horario_arribo,
                UA.cumplimiento,
                DATE(EN.fecha_entrada) AS fecha_entrada,
                UA.motivo
            FROM
                union_arribos UA
                LEFT JOIN pd_pickandup PAU ON UA.id_agenda = PAU.fk_agenda
                LEFT JOIN pd_entrada EN ON PAU.fk_entrada = EN.id_entrada;
        `,
        {
            replacements: {
            base: base,
            fechaInicio: fechaInicio,
            fechaFin: fechaFin
            },
            type: sequelize.QueryTypes.SELECT,
        }
        );

        return programacionesSemanaYEstatus;
        
    } catch (error) {
        console.error('Error en obtener programacionesYEstatusDeLaSemana:', error);
        throw new Error(error);
    }
}

//#endregion