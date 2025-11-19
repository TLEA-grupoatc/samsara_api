module.exports = (sequelize, DataType) => {
    const Accidentes = sequelize.define('Accidentes',{
        id_accidentes: {
            type: DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }, 
        operador: {
            type: DataType.STRING,
            allowNull: true
        },
        economico: {
            type: DataType.STRING,
            allowNull: true
        }, 
        tipo_accidente: {
            type: DataType.STRING,
            allowNull: true
        }, 
        motivo: {
            type: DataType.STRING,
            allowNull: true
        }, 
        descripcion: {
            type: DataType.STRING,
            allowNull: true
        }, 
        monto: {
            type: DataType.FLOAT,
            allowNull: true
        }, 
        evidencia: {
            type: DataType.STRING,
            allowNull: true
        }, 
        fecha: {
            type: DataType.STRING,
            allowNull: true
        }, 
        mes: {
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
        }
    },
    {
        tableName: 'accidentes',        
        timestamps: false
    });

    return Accidentes;
}