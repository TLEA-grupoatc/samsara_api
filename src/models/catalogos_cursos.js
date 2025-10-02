module.exports = (sequelize, DataType) => {
    const CatalogoCursos = sequelize.define('CatalogoCursos',{
        id_catalogo_curso:{
            type: DataType.INTEGER,
            primaryKey: true
        },
        nombre_curso:{
            type: DataType.STRING,
            allowNull: false
        },
        descripcion:{
            type: DataType.STRING,
            allowNull: false
        },
        tipo_plan:{
            type: DataType.STRING,
            allowNull: false
        },
        tipo_capacitacion:{
            type: DataType.STRING,
            allowNull: false
        },
        subtema:{
            type: DataType.STRING,
            allowNull: false
        },
        area:{
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
        tableName: 'catalogo_cursos',        
        timestamps: false
    });

    return CatalogoCursos;
}