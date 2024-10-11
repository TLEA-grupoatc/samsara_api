module.exports = (sequelize, DataType) => {
    const Destinos = sequelize.define('Destinos',{
        id_destino:{
            type: DataType.INTEGER,
            primaryKey: true
        },
        id_cliente:{
            type: DataType.INTEGER,
            allowNull: false
        },
        destino:{
            type: DataType.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'destino',        
        timestamps: false
    });

    return Destinos;
}