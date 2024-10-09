const moment = require('moment');
const _ = require('lodash');

module.exports = app => {    
    const controlubicaciones = app.database.models.ControlUbicaciones;
    const unidad = app.database.models.Unidades;

    const Sequelize = require('sequelize');
    const { literal } = require('sequelize');
    const Op = Sequelize.Op;
    
    app.obtenerPlanes = async (req, res) => {
        var fecha = moment(new Date()).format('YYYY-MM-DD');
        var planes = [];

        controlubicaciones.findAll({
            where: {
                division: req.params.division,
                registro: {
                    [Op.between]: [fecha + ' 00:00:00', fecha + ' 23:59:59'],
                }
            },
            order: [
                ['cliente', 'ASC']
            ],
        }).then(result => {
            planes = result;
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });

        await unidad.findAll({
            where: {
                division: req.params.division,
                estado: 'A'
            },
            order: [
                ['name', 'ASC'],
                ['idcliente', 'ASC']
            ]
        }).then(async result => {
            var listadeitems = [];

            for(let tracto of result) {
                const plan = planes.find(aud => aud.unidad === tracto.name);

                let registros = ({
                    division: tracto.division,
                    unidad: tracto.name,
                    operador: plan != undefined ? plan.operador : '',
                    cliente: plan != undefined ? plan.cliente : '',
                    origen: plan != undefined ? plan.origen : '',
                    destino: plan != undefined ? plan.destino : '',
                    estatus: plan != undefined ? plan.estatus : '',
                    plancarga: plan != undefined ? plan.plancarga : '',
                    ubicacion1: plan != undefined ? plan.ubicacion1 : '',
                    ubicacion2: plan != undefined ? plan.ubicacion2 : '',
                    ubicacion3: plan != undefined ? plan.ubicacion3 : '',
                    ubicacion4: plan != undefined ? plan.ubicacion4 : '',
                    ubicacion5: plan != undefined ? plan.ubicacion5 : '',
                    ubicacion6: plan != undefined ? plan.ubicacion6 : '',
                    ubicacion7: plan != undefined ? plan.ubicacion7 : '',
                    ubicacion8: plan != undefined ? plan.ubicacion8 : '',
                    ubicacion9: plan != undefined ? plan.ubicacion9 : '',
                    ubicacion10: plan != undefined ? plan.ubicacion10 : '',
                    ubicacion11: plan != undefined ? plan.ubicacion11 : '',
                    ubicacion12: plan != undefined ? plan.ubicacion12 : '',
                    registro: plan != undefined ? plan.registro : '',
                    registrado_por: plan != undefined ? plan.registrado_por : '',
                    estado: plan != undefined ? plan.estado : ''
                });

                listadeitems.push(registros);
            }

            res.json({
                OK: true,
                Planes: listadeitems
            });
        });
    }

    app.crearPlan = (req, res) => {
        let body = req.body;

        let nuevoRegistro = new controlubicaciones({
            division: body.division,
            unidad: body.unidad,
            operador: body.operador,
            cliente: body.cliente,
            origen: body.origen,
            destino: body.destino,
            estatus: body.estatus,
            plancarga: body.plancarga,
            ubicacion1: body.ubicacion1,
            ubicacion2: body.ubicacion2,
            ubicacion3: body.ubicacion3,
            ubicacion4: body.ubicacion4,
            ubicacion5: body.ubicacion5,
            ubicacion6: body.ubicacion6,
            ubicacion7: body.ubicacion7,
            ubicacion8: body.ubicacion8,
            ubicacion9: body.ubicacion9,
            ubicacion10: body.ubicacion10,
            ubicacion11: body.ubicacion11,
            ubicacion12: body.ubicacion12,
            registro: body.registro,
            registrado_por: body.registrado_por,
            estado: body.estado
        });

        controlubicaciones.create(nuevoRegistro.dataValues, {
            fields: [
                'division', 
                'unidad', 
                'operador', 
                'cliente', 
                'origen', 
                'destino', 
                'estatus', 
                'plancarga', 
                'ubicacion1', 
                'ubicacion2', 
                'ubicacion3', 
                'ubicacion4', 
                'ubicacion5', 
                'ubicacion6', 
                'ubicacion7', 
                'ubicacion8', 
                'ubicacion9', 
                'ubicacion10', 
                'ubicacion11', 
                'ubicacion12', 
                'registro', 
                'registrado_por', 
                'estado'
            ]
        })
        .then(result => {
            res.json({
                OK: true,
                Plan: result
            })
        })
        .catch(error => {
            res.status(412).json({
                OK: false,
                msg: error.message
            });
        });
    }

    return app;
}