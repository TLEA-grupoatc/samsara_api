module.exports = (sequelize, DataType) => {
    const GeoGaso = sequelize.define('GeoGaso',{
        id_geo_gaso:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tracto:{
            type: DataType.STRING,
            allowNull: true
        },
        geo:{
            type: DataType.STRING,
            allowNull: true
        },
        dia:{
            type: DataType.STRING,
            allowNull: true
        },
        fecha_entrada:{
            type: DataType.STRING,
            allowNull: true
        },
        tanque:{
            type: DataType.INTEGER,
            allowNull: true
        },
        fecha_salida:{
            type: DataType.STRING,
            allowNull: true
        },
        tanque_salida:{
            type: DataType.INTEGER,
            allowNull: true
        },
        carga:{
            type: DataType.INTEGER,
            allowNull: true
        }
    },
    {
        tableName: 'geo_gasolinera',        
        timestamps: false
    });
    
    return GeoGaso;
}