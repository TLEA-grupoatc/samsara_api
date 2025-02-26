module.exports = (sequelize, DataType) => {
    const DocGastos = sequelize.define('DocGastos',{
        id_doc_gastos:{
            type: DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        folio:{
            type: DataType.STRING,
            allowNull: true
        },
        operador:{
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
        tableName: 'docs_gastos',        
        timestamps: false
    });

    return DocGastos;
}