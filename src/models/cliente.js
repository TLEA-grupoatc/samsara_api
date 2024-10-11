module.exports = (sequelize, DataType) => {
    const Clientes = sequelize.define('Clientes',{
        id_cliente:{
            type: DataType.INTEGER,
            primaryKey: true
        },
        cliente:{
            type: DataType.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'cliente',        
        timestamps: false
    });

    return Clientes;
}