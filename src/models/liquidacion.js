module.exports = (sequelize, DataType) => {
    const Liquidaciones = sequelize.define('Liquidaciones',{
        id_liquidacion:{
            type: DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        operador:{
            type: DataType.STRING,
            allowNull: false
        },
        terminal:{
            type: DataType.STRING,
            allowNull: false
        },
        folio:{
            type: DataType.STRING,
            unique: true,
            allowNull: false
        },
        monto:{
            type: DataType.FLOAT,
            allowNull: false
        },
        checklist:{
            type: DataType.INTEGER,
            allowNull: false
        },
        firma:{
            type: DataType.INTEGER,
            allowNull: false
        },
        pago:{
            type: DataType.INTEGER,
            allowNull: false
        },
        fecha:{
            type: DataType.STRING,
            allowNull: false
        },
        usuario:{
            type: DataType.STRING,
            allowNull: false
        },
        verificado_por:{
            type: DataType.STRING,
            allowNull: true
        },
        cargo_firma:{
            type: DataType.STRING,
            allowNull: true
        },
        cargo_pago:{
            type: DataType.STRING,
            allowNull: true
        },
        estado:{
            type: DataType.STRING,
            allowNull: true
        }
    },
    {
        tableName: 'liquidacion',        
        timestamps: false
    });

    return Liquidaciones;
}