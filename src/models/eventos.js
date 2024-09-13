module.exports = (sequelize, DataType) => {
    const Eventos = sequelize.define('Eventos',{
        id_evento:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        personal_enturno:{
            type: DataType.STRING,
            allowNull: true
        },
        turno:{
            type: DataType.STRING,
            allowNull: true
        },
        evento:{
            type: DataType.STRING,
            allowNull: true
        },
        fecha:{
            type: DataType.STRING,
            allowNull: true
        },
        hora:{
            type: DataType.STRING,
            allowNull: true
        },
        observaciones:{
            type: DataType.STRING,
            allowNull: true
        }
    },
    {
        tableName: 'eventos',        
        timestamps: false
    });
    
    return Eventos;
}