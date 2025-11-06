module.exports = (sequelize, DataType) => {
    const InspeccionEntrada = sequelize.define('InspeccionEntrada', {
        id_inspeccion_entrada:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        fk_insp_ext_1: {
            type: DataType.INTEGER,
            allowNull: true,
        },
        fk_insp_ext_2: {
            type: DataType.INTEGER,
            allowNull: true,
        },
        fk_insp_fosa: {
            type: DataType.INTEGER,
            allowNull: true,
        },
        fk_insp_expres: {
            type: DataType.INTEGER,
            allowNull: true,
        },
        fk_insp_reporte_operador: {
            type: DataType.INTEGER,
            allowNull: true,
        },
        tracto_ot_correctivo: {
            type: DataType.INTEGER,
            allowNull: true,
        },
        re1_ot_correctivo: {
            type: DataType.INTEGER,
            allowNull: true,
        },
        dl_ot_correctivo: {
            type: DataType.INTEGER,
            allowNull: true,
        },
        re2_ot_correctivo: {
            type: DataType.INTEGER,
            allowNull: true,
        },
        video_insp_ext_1: {
            type: DataType.STRING(200),
            allowNull: true,
        },
        video_insp_ext_2: {
            type: DataType.STRING(200),
            allowNull: true,
        },
        video_insp_fosa: {
            type: DataType.STRING(200),
            allowNull: true,
        },
        video_insp_reporte_operador: {
            type: DataType.STRING(200),
            allowNull: true,
        },
        fecha_hora_inicio: {
            type: DataType.DATE,
            allowNull: true,
        },
        fecha_hora_fin: {
            type: DataType.DATE,
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
        fk_insp_reporte_danos: {
            type: DataType.INTEGER,
            allowNull: true,
        },
        fk_insp_reporte_danos_2: {
            type: DataType.INTEGER,
            allowNull: true,
        },
        fk_usuario_confirmacion_fosa: {
            type: DataType.INTEGER,
            allowNull: true,
        },
    },{
        tableName: 'pd_inspeccion_entrada',
        timestamps: false
    });

    InspeccionEntrada.beforeUpdate((entrada, options) => {
        InspeccionEntrada.actualizado_el = sequelize.literal('CURRENT_TIMESTAMP');
    });

    InspeccionEntrada.associate = (models) => {
        InspeccionEntrada.belongsTo(models.PickAndUp, { foreignKey: 'id_inspeccion_entrada', targetKey: 'fk_inspeccion_entrada' });
        InspeccionEntrada.belongsTo(models.InspeccionesInspEntrada, { foreignKey: 'fk_insp_ext_1', as: 'InspExt1' });
        InspeccionEntrada.belongsTo(models.InspeccionesInspEntrada, { foreignKey: 'fk_insp_ext_2', as: 'InspExt2' });
        InspeccionEntrada.belongsTo(models.InspeccionesInspEntrada, { foreignKey: 'fk_insp_fosa', as: 'InspFosa' });
        InspeccionEntrada.belongsTo(models.InspeccionesInspEntrada, { foreignKey: 'fk_insp_reporte_operador', as: 'InspRepOp' });
        InspeccionEntrada.belongsTo(models.InspeccionesInspEntrada, { foreignKey: 'fk_insp_expres', as: 'InspExpres' });
        InspeccionEntrada.belongsTo(models.InspeccionReporteDanos, { foreignKey: 'fk_insp_reporte_danos' });
        InspeccionEntrada.belongsTo(models.InspeccionReporteDanos, { foreignKey: 'fk_insp_reporte_danos_2', as: 'ReporteDanos2' });
        InspeccionEntrada.belongsTo(models.Usuarios, { foreignKey: 'fk_usuario_confirmacion_fosa' });
    };
    
    return InspeccionEntrada;
}