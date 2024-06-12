
module.exports = (sequelize, DataType) => {
    const Usuarios = sequelize.define('Usuarios', {
        id_usuario:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_empleado: {
            type: DataType.STRING,
            allowNull: false     
        },
        nombre_usuario: {
            type: DataType.STRING,
            allowNull: false        
        },        
        contrasena: {
            type: DataType.TEXT,                  
            allowNull: true        
        },
        id_role: {
            type: DataType.INTEGER,
            allowNull: false
        },
        fecha_creacion: {
            type: DataType.DATE,
            allowNull: true    
        },
        fecha_ultima_modificacion: {
            type: DataType.DATE,
            allowNull: true   
        },
        status: {
            type: DataType.ENUM,
            values: ['A', 'I'],
            allowNull: true     
        }
    },{
        tableName: 'usuarios',
        createdAt: 'fecha_creacion',
        updatedAt: 'fecha_ultima_modificacion',
        defaultScope: {
            attributes: { exclude: ['contrasena'] },
        },
        scopes: {
            withPassword: {
                attributes: { exclude: ['fecha_creacion', 'fecha_ultima_modificacion', 'status'] },
            }
        },
        timestamps: true
    });

    

    Usuarios.associate = (models) => {        
        Usuarios.belongsTo(models.Roles, {
            foreignKey: 'id_role',
            sourceKey: 'id_role'
        });
    }
    

    return Usuarios;
}