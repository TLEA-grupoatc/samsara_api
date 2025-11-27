module.exports = (sequelize, DataType) => {
    const DocumentoParaPrenomina = sequelize.define('DocumentoParaPrenomina',{
        id_dpp:{
            type: DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        operador:{
            type: DataType.STRING,
            allowNull: true
        },
        economico:{
            type: DataType.STRING,
            allowNull: false
        },
        monto: {
            type: DataType.FLOAT,
            allowNull: false
        }, 
        fecha: {
            type: DataType.STRING,
            allowNull: false
        }, 
        titulo: {
            type: DataType.STRING,
            allowNull: false
        }, 
        evidencia: {
            type: DataType.STRING,
            allowNull: false
        }, 
        estatus: {
            type: DataType.INTEGER,
            allowNull: false
        }, 
        id_prenomina: {
            type: DataType.INTEGER,
            allowNull: false
        }, 
        fecha_creacion: {
            type: DataType.STRING,
            allowNull: false
        }, 
        usuario_creacion: {
            type: DataType.STRING,
            allowNull: false
        }, 
        fecha_modificacion: {
            type: DataType.STRING,
            allowNull: false
        }, 
        usuario_modificacion: {
            type: DataType.STRING,
            allowNull: true
        }
    },
    {
        tableName: 'documentoParaPrenominas',        
        timestamps: false
    });

    return DocumentoParaPrenomina;
}