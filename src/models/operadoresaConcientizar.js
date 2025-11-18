module.exports = (sequelize, DataType) => {
    const OperadoresAConcientizar = sequelize.define('OperadoresAConcientizar',{
        id_oac:{
            type: DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        operador:{
            type: DataType.STRING,
            allowNull: true
        },
        ocupa: {
            type: DataType.STRING,
            allowNull: true
        }, 
        fecha: {
            type: DataType.STRING,
            allowNull: true
        }, 
        fechadecreacion: {
            type: DataType.STRING,
            allowNull: true
        }, 
        usuario_creacion: {
            type: DataType.STRING,
            allowNull: true
        }
    },
    {
        tableName: 'operadoresaConcientizar',        
        timestamps: false
    });

    return OperadoresAConcientizar;
}