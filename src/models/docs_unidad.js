module.exports = (sequelize, DataType) => {
    const DocsUnidades = sequelize.define('DocsUnidades',{
        id:{
            type: DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        unidad:{
            type: DataType.STRING,
            allowNull: true
        },
        camp: {
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
        fecha:{
            type: DataType.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'docs_unidades',        
        timestamps: false
    });

    return DocsUnidades;
}