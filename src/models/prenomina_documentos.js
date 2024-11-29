module.exports = (sequelize, DataType) => {
    const PrenominasDocumentos = sequelize.define('PrenominasDocumentos',{
        id_pd:{
            type: DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre:{
            type: DataType.STRING,
            allowNull: false
        },
        descripcion:{
            type: DataType.STRING,
            allowNull: false
        },
        tipo:{
            type: DataType.STRING,
            allowNull: false
        },
        archivo:{
            type: DataType.STRING,
            allowNull: false
        },
        fecha_creacion:{
            type: DataType.STRING,
            allowNull: false
        },
        usuario:{
            type: DataType.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'prenomina_documentos',        
        timestamps: false
    });

    return PrenominasDocumentos;
}