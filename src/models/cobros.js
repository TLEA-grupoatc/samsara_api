module.exports = (sequelize, DataType) => {
    const Cobros = sequelize.define('Cobros',{
        id_cobro:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        unidad:{
            type: DataType.STRING,
            allowNull: true
        },
        operador:{
            type: DataType.STRING,
            allowNull: true
        },
        concepto:{
            type: DataType.STRING,
            allowNull: true
        },
        cantidad:{
            type: DataType.INTEGER,
            allowNull: true
        },
        enlace:{
            type: DataType.STRING,
            allowNull: true
        },
        registro:{
            type: DataType.STRING,
            allowNull: true
        },
        registrado_por:{
            type: DataType.STRING,
            allowNull: true
        },
        cobrado:{
            type: DataType.STRING,
            allowNull: true
        },
        cobrado_por:{
            type: DataType.STRING,
            allowNull: true
        },
        estado:{
            type: DataType.STRING,
            allowNull: true
        }
    },
    {
        tableName: 'cobros',        
        timestamps: false
    });
    
    return Cobros;
}