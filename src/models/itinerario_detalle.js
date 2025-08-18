module.exports = (sequelize, DataType) => {
    const ItinerarioDetalle = sequelize.define('ItinerarioDetalle',{
        id_itinerario_detalle: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_itinerarios: {
            type: DataType.INTEGER,
            allowNull: true
        },
        operador: {
            type: DataType.STRING,
            allowNull: true
        }, 
        latitud: {
            type: DataType.FLOAT,
            allowNull: true
        }, 
        longitud: {
            type: DataType.FLOAT,
            allowNull: true
        }, 
        direccion: {
            type: DataType.STRING,
            allowNull: true
        }, 
        geocerca: {
            type: DataType.STRING,
            allowNull: true
        }, 
        combustible: {
            type: DataType.INTEGER,
            allowNull: true
        }, 
        tiempo: {
            type: DataType.INTEGER,
            allowNull: true
        }, 
        fecha: {
            type: DataType.STRING,
            allowNull: true
        }
    },
    {
        tableName: 'itinerarios_detalle',        
        timestamps: false
    });
    
    return ItinerarioDetalle;
}