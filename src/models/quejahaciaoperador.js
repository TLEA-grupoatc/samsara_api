module.exports = (sequelize, DataType) => {
    const QuejaOperador = sequelize.define('QuejaOperador',{
        id_queja: {
            type: DataType.INTEGER,
            primaryKey: true
        }, 
        operador: {
            type: DataType.STRING,
            allowNull: true
        }, 
        realizo_queja: {
            type: DataType.STRING,
            allowNull: true
        }, 
        descripcion: {
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
        fecha_modificacion: {
            type: DataType.STRING,
            allowNull: true
        }, 
        usuario_modificacion: {
            type: DataType.STRING,
            allowNull: true
        }, 
        fecha_cierre: {
            type: DataType.STRING,
            allowNull: true
        }, 
        estatus: {
            type: DataType.STRING,
            allowNull: true
        },
    },
    {
        tableName: 'quejaoperador',        
        timestamps: false
    });

    return QuejaOperador;
}