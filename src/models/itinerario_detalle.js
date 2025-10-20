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
        economico: {
            type: DataType.STRING,
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
        horasgeocerca: {
            type: DataType.STRING,
            allowNull: true
        }, 
        combustible: {
            type: DataType.INTEGER,
            allowNull: true
        }, 
        km: {
            type: DataType.INTEGER,
            allowNull: true
        }, 
        tiempo: {
            type: DataType.INTEGER,
            allowNull: true
        }, 
        velocidad: {
            type: DataType.INTEGER,
            allowNull: true
        }, 
        estado: {
            type: DataType.STRING,
            allowNull: true
        }, 
        odometer: {
            type: DataType.INTEGER,
            allowNull: true
        }, 
        odometrototal: {
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

    ItinerarioDetalle.associate = (models) => {
        ItinerarioDetalle.belongsTo(models.Itinerarios, {
            foreignKey: 'id_itinerarios',
            targetKey: 'id_itinerarios'
        });
    };
    

    
    return ItinerarioDetalle;
}