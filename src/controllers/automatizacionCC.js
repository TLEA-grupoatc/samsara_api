const moment = require('moment');

module.exports = app => {
    const historico = app.database.models.HistoricoOperadores;

    const Sequelize = require('sequelize');
    const { literal } = require('sequelize');
    const axios = require('axios');
    const Op = Sequelize.Op;

    app.comidasAutomaticas = async (req, res) => {
        try {

            const [bitacoras] = await Promise.all([
                axios.get('https://servidorlocal.ngrok.app/bitacorasParaComidaAut'),
            ]);

            console.log(bitacoras.data);
            



            const results = await historico.findAll({
                attributes: [
                    'nombre',
                    [Sequelize.fn('MAX', Sequelize.col('fecha')), 'fecha_ultima']
                ],
                actividad: {
                    [Op.notIn]: ['DESC', 'ISS-D', 'POSB', 'LICENCIA', 'PERM', 'ISSUE', 'INCA', null, '']
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
                            fecha: r.fecha_ultima
                        },
                        actividad: {
                            [Op.notIn]: ['DESC', 'ISS-D', 'POSB', 'LICENCIA', 'PERM', 'ISSUE', 'INCA', null, '']
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

            res.json({
                OK: true,
                total: finalResults.length,
                Resumen: finalResults,
            });
        } 
        catch (error) {
            res.status(412).json({
                OK: false,
                msg: error.message
            });
        }

    }

    return app;
}