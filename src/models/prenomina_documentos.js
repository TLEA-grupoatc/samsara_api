module.exports = (sequelize, DataType) => {
    const PrenominasDocumentos = sequelize.define('PrenominasDocumentos',{
        id_pd:{
            type: DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_prenomina:{
            type: DataType.INTEGER,
            allowNull: true
        },
        id_liquidacion:{
            type: DataType.INTEGER,
            allowNull: true
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
        },
        verificado:{
            type: DataType.STRING,
            allowNull: true
        },
        verificado_por:{
            type: DataType.STRING,
            allowNull: true
        }
    },
    {
        tableName: 'prenomina_documentos',        
        timestamps: false
    });

    return PrenominasDocumentos;
}