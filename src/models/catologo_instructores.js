module.exports = (sequelize, DataType) => {
    const CatalogoInstructores = sequelize.define('CatalogoInstructores',{
        id_catalogo_instructor:{
            type: DataType.INTEGER,
            primaryKey: true
        },
        nombre_instructor:{
            type: DataType.STRING,
            allowNull: false
        },
        puesto:{
            type: DataType.STRING,
            allowNull: false
        },
        fecha_creacion: {
            type: DataType.STRING,
            allowNull: true
        }, 
        usuario_creacion: {
            type: DataType.STRING,
            allowNull: true
        },
        estatus: {
            type: DataType.STRING,
            allowNull: true
        }
    },
    {
        tableName: 'catalogo_instructores',        
        timestamps: false
    });

    return CatalogoInstructores;
}