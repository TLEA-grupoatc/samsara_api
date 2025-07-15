module.exports = (sequelize, DataType) => {
    const InspeccionEntrada = sequelize.define('InspeccionEntrada', {
        id_inspeccion_entrada:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
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
        InspeccionEntrada.belongsTo(models.InspeccionReporteDanos, { foreignKey: 'fk_insp_reporte_danos' });
        InspeccionEntrada.belongsTo(models.InspeccionReporteDanos, { foreignKey: 'fk_insp_reporte_danos_2', as: 'ReporteDanos2' });
        InspeccionEntrada.belongsTo(models.Usuarios, { foreignKey: 'fk_usuario_confirmacion_fosa' });
    };
    
    return InspeccionEntrada;
}