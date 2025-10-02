module.exports = (sequelize, DataType) => {
    const Cursos = sequelize.define('Cursos',{
        id_curso: {
            type: DataType.INTEGER,
            primaryKey: true
        }, 
        operador: {
            type: DataType.STRING,
            allowNull: true
        }, 
        base: {
            type: DataType.STRING,
            allowNull: true
        }, 
        curso: {
            type: DataType.STRING,
            allowNull: true
        }, 
        descripcion: {
            type: DataType.STRING,
            allowNull: true
        }, 
        instructor: {
            type: DataType.STRING,
            allowNull: true
        }, 
        modalidad: {
            type: DataType.STRING,
            allowNull: true
        }, 
        fecha: {
            type: DataType.STRING,
            allowNull: true
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
        },
    },
    {
        tableName: 'cursos',        
        timestamps: false
    });

    return Cursos;
}