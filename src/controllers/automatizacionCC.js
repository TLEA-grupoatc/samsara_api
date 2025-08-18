const moment = require('moment');

module.exports = app => {
    const historico = app.database.models.HistoricoOperadores;

    const Sequelize = require('sequelize');
    const { literal } = require('sequelize');
    const axios = require('axios');
    const Op = Sequelize.Op;

app.comidasAutomaticas = async (req, res) => {
    try {
        const today = new Date();
        const hoymenosuno = new Date();
        hoymenosuno.setDate(today.getDate() - 1);

        const [bitacoras] = await Promise.all([
            axios.get('https://servidorlocal.ngrok.app/bitacorasParaComidaAut')
        ]);

        const results = await historico.findAll({
            attributes: [
                'nombre',
                [Sequelize.fn('MAX', Sequelize.col('fecha')), 'fecha_ultima']
            ],
            where: {
                fecha: moment(hoymenosuno).format('YYYY-MM-DD'),
                actividad: {
                    [Op.notIn]: ['DESC', 'ISS-D', 'POSB', 'LICENCIA', 'PERM', 'ISSUE', 'INCA', ''],
                    [Op.not]: null
                }
            },
            group: ['nombre'],
            order: ['nombre'],
            raw: true
        });

        const finalResults = await Promise.all(
            results.map(async r => {
                const ultimoRegistro = await historico.findOne({
                    attributes: ['unidad', 'actividad'],
                    where: {
                        nombre: r.nombre,
                        fecha: r.fecha_ultima,
                        actividad: {
                            [Op.notIn]: ['DESC', 'ISS-D', 'POSB', 'LICENCIA', 'PERM', 'ISSUE', 'INCA', null, '']
                        },
                    },
                    order: ['nombre'],
                });

                return {
                    nombre: r.nombre,
                    fecha_ultima: r.fecha_ultima,
                    unidad: ultimoRegistro ? ultimoRegistro.unidad : null,
                    actividad_ultima: ultimoRegistro ? ultimoRegistro.actividad : null
                };
            })
        );

        const bitacorasRegistros = bitacoras.data.Registros;

        // Coinciden en ambos
        const coinciden = bitacorasRegistros.filter(b => 
            finalResults.some(f => f.nombre === b.OPERADOR_NOMBRE)
        );

        // No coinciden (solo en bitacoras)
        const noCoinciden = bitacorasRegistros.filter(b => 
            !finalResults.some(f => f.nombre === b.OPERADOR_NOMBRE)
        );

        res.json({
            OK: true,
            fecha: moment(hoymenosuno).format('YYYY-MM-DD'),
            totalCoinciden: coinciden.length,
            totalNoCoinciden: noCoinciden.length,
            coinciden,
            noCoinciden
        });
    } 
    catch (error) {
        res.status(412).json({
            OK: false,
            msg: error.message
        });
    }
};



    return app;
}