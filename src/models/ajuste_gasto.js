module.exports = (sequelize, DataType) => {
    const AjustesGastos = sequelize.define('AjustesGastos',{
        id_ajuste_gastos:{
            type: DataType.INTEGER,
            primaryKey: true
        },
        concepto:{
            type: DataType.STRING,
            allowNull: false
        },
        monto_original:{
            type: DataType.INTEGER,
            allowNull: false
        },
        monto_ajustado:{
            type: DataType.INTEGER,
            allowNull: false
        },
        registrado_por:{
            type: DataType.STRING,
            allowNull: true
        },
        fecha:{
            type: DataType.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'ajuste_gastos',        
        timestamps: false
    });

    return AjustesGastos;
}