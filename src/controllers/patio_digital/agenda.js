const moment = require("moment");
const { Op } = require('sequelize');

const axios = require('axios');


module.exports = app => {

    const Agenda = app.database.models.Agenda;
    const ReprogramacionesArribos = app.database.models.Reprogramaciones_arribos;
    const Pickandup = app.database.models.PickAndUp;

    const MotivoArribo = app.database.models.Motivo_programacion_arribo;
    const Cliente = app.database.models.Clientes;

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
        const fechaInicio = req.params.fechaInicio;
        const fechaFin = req.params.fechaFin;

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
                limit: 150
            });

            const unidadesProgramadasSemanaActual = await ctdUnidadesProgramadasSemanaActual(sequelize, base, fechaInicio, fechaFin);
            
            const programadasArriboHoy = await ctdUnidadesProgramadasArriboHoy(sequelize, base);

            const arribosHoy = await ctdUnidadesArriboHoy(sequelize, base);

            return res.json({ 
                OK: true, 
                result: { programaciones, programadasArriboHoy, arribosHoy, unidadesProgramadasSemanaActual },
            });
        } catch (error) {
            console.error('Error en obtenerArribosProgramados:', error);
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
                "global": []
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
                if (horarioKey && dataset[horarioKey]) {
                    fechaObj = dataset[horarioKey].find(obj => obj.fecha_programada === programacion.fecha_programada);
                    if (fechaObj) {
                        fechaObj.arribos.push(programacion);
                    }
                }
                
                let globalObj = dataset["global"].find(obj => obj.fecha_programada === programacion.fecha_programada);
                if (globalObj) {
                    globalObj.arribos.push(programacion);
                }
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

    app.opcionesParaFormulario = async (req, res) => {

        try {

            const clientes = await Cliente.findAll({
                attributes: [
                    ['id_cliente', 'value'],
                    ['cliente', 'label']
                ],
            });
            
            // await sql.connect(sqlConfig);
            
            const operadoresRaw = await listadoOperadors();
            const operadores = Array.isArray(operadoresRaw)
                ? operadoresRaw.map(({ OPERADOR_NOMBRE }) => ({
                    operador: OPERADOR_NOMBRE,
                }))
                : [];
            
            const unidades = await listadoTracto();

            const motivos = await MotivoArribo.findAll({
                attributes: [
                    ['id_motivo_programacion_arribo', 'value'],
                    ['motivo', 'label']
                ],
            });

            return res.json({ 
                OK: true, 
                result: {
                    clientes,
                    unidades: unidades,
                    operadores: operadores,
                    motivos
                }, 
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

const listadoTracto = async () => {
    try {
        const response = await axios.get('https://servidorlocal.ngrok.app/catalogoTracto');
        return response.data.result;
    } catch (error) {
        console.error('Error consultando la API de operadores:', error.message);
        return null;
    }
}

// #region consultas SQL

const ctdUnidadesProgramadasSemanaActual = async (sequelize, base, fechaInicio, fechaFin) => {

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
                    RA.cumplimiento_arribo_reprogramacion NOT IN ('cancelado', 'reprogramado')
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
                    CA.cumplimiento_arribo NOT IN ('cancelado', 'reprogramado')
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

    return programacionesDiariasSemanaActual[0];

    } catch (error) {
        console.error('Error en obtener ctdUnidadesProgramadasSemanaActual:', error);
        throw new Error(error);
    }
}

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
                RA.fk_agenda AS id_agenda
            FROM
                pd_reprogramaciones_arribos RA
                LEFT JOIN pd_agenda CA ON RA.fk_agenda = CA.id_agenda
            WHERE
                CA.base = :base
                AND DATE(RA.fecha_arribo_reprogramado) = current_date()
                AND (RA.cumplimiento_arribo_reprogramacion NOT IN ('cancelado', 'reprogramado') OR RA.cumplimiento_arribo_reprogramacion IS NULL)
            GROUP BY 
                RA.fecha_arribo_reprogramado,
                RA.fk_agenda
            ),
            programadas_hoy AS (
            SELECT
                DATE(CA.fecha_arribo_programado) AS fecha_programada,
                CA.id_agenda
            FROM
                pd_agenda CA
            WHERE
                CA.base = :base
                AND DATE(CA.fecha_arribo_programado) = current_date()
                AND (CA.cumplimiento_arribo NOT IN ('cancelado', 'reprogramado') OR CA.cumplimiento_arribo IS NULL)
            GROUP BY
                CA.fecha_arribo_programado,
                CA.id_agenda
            ),
            union_arribos AS (
            SELECT * FROM reprogramadas_arribo_hoy
            UNION
            SELECT * FROM programadas_hoy
            )
            SELECT 
            fecha_programada,
            COUNT(DISTINCT id_agenda) AS total_arribos
            FROM union_arribos
            GROUP BY fecha_programada;
        `,
        {
            replacements: {
            base: base,
            },
            type: sequelize.QueryTypes.SELECT,
        }
        );

    return Number(ctdUnidadesProgramadasArriboHoy[0]?.total_arribos);

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
                RA.horario_arribo_reprogramado AS horario_arribo
            FROM
                pd_reprogramaciones_arribos RA
                LEFT JOIN pd_agenda CA ON RA.fk_agenda = CA.id_agenda
            WHERE
                CA.base = :base
                AND RA.fecha_arribo_reprogramado BETWEEN :fechaInicio AND :fechaFin
            ),
            programadas_hoy AS (
            SELECT
                CA.id_agenda,
                CA.fecha_arribo_programado AS fecha_programada,
                CA.cumplimiento_arribo AS cumplimiento,
                CA.horario_arribo_programado AS horario_arribo
            FROM
                pd_agenda CA
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
                UA.cumplimiento
            FROM
                union_arribos UA
                LEFT JOIN pd_pickandup PAU ON UA.id_agenda = PAU.fk_agenda;
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