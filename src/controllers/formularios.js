const moment = require('moment');
const _ = require('lodash');

module.exports = app => {
    const evento = app.database.models.Eventos;
    const parosdemotor = app.database.models.ParosDeMotor;

    const Sequelize = require('sequelize');
    const { literal } = require('sequelize');
    const Op = Sequelize.Op;

    app.obtenerEventosCriticos = (req, res) => {
        evento.findAll({
            where: {
                fecha: {
                    [Op.between]: [req.params.fechaInicio, req.params.fechaFin],
                }
            },
            order: [
                ['fecha', 'DESC']
            ],
        }).then(result => {
            res.json({
                OK: true,
                Eventos: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.obtenerParosDeMotor = (req, res) => {
        parosdemotor.findAll({
            where: {
                id_evento: req.params.id_evento
            },
            order: [
                ['fecha', 'DESC']
            ],
        }).then(result => {
            res.json({
                OK: true,
                ParosDeMotor: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }


    app.crearEvento = (req, res) => {
        let body = req.body;
        let lista = body.lista;

        let nuevoRegistro = new evento({
            personal_enturno: body.personal_enturno, 
            turno: body.turno,
            evento: body.evento,
            fecha: body.fecha,
            hora: body.hora,
            observaciones: body.observaciones
        });

        evento.create(nuevoRegistro.dataValues, {
            fields: [
                'personal_enturno', 
                'turno',
                'evento',
                'fecha',
                'hora',
                'observaciones'
            ]
        })
        .then(async result => {
            lista.forEach(async re => {
                let nuevoRegistro = new parosdemotor({
                    id_evento: result.id_evento, 
                    unidad_denegocio: re.unidad_denegocio, 
                    unidad: re.unidad,
                    motivo: re.motivo,
                    ubicacion: re.ubicacion,
                    corte_deaceleracion: re.corte_deaceleracion,
                    fecha: re.fecha, 
                    hora: re.hora, 
                    quien_solicita: re.quien_solicita,
                    latitud: re.latitud,
                    longitud: re.longitud,
                    c4: re.c4,
                    operaciones: re.operaciones,
                    turno: re.turno,
                    estado: re.estado
                });
                
                await parosdemotor.create(nuevoRegistro.dataValues, {
                    fields: [
                        'id_evento', 
                        'unidad_denegocio', 
                        'unidad',
                        'motivo',
                        'ubicacion',
                        'corte_deaceleracion', 
                        'fecha', 
                        'hora', 
                        'quien_solicita',
                        'latitud',
                        'longitud',
                        'c4',
                        'operaciones',
                        'turno',
                        'estado'
                    ]
                }).then(result => {}).catch(error => { console.log(error.message); });
            });

            res.json({
                OK: true,
                Evento: result
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