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
        monto:{
            type: DataType.FLOAT,
            allowNull: false
        },
        responsable:{
            type: DataType.INTEGER,
            allowNull: false
        },
        aplica:{
            type: DataType.INTEGER,
            allowNull: true
        },
        
        aceptaoperador:{
            type: DataType.INTEGER,
            allowNull: true
        },
        faltante:{
            type: DataType.INTEGER,
            allowNull: true
        },
        folio_cargo:{
            type: DataType.STRING,
            allowNull: true
        },
        causa:{
            type: DataType.STRING,
            allowNull: true
        },
        componentes:{
            type: DataType.STRING,
            allowNull: true
        },
        familia:{
            type: DataType.STRING,
            allowNull: true
        },

        estado:{
            type: DataType.STRING,
            allowNull: false
        },
        aprobo:{
            type: DataType.STRING,
            allowNull: true
        },
        fecha_aprobo:{
            type: DataType.STRING,
            allowNull: true
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