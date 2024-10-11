module.exports = (sequelize, DataType) => {
    const Origenes = sequelize.define('Origenes',{
        id_origen:{
            type: DataType.INTEGER,
            primaryKey: true
        },
        id_cliente:{
            type: DataType.INTEGER,
            allowNull: false
        },
        origen:{
            type: DataType.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'origen',        
        timestamps: false
    });

    return Origenes;
}