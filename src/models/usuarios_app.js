module.exports = (sequelize, DataType) => {
    const UsuariosApp = sequelize.define('UsuariosApp',{
        numero_empleado: {
            type: DataType.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        nombre: {
            type: DataType.STRING,
            allowNull: false        
        },        
        usuario: {
            type: DataType.STRING,
            allowNull: false        
        },        
        password: {
            type: DataType.TEXT,                  
            allowNull: true        
        },
        isLogged: {
            type: DataType.INTEGER,
            allowNull: false
        },
        cargo: {
            type: DataType.STRING,
            allowNull: true        
        }, 
        locacion: {
            type: DataType.STRING,
            allowNull: true        
        },
        estado: {
            type: DataType.STRING,
            allowNull: true     
        }
    },
    {
        tableName: 'usuario_app',
        defaultScope: {
            attributes: { exclude: ['contra'] },
        },
        scopes: {
            withContra: {
                attributes: { exclude: ['isLogged'] },
            }
        },    
        timestamps: false
    });

    return UsuariosApp;
}