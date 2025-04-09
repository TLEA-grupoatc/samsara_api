module.exports = (sequelize, DataType) => {
    const UBICACIONESPORECONOMICO = sequelize.define('UBICACIONESPORECONOMICO',{
        id_upe:{
            type: DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_samsara:{
            type: DataType.STRING,
            allowNull: true
        },
        economico:{
            type: DataType.STRING,
            allowNull: true
        },
        motor:{
            type: DataType.INTEGER,
            allowNull: true
        },
        geocerca:{
            type: DataType.STRING,
            allowNull: true
        },
        ubicacion:{
            type: DataType.STRING,
            allowNull: true
        },
        ubicacion_snapshot:{
            type: DataType.STRING,
            allowNull: true
        },
        hora_entrada:{
            type: DataType.STRING,
            allowNull: true
        },
        movimiento:{
            type: DataType.STRING,
            allowNull: true
        },
        hora_salida:{
            type: DataType.STRING,
            allowNull: true
        },
        evento:{
            type: DataType.STRING,
            allowNull: true
        }
    },
    {
        tableName: 'ubicaciones_por_economico',        
        timestamps: false
    });

    return UBICACIONESPORECONOMICO;
}