module.exports = (sequelize, DataType) => {
    const DestinosGastos = sequelize.define('DestinosGastos',{
        id_destino_gasto:{
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
        destino:{
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
        tableName: 'destinos_gastos',        
        timestamps: false
    });

    return DestinosGastos;
}