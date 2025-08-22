const moment = require('moment');
const axios = require('axios');
const path = require('path');
const fs = require('fs');

module.exports = app => {

    const Sequelize = app.database.sequelize;
    const Unidad = app.database.models.Unidades;
    const Cliente = app.database.models.Clientes;
    const Coordinador = app.database.models.Coordinador;
    const Circuito = app.database.models.Circuito;

    const CambiosUnNegocio = app.database.models.CambiosUnNegocio;

    const docunidad = app.database.models.DocsUnidades;

    
    app.obtenerEstructura = async (req, res) => {

        try {
            const unidad = await Sequelize.query(
                `
                    SELECT
                        U.name AS economico,
                        U.division,
                        U.tag AS unidad,
                        CLI.cliente,
                        COR.nombre_coor AS coordinador,
                        CIR.nombre_circuito AS circuito
                    FROM
                        unidad U
                        LEFT JOIN cliente CLI ON U.idcliente = CLI.id_cliente
                        LEFT JOIN coordinador COR ON U.idcoordinador = COR.id_coordinador
                        LEFT JOIN circuito CIR ON U.idcircuito = CIR.id_circuito
                    WHERE
                        U.estado = 'A'
                    ORDER BY
                        U.name ASC;
                `,
                {
                    type: Sequelize.QueryTypes.SELECT,
                }
            );

            // console.log(unidad[0]);

            return res.status(200).json(unidad);

        } catch (error) {
            console.error('Error al obtener estructura:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.obtenerDetallesUnidad = async (req, res) => {

        try {

            const id_unidad = req.params.id_unidad;

            const unidad = await Sequelize.query(
                `
                    SELECT
                        U.id_unidad,
                        U.name,
                        U.make,
                        U.model,
                        U.year,
                        U.estructura,
                        U.categoria,
                        U.division,
                        U.tag,
                        U.idcliente,
                        C.cliente,
                        U.idcircuito,
                        CI.nombre_circuito,
                        U.idcoordinador,
                        CO.nombre_coor,
                        U.neg_tipo,
                        U.operador,
                        U.estado,
                        U.gobernada,
                        U.fechagobernada,
                        U.paromotor,  
                        U.fechaparomotor
                    FROM
                        unidad U
                        LEFT JOIN cliente C ON U.idcliente = C.id_cliente
                        LEFT JOIN coordinador CO ON U.idcoordinador = CO.id_coordinador
                        LEFT JOIN circuito CI ON U.idcircuito = CI.id_circuito
                    WHERE
                        U.id_unidad = :id_unidad 
                    ORDER BY
                        U.division, U.tag, C.cliente, U.name
                `,
                {
                    type: Sequelize.QueryTypes.SELECT,
                    replacements: { id_unidad: id_unidad }
                }
            );

            // console.log(unidad[0]);

            return res.status(200).json({
                OK: true,
                msg: 'Obtenido detalles de unidad correctamente',
                result: unidad[0]
            });

        } catch (error) {
            console.error('Error al obtener detalles de unidad:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.obtenerDocumentosUnidad = async (req, res) => {

        try {
            const id_unidad = req.params.id_unidad;

            const documentos = docunidad.findAll({
                where: {
                    unidad: id_unidad
                },
                order: [
                    ['fecha', 'DESC']
                ],
            })

            return res.status(200).json({
                OK: true,
                msg: 'Documentos obtenidos correctamente',
                result: documentos
            });

        } catch (error) {
            console.error('Error al obtener documentos:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.obtenerUnidades = async (req, res) => {

        try {

            const unidades = await Sequelize.query(
                `
                    SELECT
                        U.id_unidad,
                        U.name,
                        U.tag,
                        U.make,
                        U.estructura,
                        U.division,
                        U.estructura,
                        C.id_cliente,
                        C.cliente,
                        CO.id_coordinador,
                        CO.nombre_coor,
                        CI.id_circuito,
                        CI.nombre_circuito,
                        U.operador,
                        U.estado,
                        U.neg_tipo,
                        U.gobernada,
                        U.fechagobernada
                    FROM
                        unidad U
                        LEFT JOIN cliente C ON U.idcliente = C.id_cliente
                        LEFT JOIN coordinador CO ON U.idcoordinador = CO.id_coordinador
                        LEFT JOIN circuito CI ON U.idcircuito = CI.id_circuito
                    WHERE
                        U.estado = 'A'
                    ORDER BY
                        U.division, U.tag, C.cliente, U.name
                `,
                {
                    type: Sequelize.QueryTypes.SELECT,
                }
            );

            const resultado = [];

            unidades.map(item => {
                // Agrupar por división
                let divisionGrupo = resultado.find(d => d.division === item.division);
                if (!divisionGrupo) {
                    divisionGrupo = {
                        division: item.division,
                        unidades: []
                    };
                    resultado.push(divisionGrupo);
                }

                // Agrupar por tag dentro de la división
                let unidadGrupo = divisionGrupo.unidades.find(u => u.tag === item.tag);
                if (!unidadGrupo) {
                    unidadGrupo = {
                        tag: item.tag,
                        clientes: []
                    };
                    divisionGrupo.unidades.push(unidadGrupo);
                }

                // Agrupar por cliente y coordinador
                const clienteKey = [
                    item.id_cliente,
                    item.cliente,
                    item.id_coordinador,
                    item.nombre_coor,
                    item.neg_tipo,
                    // item.id_circuito,
                    // item.nombre_circuito
                ].join('|');

                let clienteGrupo = unidadGrupo.clientes.find(c =>
                    [
                        c.id_cliente,
                        c.cliente,
                        c.id_coordinador,
                        c.nombre_coor,
                        c.neg_tipo,
                        // c.id_circuito,
                        // c.nombre_circuito
                    ].join('|') === clienteKey
                );

                if (!clienteGrupo) {
                    clienteGrupo = {
                        id_cliente: item.id_cliente,
                        cliente: item.cliente,
                        id_coordinador: item.id_coordinador,
                        nombre_coor: item.nombre_coor,
                        neg_tipo: item.neg_tipo,
                        tractos: []
                    };
                    unidadGrupo.clientes.push(clienteGrupo);
                }

                // Agregar tracto
                clienteGrupo.tractos.push({
                    id_unidad: Number(item.id_unidad),
                    name: item.name,
                    neg_tipo: item.neg_tipo,
                    id_cliente: item.id_cliente,
                    cliente: item.cliente,
                    estructura: item.estructura,
                    id_coordinador: item.id_coordinador,
                    nombre_coor: item.nombre_coor,
                    tag: item.tag,
                    division: item.division
                });
            });

            return res.status(200).json({
                OK: true,
                msg: 'Unidades obtenidas correctamente',
                result: resultado,
                tabla: unidades
            });

        } catch (error) {
            console.error('Error al obtener Unidades:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.obtenerCoordinadores = async (req, res) => {
        try {

            const coordinadores = await Coordinador.findAll({
                where: { activo: 'A' },
            })
            
            return res.status(200).json({
                OK: true,
                msg: 'Coordinadores obtenidas correctamente',
                result: coordinadores,
            });

        } catch (error) {
            console.error('Error al obtener Coordinadores:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.obtenerTodosCoordinadores = async (req, res) => {
        try {

            const coordinadores = await Coordinador.findAll();
            
            return res.status(200).json({
                OK: true,
                msg: 'Coordinadores obtenidas correctamente',
                result: coordinadores,
            });

        } catch (error) {
            console.error('Error al obtener todos los Coordinadores:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.obtenerClientes = async (req, res) => {
        try {

            const clientes = await Cliente.findAll({
                where: { activo: 'A' },
            });
            
            return res.status(200).json({
                OK: true,
                msg: 'Clientes obtenidas correctamente',
                result: clientes,
            });

        } catch (error) {
            console.error('Error al obtener Clientes:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.obtenerCircuitos = async (req, res) => {

        try {
            const circuitos = await Circuito.findAll({
                where: { activo: 'A' },
            })

            return res.status(200).json({
                OK: true,
                msg: 'Catalogo circuitos obtenido correctamente',
                result: circuitos
            });

        } catch (error) {
            console.error('Error al obtener catalogo circuitos:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.obtenerOperadores = async (req, res) => {

        try {
            
            const response = await axios.get('https://servidorlocal.ngrok.app/listadoOperadores');

            const operadores = Array.isArray(response.data.Registros)
                ? response.data.Registros.map(({ OPERADOR_NOMBRE }) => ({
                    operador: OPERADOR_NOMBRE,
                }))
                : [];
            return res.status(200).json({
                OK: true,
                msg: 'Operadores obtenidos correctamente',
                result: operadores
            });

        } catch (error) {
            console.error('Error al obtener catalogo operadores:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.obtenerResumenUnidades = async (req, res) => {

        try {

            const jerarquia = await Sequelize.query(
                `
                    SELECT
                        division,
                        SUM(total_tag) AS total_division,
                        JSON_ARRAYAGG(
                            JSON_OBJECT(
                                'tag', tag,
                                'total', total_tag,
                                'clientes', clientes
                            )
                        ) AS tags
                    FROM (
                        SELECT
                            division,
                            tag,
                            SUM(unidades) AS total_tag,
                            JSON_ARRAYAGG(
                                JSON_OBJECT(
                                    'cliente', cliente,
                                    'unidades', unidades
                                )
                            ) AS clientes
                        FROM (
                            SELECT
                                U.division,
                                U.tag,
                                C.cliente,
                                COUNT(*) AS unidades
                            FROM unidad U
                            LEFT JOIN cliente C ON U.idcliente = C.id_cliente
                            WHERE U.estado = 'A'
                            GROUP BY U.division, U.tag, U.idcliente, C.cliente
                            ORDER BY cliente
                        ) AS base
                        GROUP BY division, tag
                        ORDER BY tag
                    ) AS tags_group
                    GROUP BY division
                    ORDER BY division;
                `,
                {
                    type: Sequelize.QueryTypes.SELECT,
                }
            );

            return res.status(200).json({
                OK: true,
                msg: 'obtenido resumen correctamente',
                result: jerarquia
            });

        } catch (error) {
            console.error('Error al obtener resumen por division:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.obtenerResumenPorEstructuras = async (req, res) => {

        try {
            const resumen = await Sequelize.query(
                `
                   SELECT 
                        division,
                        estructuras
                    FROM (
                        SELECT 
                            division,
                            JSON_ARRAYAGG(
                                JSON_OBJECT(
                                    'estructura', estructura,
                                    'cantidad', total_estructura
                                )
                            ) AS estructuras
                        FROM (
                            SELECT 
                                division,
                                estructura,
                                COUNT(*) AS total_estructura
                            FROM unidad
                            WHERE estado = 'A'
                            GROUP BY division, estructura
                            ORDER BY division, estructura
                        ) AS t1
                        GROUP BY division
                    ) AS t2;
                `,
                {
                    type: Sequelize.QueryTypes.SELECT,
                }
            );

            return res.status(200).json({
                OK: true,
                msg: 'Resumen por estructuras obtenido correctamente',
                result: resumen
            });

        } catch (error) {
            console.error('Error al obtener resumen por estructura:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.actualizarEstructura = async (req, res) => {

        let t;
        const tractos = req.body;

        try {
            t = await Sequelize.transaction();

            for(let tracto of tractos){
                // console.log('tracto',tracto)
                const update = {
                    id_unidad: tracto.id_unidad,
                    neg_tipo: tracto.neg_tipo,
                    idcliente: tracto.id_cliente,
                    idcoordinador: tracto.id_coordinador,
                    tag: tracto.tag,
                    division: tracto.division,
                }

                // console.log('update', update)


                await Unidad.update(
                    update,
                    {
                        where: { id_unidad: update.id_unidad },
                        transaction: t
                    }
                )
                // console.log(test)

                const cambio = {
                    fk_unidad: tracto.id_unidad,
                    fk_coordinador: tracto.id_coordinador,
                    fk_cliente: tracto.id_cliente,
                    unidad: tracto.tag,
                    division: tracto.division,
                    modificado_por: tracto.modificado_por,
                    fecha_cambio: new Date(),
                }

                await CambiosUnNegocio.create(cambio, {transaction: t});
            }

            t.afterCommit(() => {
                app.getUnidadesWebhook();
            });

            await t.commit();
            return res.status(200).json({
                OK: true,
                msg: 'Unidades actualizadas correctamente',
                result: null
            });

        } catch (error) {
            if (t) await t.rollback();
            console.error('Error al actualizar registros:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.actualizarUnidad = async (req, res) => {

        let t;
        const unidad = req.body

        try {

            console.log(unidad)
            t = await Sequelize.transaction();

            await Unidad.update(
                unidad,
                {
                    where: { id_unidad: unidad.id_unidad },
                    transaction: t
                }
            )

            t.afterCommit(() => {
                app.getUnidadesWebhook();
            });
            
            await t.commit();
            return res.status(200).json({
                OK: true,
                msg: 'Unidad actualizado correctamente',
                result: null
            });

        } catch (error) {
            if (t) await t.rollback();
            console.error('Error al actualizar Unidad:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.actualizarCampanas = async (req, res) => {

        let t;
        const {
            usuario,
            name,
            gobernada,
            fechagobernada,
            paromotor,
            fechaparomotor,
            evidenciagobernada,
            evidenciagobernadaName,
            evidenciaparomotor,
            evidenciaparomotorName,
        } = req.body
        // console.log(req.body)

        try {

            t = await Sequelize.transaction();

            let dataGobernada = null;
            let dataParoMotor = null;

            if(evidenciagobernada){

                const filename = saveBase64File(evidenciagobernada, name, usuario);
                const extension = filename.split('.').pop();

                dataGobernada = {
                    unidad: name,
                    nombre: evidenciagobernadaName,
                    descripcion: 'Evidencia',
                    tipo: '.'+extension,
                    camp: 'GOBERNADA',
                    archivo: 'documentos/'+filename,
                    usuario: usuario,
                    fecha: moment().format('YYYY-MM-DD HH:mm'),
                }

                await docunidad.create(dataGobernada, {transaction: t})
            }

            if(evidenciaparomotor){

                const filename = saveBase64File(evidenciaparomotor, name, usuario);
                const extension = filename.split('.').pop();

                dataParoMotor = {
                    unidad: name,
                    nombre: evidenciaparomotorName,
                    descripcion: 'Evidencia',
                    camp: 'PARO_MOTOR',
                    tipo: '.'+extension,
                    archivo: 'documentos/'+filename,
                    usuario: usuario,
                    fecha: moment().format('YYYY-MM-DD HH:mm'),
                }

                await docunidad.create(dataParoMotor, {transaction: t})
            }

            // console.log(dataGobernada);
            // console.log(dataParoMotor);
   
            if(fechagobernada && fechaparomotor){
                await Unidad.update(
                    {
                        fechagobernada: fechagobernada,
                        gobernada: gobernada,
                        fechaparomotor: fechaparomotor,
                        paromotor: paromotor,
                    },
                    { 
                        where : { name: name },
                        transaction: t
                    }
                )
            } else if (fechagobernada){
                await Unidad.update(
                    {
                        fechagobernada: fechagobernada,
                        gobernada: gobernada,
                    },
                    { 
                        where : { name: name },
                        transaction: t
                    }
                )
            } else if (fechaparomotor){
                await Unidad.update(
                    {
                        fechaparomotor: fechaparomotor,
                        paromotor: paromotor,
                    },
                    { 
                        where : { name: name },
                        transaction: t
                    }
                )
            }

            t.afterCommit(() => {
                app.getTablaUnidadesWebhook();
            });
            
            await t.commit();
            return res.status(200).json({
                OK: true,
                msg: 'Campañas actualizadas correctamente',
                result: null
            });

        } catch (error) {
            if (t) await t.rollback();
            console.error('Error al actualizar campañas:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.obtenerHistoricoEvidencias = async (req, res) => {

        let t;
        try {
            t = await Sequelize.transaction();
            const { unidad, camp } = req.params

            // console.log(unidad, camp)

            const evidencias = await Sequelize.query(
                `
                    SELECT
                        unidad,
                        camp,  
                        descripcion,
                        archivo,
                        usuario,
                        fecha
                    FROM
                        docs_unidades
                    WHERE
                        unidad = :unidad;
                        `,
                    //  AND camp = :camp;
                {
                    type: Sequelize.QueryTypes.SELECT,
                    replacements: {
                        unidad: unidad,
                        // camp: camp
                    },
                    transaction: t
                }
            );

            await t.commit();
            return res.status(200).json({
                OK: true,
                msg: 'Evidencias obtenidas correctamente',
                result: evidencias
            });

        } catch (error) {
            if (t) await t.rollback();
            console.error('Error al obtener historico evidencias:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.crearNuevoCoordinador = async (req, res) => {

        let t;

        try {
            t = await Sequelize.transaction();

            const coordinador = req.body;

            await Coordinador.create(coordinador, { transaction: t });

            t.afterCommit(() => {
                app.getCoordinadoresWebhook();
            });

            await t.commit();
            return res.status(200).json({
                OK: true,
                msg: 'Coordinador agregado correctamente',
                result: null
            });

        } catch (error) {
            if (t) await t.rollback();
            console.error('Error al crear nuevo coordinador:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.crearCliente = async (req, res) => {

        let t;

        try {
            t = await Sequelize.transaction();

            const cliente = req.body;

            await Cliente.create(cliente, { transaction: t });

            t.afterCommit(() => {
                app.getClientesWebhook();
            });

            await t.commit();
            return res.status(200).json({
                OK: true,
                msg: 'Cliente agregado correctamente',
                result: null
            });

        } catch (error) {
            if (t) await t.rollback();
            console.error('Error al crear nuevo cliente:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.crearCircuito = async (req, res) => {

        let t;

        try {
            t = await Sequelize.transaction();

            const circuito = req.body;

            await Circuito.create(circuito, { transaction: t });

            t.afterCommit(() => {
                app.getCircuitosWebhook();
            });

            await t.commit();
            return res.status(200).json({
                OK: true,
                msg: 'Circuito agregado correctamente',
                result: null
            });

        } catch (error) {
            if (t) await t.rollback();
            console.error('Error al crear nuevo circuito:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.actualizarCatalogo = async (req, res) => {

        let t;

        try {
            const { catalogo, id, nombre, activo } = req.body
            t = await Sequelize.transaction();

            if(catalogo === 'coordinador'){
                const registro = {
                    id_coordinador: id,
                    nombre_coor: nombre,
                    activo: activo
                }

                await Coordinador.update(
                    registro,
                    {
                        where: {id_coordinador: id},
                        transaction: t
                    }
                )

                t.afterCommit(() => {
                    app.getCoordinadoresWebhook();
                });

            } else if (catalogo === 'cliente'){
                const registro = {
                    id_cliente: id,
                    cliente: nombre,
                    activo: activo
                }

                await Cliente.update(
                    registro,
                    {
                        where: {id_cliente: id},
                        transaction: t
                    }
                )

                t.afterCommit(() => {
                    app.getClientesWebhook();
                });
            } else if (catalogo === 'circuito'){
                const registro = {
                    id_circuito: id,
                    nombre_circuito: nombre,
                    activo: activo
                }

                await Circuito.update(
                    registro,
                    {
                        where: {id_circuito: id},
                        transaction: t
                    }
                )

                t.afterCommit(() => {
                    app.getCircuitosWebhook();
                });
            }

            await t.commit();
            return res.status(200).json({
                OK: true,
                msg: 'Registro actualizado correctamente',
                result: null
            });

        } catch (error) {
            if (t) await t.rollback();
            console.error('Error al actualizar catalogo:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    // app.crearFamilia = async (req, res) => {

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

const saveBase64File = (base64Data, unidad, usuario ) => {

  const evidenciasPath = path.join(__dirname, '../../documentos');

  if (!fs.existsSync(evidenciasPath)) {
    fs.mkdirSync(evidenciasPath, { recursive: true });
  }

  const matches = base64Data.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    throw new Error('Formato base64 inválido');
  }

  const DateFormated = moment().format('DD.MM.YYYY_hh.mm');

  const mimeType = matches[1];
  const extension = mimeType.split('/')[1];

  const buffer = Buffer.from(matches[2], 'base64');
  let filename = `${unidad}_${usuario}_${DateFormated}.${extension}`;
  
  const filePath = path.join(evidenciasPath, filename);
  fs.writeFileSync(filePath, buffer);
  return filename;
}