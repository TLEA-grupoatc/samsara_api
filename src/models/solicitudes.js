module.exports = (sequelize, DataType) => {
    const ValesDiesel = sequelize.define('ValesDiesel',{
        id_vale_diesel:{
            type: DataType.INTEGER,
            primaryKey: true
        },
        bitacora:{
            type: DataType.STRING,
            allowNull: true
        },
        terminal:{
            type: DataType.STRING,
            allowNull: true
        },
        operador:{
            type: DataType.STRING,
            allowNull: true
        },
        tracto:{
            type: DataType.STRING,
            allowNull: true
        },
        placas:{
            type: DataType.STRING,
            allowNull: true
        },
        ruta:{
            type: DataType.STRING,
            allowNull: true
        },
        id_gasolinera:{
            type: DataType.INTEGER,
            allowNull: true
        },
        gasolinera:{
            type: DataType.STRING,
            allowNull: true
        },
        litros:{
            type: DataType.FLOAT,
            allowNull: true
        },
        precio:{
            type: DataType.FLOAT,
            allowNull: true
        },
        importe:{
            type: DataType.FLOAT,
            allowNull: true
        },
        fecha_creacion:{
            type: DataType.STRING,
            allowNull: true
        },
        fecha_uso:{
            type: DataType.STRING,
            allowNull: true
        },
        estado:{
            type: DataType.STRING,
            allowNull: true
        }
    },
    {
        tableName: 'valesDiesel',        
        timestamps: false
    });

    return ValesDiesel;
}