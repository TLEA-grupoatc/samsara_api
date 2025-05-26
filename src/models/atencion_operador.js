module.exports = (sequelize, DataType) => {
    const AtencionOperador = sequelize.define('AtencionOperador',{
        id_atencion: {
            type: DataType.INTEGER,
            primaryKey: true
        }, 
        operador: {
            type: DataType.STRING,
            allowNull: true
        }, 
        realizo_atencion: {
            type: DataType.STRING,
            allowNull: true
        }, 
        atencion: {
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
        }
    },
    {
        tableName: 'atenciones_operador',        
        timestamps: false
    });

    return AtencionOperador;
}