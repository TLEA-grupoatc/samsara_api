module.exports = (sequelize, DataType) => {
    const ReportesConvoy = sequelize.define('ReportesConvoy',{
        id_reporteConvoy:{
            type: DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_unidad:{
            type: DataType.STRING,
            allowNull: true
        },
        unidad:{
            type: DataType.STRING,
            allowNull: true
        },
        fechahorakm:{
            type: DataType.STRING,
            allowNull: true
        },
        km:{
            type: DataType.STRING,
            allowNull: true
        },
        fechahoragps:{
            type: DataType.STRING,
            allowNull: true
        },
        latitud:{
            type: DataType.STRING,
            allowNull: true
        },
        longitud:{
            type: DataType.STRING,
            allowNull: true
        },
        location:{
            type: DataType.STRING,
            allowNull: true
        },
        fechaodo:{
            type: DataType.STRING,
            allowNull: true
        },
        odometer:{
            type: DataType.STRING,
            allowNull: true
        }
    },
    {
        tableName: 'reporteConvoy',        
        timestamps: false
    });

    return ReportesConvoy;
}