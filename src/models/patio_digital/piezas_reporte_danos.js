module.exports = (sequelize, DataType) => {
    const PiezasReporteDanos = sequelize.define('PiezasReporteDanos', {
        id_pieza_reporte_danos: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        cantidad: {
            type: DataType.INTEGER,
            allowNull: true
        },
        pieza: {
            type: DataType.STRING(100),
            allowNull: true
        },
        costo: {
            type: DataType.INTEGER,
            allowNull: true
        },
        fk_insp_reporte_danos: {
            type: DataType.INTEGER,
            allowNull: true,
        }
    }, {
        tableName: 'pd_insp_piezas_reporte_danos',
        timestamps: false
    });

    PiezasReporteDanos.associate = (models) => {
        PiezasReporteDanos.belongsTo(models.InspeccionReporteDanos, { foreignKey: 'fk_insp_reporte_danos' });
    };

    return PiezasReporteDanos;
}