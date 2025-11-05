module.exports = (sequelize, DataType) => {
    const PonderacionOperador = sequelize.define('PonderacionOperador',{
        id_po_op: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }, 
        operador: {
            type: DataType.STRING,
            allowNull: true
        }, 

        ponderacion: {
            type: DataType.INTEGER,
            allowNull: true
        }, 
        examen_maxipista: {
            type: DataType.INTEGER,
            allowNull: true
        }, 
        examen_maxipista_calificacion: {
            type: DataType.INTEGER,
            allowNull: true
        }, 
        auditoria_maxipista: {
            type: DataType.INTEGER,
            allowNull: true
        }, 
        auditoria_maxipista_calificacion: {
            type: DataType.INTEGER,
            allowNull: true
        }, 
        exceso_velocidad: {
            type: DataType.INTEGER,
            allowNull: true
        }, 
        exceso_velocidad_calificacion: {
            type: DataType.INTEGER,
            allowNull: true
        }, 
        paradano_autorizada: {
            type: DataType.INTEGER,
            allowNull: true
        }, 
        paradano_autorizada_calificacion: {
            type: DataType.INTEGER,
            allowNull: true
        }, 
        usode_movil: {
            type: DataType.INTEGER,
            allowNull: true
        }, 
        usode_movil_calificacion: {
            type: DataType.INTEGER,
            allowNull: true
        }, 
        distanciade_seguimiento: {
            type: DataType.INTEGER,
            allowNull: true
        }, 
        distanciade_seguimiento_calificacion: {
            type: DataType.INTEGER,
            allowNull: true
        }, 
        somnoliento: {
            type: DataType.INTEGER,
            allowNull: true
        }, 
        somnoliento_calificacion: {
            type: DataType.INTEGER,
            allowNull: true
        }, 
        fecha_creacion: {
            type: DataType.INTEGER,
            allowNull: true
        }
    },
    {
        tableName: 'ponderacionOperador',        
        timestamps: false
    });

    return PonderacionOperador;
}