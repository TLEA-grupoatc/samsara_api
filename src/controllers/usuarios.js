const bcrypt = require('bcrypt');

module.exports = app => {

    const Usuario = app.database.models.Usuarios;
    const Roles = app.database.models.Roles;
    
    app.ObtenerUsuarios = (req, res) => {

        Usuario.findAll({
            where: {
                status: 'A'
            },
            include: [{
                model: Roles,
                required: true
            }]
        })
        .then(usuarios => {
            res.json({
                OK: true,
                Usuarios: usuarios
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.CrearUsuario = (req, res) => {

        let body = req.body;

        let usuario = new Usuario({
            nombre_empleado: body.nombre_empleado,
            nombre_usuario: body.nombre_usuario,
            contrasena: bcrypt.hashSync(body.contrasena, 10),
            id_role: body.id_role,
            cargo: body.cargo,
            numero_empleado: body.numero_empleado
        });

        Usuario.create(usuario.dataValues, {
            fields: ['nombre_empleado', 'nombre_usuario', 'contrasena', 'id_role', 'cargo', 'numero_empleado']
        })
        .then(result => {
            delete result.dataValues.contrasena;
            res.json({
                OK: true,
                Usuario: result
            })
        })
        .catch(error => {
            res.status(412).json({
                OK: false,
                msg: error.message
            });
        });
    }

    app.ActualizarUsuario = (req, res) => {
        let id = req.params.id;
        let body = req.body;   
        let fields = ['nombre_empleado', 'nombre_usuario', 'id_role', 'status', 'cargo']     

        let usuario = new Usuario();        

        if(body.contrasena) {
            usuario = new Usuario({
                nombre_empleado: body.nombre_empleado,
                nombre_usuario: body.nombre_usuario,
                contrasena: bcrypt.hashSync(body.contrasena, 10),
                id_role: body.role,
                status: 'A',
                cargo: body.cargo,
            });

            fields.push('contrasena');
        } else {
            usuario = new Usuario({
                nombre_empleado: body.nombre_empleado,
                nombre_usuario: body.nombre_usuario,                
                id_role: body.id_role,
                status: 'A',
                cargo: body.cargo,
            });
        }

        Usuario.update(usuario.dataValues, {
            where: {
                id_usuario: id
            },
            fields
        }).then(result => {
            delete usuario.dataValues.contrasena;
            res.json({
                OK: true,
                usuario,
                rows_affected: result[0]
            });
        }).catch(err => {
            res.status(412).json({
                OK: false,
                msg: err.message
            });
        });
    }

    app.ActualizarUsuarioPerfil = (req, res) => {
        let id = req.params.id;
        let body = req.body;  
        
        let field = ['nombre_empleado', 'nombre_usuario'];

        let usuario = new Usuario({
            nombre_empleado: body.nombre_empleado,
            nombre_usuario: body.nombre_usuario            
        });        

        if(body.contrasena){
            usuario = new Usuario({
                nombre_empleado: body.nombre_empleado,
                nombre_usuario: body.nombre_usuario,
                contrasena: bcrypt.hashSync(body.contrasena, 10)         
            }); 
            field.push('contrasena');
        }

        Usuario.update(usuario.dataValues, {
            where: {
                id_usuario: id
            },
            fields: field
        }).then(result => {
            delete usuario.dataValues.contrasena;
            res.json({
                OK: true,
                usuario,
                rows_affected: result[0]
            });
        }).catch(err => {
            res.status(412).json({
                OK: false,
                msg: err.message
            });
        });
    }

    app.ObtenerUsuarioID = (req, res) => {

        let id = req.params.id;

        Usuario.findByPk(id)
        .then(usuario => {
            res.json({
                OK: true,
                usuario
            });
        })
        .catch(err => {
            res.json({
                OK: false,
                msg: err
            });
        });
    }

    app.EliminarUsuario = (req, res) => {
        let id = req.params.id;

        let usuario = new Usuario({
            status: 'I'
        });

        Usuario.update(usuario.dataValues, {
            where: {
                id_usuario: id
            },
            fields: ['status']
        }).then(result => {
            res.json({
                OK: true,
                rows_affected: result[0]
            });
        }).catch(err => {
            res.status(412).json({
                OK: false,
                msg: err
            });
        });
    }

    app.ConsultarUsuarioTotales = (req, res) => {

        Usuario.count({
            where: {
                status: 'A'
            }
        })
        .then(count => {
            res.json({
                OK: true,
                Total: count
            });
        })
        .catch(err => {
            res.json({
                OK: false,
                msg: err
            });
        });
    }

    app.getCountUsers = (req, res) => {
        Usuario.count({}).then(result => {
            res.json({
                OK: true,
                Total: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    return app;
}