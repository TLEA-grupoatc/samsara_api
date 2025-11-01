module.exports = (sequelize, DataType) => {
    const AuditoriaSeguridad = sequelize.define('AuditoriaSeguridad',{
        id_as:{
            type: DataType.INTEGER,
            primaryKey: true
        },
        division: {
            type: DataType.STRING,
            allowNull: true
        },
        unidadnegocio: {
            type: DataType.STRING,
            allowNull: true
        },
        operador: {
            type: DataType.STRING,
            allowNull: true
        },
        maxipista: {
            type: DataType.STRING,
            allowNull: true
        },
        aprobo: {
            type: DataType.STRING,
            allowNull: true
        },
        comentarios: {
            type: DataType.STRING,
            allowNull: true
        },
        evidenciaauditoria: {
            type: DataType.STRING,
            allowNull: true
        },
        aplicaconcientizacion: {
            type: DataType.STRING,
            allowNull: true
        },
        evidenciaconcientizacion: {
            type: DataType.STRING,
            allowNull: true
        },
        registrado_por: {
            type: DataType.STRING,
            allowNull: true
        },
        creado_el: {
            type: DataType.STRING,
            allowNull: true
        },
        actualizado_por: {
            type: DataType.STRING,
            allowNull: true
        },
        actualizado_el: {
            type: DataType.STRING,
            allowNull: true
        },
        estatus: {
            type: DataType.STRING,
            allowNull: true
        }
    },
    {
        tableName: 'auditoriaseguridad',        
        timestamps: false
    });

    return AuditoriaSeguridad;
}