module.exports = (sequelize, DataType) => {
    const PdInspReporteDanos = sequelize.define('InspeccionReporteDanos', {
        id_insp_reporte_danos: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        fecha_reporte: {
            type: DataType.DATE,
            allowNull: true
        },
        folio_intercambio: {
            type: DataType.STRING(100),
            allowNull: true
        },
        descripcion: {
            type: DataType.STRING(400),
            allowNull: true
        },
        aplica_cargo_operador: {
            type: DataType.BOOLEAN,
            allowNull: true
        },
        llanta_golpe_int_ext: {
            type: DataType.BOOLEAN,
            allowNull: true,
            defaultValue: null
        },
        llanta_numero: {
            type: DataType.STRING(200),
            allowNull: true
        },
        llanta_fecha_fabricacion: {
            type: DataType.STRING(200),
            allowNull: true
        },
        llanta_milimetraje: {
            type: DataType.STRING(100),
            allowNull: true
        },
        llanta_observaciones: {
            type: DataType.STRING(400),
            allowNull: true
        },
        foto_evidencia_1: {
            type: DataType.STRING(100),
            allowNull: true
        },
        foto_evidencia_2: {
            type: DataType.STRING(100),
            allowNull: true
        },
        foto_evidencia_3: {
            type: DataType.STRING(100),
            allowNull: true
        },
        foto_evidencia_4: {
            type: DataType.STRING(100),
            allowNull: true
        },
        foto_evidencia_5: {
            type: DataType.STRING(100),
            allowNull: true
        },
        foto_evidencia_6: {
            type: DataType.STRING(100),
            allowNull: true
        },
        foto_evidencia_7: {
            type: DataType.STRING(100),
            allowNull: true
        },
        foto_evidencia_8: {
            type: DataType.STRING(100),
            allowNull: true
        },
        foto_evidencia_9: {
            type: DataType.STRING(100),
            allowNull: true
        },
        foto_evidencia_10: {
            type: DataType.STRING(100),
            allowNull: true
        },
        firma_operador: {
            type: DataType.STRING(100),
            allowNull: true
        },
        firma_jefe_unidad: {
            type: DataType.STRING(100),
            allowNull: true
        },
        pdf_reporte_danos: {
            type: DataType.STRING(100),
            allowNull: true
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
        fk_usuario: {
            type: DataType.INTEGER,
            allowNull: true
        }
    }, {
        tableName: 'pd_insp_reporte_danos',
        timestamps: false
    });

    PdInspReporteDanos.beforeUpdate((reporte, options) => {
        PdInspReporteDanos.actualizado_el = sequelize.literal('CURRENT_TIMESTAMP');
    });

    PdInspReporteDanos.associate = (models) => {
        PdInspReporteDanos.belongsTo(models.Usuarios, { foreignKey: 'fk_usuario' });
        PdInspReporteDanos.hasMany(models.PiezasReporteDanos, {
            foreignKey: 'fk_insp_reporte_danos',
            as: 'piezas_reporte_danos'
        });
    };

    return PdInspReporteDanos;
};