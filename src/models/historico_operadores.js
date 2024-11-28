module.exports = (sequelize, DataType) => {
    const HistoricoOperadores = sequelize.define('HistoricoOperadores',{
        id_historico: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        numero_empleado: {
            type: DataType.INTEGER,
            allowNull: true
        },
        unidad: {
            type: DataType.STRING,
            allowNull: true
        },
        nombre: {
            type: DataType.STRING,
            allowNull: true
        },
        estado: {
            type: DataType.STRING,
            allowNull: true
        },
        actividad: {
            type: DataType.STRING,
            allowNull: true
        },
        fecha: {
            type: DataType.STRING,
            allowNull: true
        },
        usuario: {
            type: DataType.STRING,
            allowNull: true
        }
    },
    {
        tableName: 'historico_actividad_op',        
        timestamps: false
    });
    
    return HistoricoOperadores;
}