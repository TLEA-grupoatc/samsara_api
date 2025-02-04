module.exports = (sequelize, DataType) => {
    const DocOperadores = sequelize.define('DocOperadores',{
        id_doc_operador:{
            type: DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        operador:{
            type: DataType.STRING,
            allowNull: true
        },
        numero_empleado:{
            type: DataType.INTEGER,
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
        tableName: 'docs_operador',        
        timestamps: false
    });

    return DocOperadores;
}