module.exports = (sequelize, DataType) => {
    const ActividadesDo = sequelize.define('ActividadesDo',{
        id_actividad_ope_op: {
            type: DataType.INTEGER,
            primaryKey: true
        }, 
        operador: {
            type: DataType.STRING,
            allowNull: true
        }, 
        tipo: {
            type: DataType.STRING,
            allowNull: true
        }, 
        criticidad: {
            type: DataType.STRING,
            allowNull: true
        }, 
        grupo: {
            type: DataType.STRING,
            allowNull: true
        }, 
        subgrupo: {
            type: DataType.STRING,
            allowNull: true
        }, 
        descripcion: {
            type: DataType.STRING,
            allowNull: true
        }, 
        comentarios: {
            type: DataType.STRING,
            allowNull: true
        }, 
        enbase: {
            type: DataType.STRING,
            allowNull: true
        }, 
        base: {
            type: DataType.STRING,
            allowNull: true
        }, 
        seguimiento_colaborador: {
            type: DataType.STRING,
            allowNull: true
        }, 
        fecha_inicio: {
            type: DataType.STRING,
            allowNull: true
        }, 
        fecha_tentativa: {
            type: DataType.STRING,
            allowNull: true
        }, 
        fecha_cierre: {
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
        estatus: {
            type: DataType.STRING,
            allowNull: true
        },
    },
    {
        tableName: 'actividad_do_op',        
        timestamps: false
    });

    return ActividadesDo;
}