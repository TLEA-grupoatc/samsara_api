module.exports = (sequelize, DataType) => {
    const Circuito = sequelize.define('Circuito', {
        id_circuito:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre_circuito: {
            type: DataType.STRING(100),
            allowNull: true,
        },
        activo: {
            type: DataType.STRING(45),
            allowNull: true,
        }
    },{
        tableName: 'circuito',
        timestamps: false
    });
    
    return Circuito;
}