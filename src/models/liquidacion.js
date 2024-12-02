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
        }
    },
    {
        tableName: 'liquidacion',        
        timestamps: false
    });

    return Liquidaciones;
}