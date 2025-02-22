module.exports = (sequelize, DataType) => {
    const OrigenesGastos = sequelize.define('OrigenesGastos',{
        id_origen_gasto:{
            type: DataType.INTEGER,
            primaryKey: true
        },
        unidad_negocio:{
            type: DataType.STRING,
            allowNull: false
        },
        terminal:{
            type: DataType.STRING,
            allowNull: false
        },
        origen:{
            type: DataType.STRING,
            allowNull: false
        },
        registrado_por:{
            type: DataType.STRING,
            allowNull: false
        },
        modificado_por:{
            type: DataType.STRING,
            allowNull: true
        },
        fecha_creacion:{
            type: DataType.STRING,
            allowNull: false
        },
        fecha_modificacion:{
            type: DataType.STRING,
            allowNull: true
        },
        estado:{
            type: DataType.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'origenes_gastos',        
        timestamps: false
    });

    return OrigenesGastos;
}