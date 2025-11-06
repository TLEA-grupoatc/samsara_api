module.exports = (sequelize, DataType) => {
    const InspeccionSalida = sequelize.define('InspeccionSalida', {
        id_inspeccion_salida:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        fecha_preliberacion: {
            type: DataType.DATE,
            allowNull: true,
        },
        fecha_liberacion: {
            type: DataType.DATE,
            allowNull: true,
        },
        evidencia_ajuste_parametros_1: {
            type: DataType.STRING(100),
            allowNull: true,
        },
        evidencia_ajuste_parametros_2: {
            type: DataType.STRING(100),
            allowNull: true,
        },
        fecha_carga_ajuste_param: {
            type: DataType.DATE,
            allowNull: true,
        },
        evidencia_video_frenos: {
            type: DataType.STRING(100),
            allowNull: true,
        },
        evidencia_video_unidad: {
            type: DataType.STRING(100),
            allowNull: true,
        },
        comentarios_operador: {
            type: DataType.STRING(300),
            allowNull: true,
        },
        comentarios_inspector: {
            type: DataType.STRING(300),
            allowNull: true,
        },
        video_entrega: {
            type: DataType.STRING(100),
            allowNull: true,
        },
        firma_inspector: {
            type: DataType.STRING(100),
            allowNull: true,
        },
        firma_operador: {
            type: DataType.STRING(100),
            allowNull: true,
        },
        creado_el: {
            type: DataType.DATE,
            allowNull: false,
            defaultValue: DataType.NOW
        },
        actualizado_el: {
            type: DataType.DATE,
            allowNull: false,
            defaultValue: DataType.NOW
        },
        fk_usuario_confirmacion_fosa: {
            type: DataType.INTEGER,
            allowNull: true,
        },
    },{
        tableName: 'pd_inspeccion_salida',
        timestamps: false
    });

    InspeccionSalida.beforeUpdate((salida, options) => {
        InspeccionSalida.actualizado_el = sequelize.literal('CURRENT_TIMESTAMP');
    });

    InspeccionSalida.associate = (models) => {
        InspeccionSalida.belongsTo(models.PickAndUp, { foreignKey: 'id_inspeccion_salida', targetKey: 'fk_inspeccion_salida' });
        InspeccionSalida.belongsTo(models.Usuarios, { foreignKey: 'fk_usuario_confirmacion_fosa' });
    };
    
    return InspeccionSalida;
}