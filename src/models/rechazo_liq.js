module.exports = (sequelize, DataType) => {
    const RechazoLiquidaciones = sequelize.define('RechazoLiquidaciones',{
        id_rechazo_liq:{
            type: DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        fecha:{
            type: DataType.STRING,
            allowNull: true
        },
        id_liquidacion:{
            type: DataType.STRING,
            allowNull: true
        },
        liquidacion:{
            type: DataType.STRING,
            allowNull: true
        },
        operador:{
            type: DataType.STRING,
            allowNull: true
        },
        unidad_negocio:{
            type: DataType.STRING,
            allowNull: true
        },
        liquidador:{
            type: DataType.STRING,
            allowNull: true
        },
        incidencia:{
            type: DataType.STRING,
            allowNull: true
        },
        auditor:{
            type: DataType.STRING,
            allowNull: true
        }
    },
    {
        tableName: 'rechazodeliquidaciones',        
        timestamps: false
    });

    return RechazoLiquidaciones;
}