module.exports = (sequelize, DataType) => {
    const Coordinador = sequelize.define('Coordinador', {
        id_coordinador:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre_coor: {
            type: DataType.STRING(100),
            allowNull: true,
        },
        activo: {
            type: DataType.STRING(45),
            allowNull: true,
        }
    },{
        tableName: 'coordinador',
        timestamps: false
    });
    
    return Coordinador;
}