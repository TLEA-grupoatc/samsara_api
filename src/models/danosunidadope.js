module.exports = (sequelize, DataType) => {
    const DanosUnidadOperador = sequelize.define('DanosUnidadOperador',{
        id_danosunidad:{
            type: DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        economico:{
            type: DataType.STRING,
            allowNull: true
        },
        operador:{
            type: DataType.STRING,
            allowNull: true
        },
        comentarios:{
            type: DataType.STRING,
            allowNull: true
        },
        fecha:{
            type: DataType.STRING,
            allowNull: true
        },
        evidencia:{
            type: DataType.STRING,
            allowNull: false
        },
        fecha_creacion:{
            type: DataType.STRING,
            allowNull: false
        },
        usuario_creacion:{
            type: DataType.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'operadordanosunidad',        
        timestamps: false
    });

    return DanosUnidadOperador;
}