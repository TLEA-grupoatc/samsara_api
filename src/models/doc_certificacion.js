module.exports = (sequelize, DataType) => {
    const DocCertificacion = sequelize.define('DocCertificacion',{
        id_evidencia_certificacion:{
            type: DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_certificacion:{
            type: DataType.INTEGER,
            allowNull: true
        },
        via:{
            type: DataType.STRING,
            allowNull: true
        },
        nombre:{
            type: DataType.STRING,
            allowNull: false
        },
        descripcion:{
            type: DataType.STRING,
            allowNull: true
        },
        tipo:{
            type: DataType.STRING,
            allowNull: true
        },
        archivo:{
            type: DataType.STRING,
            allowNull: true
        },
        usuario:{
            type: DataType.STRING,
            allowNull: false
        },
        fecha_creacion:{
            type: DataType.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'evidencia_certificacion',        
        timestamps: false
    });

    return DocCertificacion;
}