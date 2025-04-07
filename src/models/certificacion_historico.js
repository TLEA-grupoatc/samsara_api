module.exports = (sequelize, DataType) => {
    const CertificacionHistorico = sequelize.define('CertificacionHistorico',{
        id_certificacion_historico:{
            type: DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_certificacion:{
            type: DataType.INTEGER,
            allowNull: true
        },
        origen:{
            type: DataType.STRING,
            allowNull: true
        },
        destino:{
            type: DataType.STRING,
            allowNull: true
        },
        via:{
            type: DataType.STRING,
            allowNull: true
        },
        estatus:{
            type: DataType.STRING,
            allowNull: true
        },
        usuario:{
            type: DataType.STRING,
            allowNull: false
        },
        fecha:{
            type: DataType.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'certificacion_historico',        
        timestamps: false
    });

    return CertificacionHistorico;
}