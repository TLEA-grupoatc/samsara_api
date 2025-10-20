module.exports = (sequelize, DataType) => {
    const Itinerarios = sequelize.define('Itinerarios',{
        id_itinerarios: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        folio_orden: {
            type: DataType.INTEGER,
            allowNull: true
        },
        unidad: {
            type: DataType.STRING,
            allowNull: true
        },
        numero_empleado: {
            type: DataType.INTEGER,
            allowNull: true
        }, 
        operador: {
            type: DataType.STRING,
            allowNull: false
        }, 
        ideconomico: {
            type: DataType.STRING,
            allowNull: false
        }, 
        economico: {
            type: DataType.STRING,
            allowNull: false
        }, 
        cliente: {
            type: DataType.STRING,
            allowNull: false
        }, 
        clave_bitacora: {
            type: DataType.STRING,
            allowNull: false
        }, 
        origen: {
            type: DataType.STRING,
            allowNull: false
        }, 
        destino: {
            type: DataType.STRING,
            allowNull: false
        }, 
        origen_direccion: {
            type: DataType.STRING,
            allowNull: false
        }, 
        destino_direccion: {
            type: DataType.STRING,
            allowNull: false
        }, 
        origen_longitud: {
            type: DataType.FLOAT,
            allowNull: true
        }, 
        origen_latitud: {
            type: DataType.FLOAT,
            allowNull: true
        }, 
        destino_longitud: {
            type: DataType.FLOAT,
            allowNull: true
        }, 
        destino_latitud: {
            type: DataType.FLOAT,
            allowNull: true
        }, 
        origen_desc: {
            type: DataType.STRING,
            allowNull: true
        },
        destino_desc: {
            type: DataType.STRING,
            allowNull: true
        },
        ruta_destino_os: {
            type: DataType.STRING,
            allowNull: true
        },
        ruta_origen_os: {
            type: DataType.STRING,
            allowNull: true
        },
        fecha_carga: {
            type: DataType.STRING,
            allowNull: true
        }, 
        tiempo: {
            type: DataType.INTEGER,
            allowNull: true
        }, 
        km: {
            type: DataType.INTEGER,
            allowNull: true
        }, 
        fecha: {
            type: DataType.STRING,
            allowNull: false
        },
        fecha_creacion: {
            type: DataType.STRING,
            allowNull: false
        },
        fecha_reporte_entrega: {
            type: DataType.STRING,
            allowNull: true
        },
        fecha_cierre_itinerario: {
            type: DataType.STRING,
            allowNull: true
        }
    },
    {
        tableName: 'itinerarios',        
        timestamps: false
    });

    Itinerarios.associate = (models) => {
        Itinerarios.hasMany(models.ItinerarioDetalle, {
            foreignKey: 'id_itinerarios',
            targetKey: 'id_itinerarios'
        });
    };
    
    return Itinerarios;
}