const moment = require('moment');

module.exports = app => {

    const Unidad = app.database.models.Unidades;
    const Coordinador = app.database.models.Coordinador;
    const Cliente = app.database.models.Clientes;
    const Circuito = app.database.models.Circuito;

    const Sequelize = app.database.sequelize;
    const io = app.io;


    app.getUnidadesWebhook = async (req, res) => {

        try {

            const unidades = await Sequelize.query(
                `
                    SELECT
                        U.id_unidad,
                        U.name,
                        U.tag,
                        U.division,
                        U.make,
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
                let divisionGrupo = resultado.find(d => d.division === item.division);
                if (!divisionGrupo) {
                    divisionGrupo = {
                        division: item.division,
                        unidades: []
                    };
                    resultado.push(divisionGrupo);
                }

                let unidadGrupo = divisionGrupo.unidades.find(u => u.tag === item.tag);
                if (!unidadGrupo) {
                    unidadGrupo = {
                        tag: item.tag,
                        clientes: []
                    };
                    divisionGrupo.unidades.push(unidadGrupo);
                }

                const clienteKey = [
                    item.id_cliente,
                    item.cliente,
                    item.id_coordinador,
                    item.nombre_coor,
                    item.neg_tipo,
                ].join('|');

                let clienteGrupo = unidadGrupo.clientes.find(c =>
                    [
                        c.id_cliente,
                        c.cliente,
                        c.id_coordinador,
                        c.nombre_coor,
                        c.neg_tipo,
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

            io.emit('ESTRUCTURA_UNIDADES_ACTUALIZADA', {result: resultado, tabla: unidades})

        } catch (error) {
            console.error('Error al obtener Unidades:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.getTablaUnidadesWebhook = async (req, res) => {

        try {

            const unidades = await Sequelize.query(
                `
                    SELECT
                        U.id_unidad,
                        U.name,
                        U.tag,
                        U.division,
                        U.make,
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

            io.emit('UNIDAD_ACTUALIZADA', {tabla: unidades})

        } catch (error) {
            console.error('Error al obtener tabla unidades:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.getCoordinadoresWebhook = async (req, res) => {
        try {

            const coordinadores = await Coordinador.findAll({
                where: { activo: 'A' },
            });
            
            io.emit('COORDINADORES_ACTUALIZADOS', {result: coordinadores});

        } catch (error) {
            console.error('Error al obtener Coordinadores:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.getClientesWebhook = async (req, res) => {
        try {

            const clientes = await Cliente.findAll({
                where: { activo: 'A' },
            });
            
            io.emit('CLIENTES_ACTUALIZADOS', {result: clientes});

        } catch (error) {
            console.error('Error al obtener clientes:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    app.getCircuitosWebhook = async (req, res) => {
        try {

            const circuitos = await Circuito.findAll({
                where: { activo: 'A' },
            });
            
            io.emit('CIRCUITOS_ACTUALIZADOS', {result: circuitos});

        } catch (error) {
            console.error('Error al obtener circuitos:', error);
            return res.status(500).json({ 
                OK: false,
                msg: error,
            });
        }
    }

    return app;
}