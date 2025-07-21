module.exports = (sequelize, DataType) => {
    const HistorialGobenadas = sequelize.define('HistorialGobenadas',{
        id_gob_unidad:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        unidad:{
            type: DataType.STRING,
            allowNull: true
        },
        fecha:{
            type: DataType.STRING,
            allowNull: true
        },
        usuario:{
            type: DataType.STRING,
            allowNull: true
        }
    },
    {
        tableName: 'historico_gob_unidad',        
        timestamps: false
    });
    
    return HistorialGobenadas;
}