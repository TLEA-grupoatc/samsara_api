module.exports = (sequelize, DataType) => {
    const OrigenesDestinosGastos = sequelize.define('OrigenesDestinosGastos',{
        id_origen_destino:{
            type: DataType.INTEGER,
            primaryKey: true
        },
        id_origen_gasto:{
            type: DataType.STRING,
            allowNull: false
        },
        id_destino_gasto:{
            type: DataType.STRING,
            allowNull: false
        },
        terminal:{
            type: DataType.STRING,
            allowNull: false
        },
        caseta:{
            type: DataType.INTEGER,
            allowNull: false
        },
        guia:{
            type: DataType.INTEGER,
            allowNull: false
        },
        gratificacion:{
            type: DataType.INTEGER,
            allowNull: true
        },
        pension:{
            type: DataType.INTEGER,
            allowNull: true
        },
        taxi:{
            type: DataType.INTEGER,
            allowNull: true
        },
        permiso:{
            type: DataType.INTEGER,
            allowNull: true
        },
        gasolina:{
            type: DataType.INTEGER,
            allowNull: true
        },
        fitosanitaria:{
            type: DataType.INTEGER,
            allowNull: true
        },
        comida:{
            type: DataType.INTEGER,
            allowNull: true
        },
        talacha:{
            type: DataType.INTEGER,
            allowNull: true
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
            type: DataType.INTEGER,
            allowNull: false
        },
        fecha_modificacion:{
            type: DataType.INTEGER,
            allowNull: true
        },
        estado:{
            type: DataType.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'origen_destino',        
        timestamps: false
    });

    return OrigenesDestinosGastos;
}