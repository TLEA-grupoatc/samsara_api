module.exports = (sequelize, DataType) => {
    const PdEvidencias = sequelize.define('Evidencias', {
        id_evidencias: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        ingreso_mtto: {
            type: DataType.BOOLEAN,
            allowNull: true,
        },
        video_inspeccion_salida: {
            type: DataType.STRING(200),
            allowNull: true
        },
        tracto_ot_correctivo: {
            type: DataType.INTEGER,
            allowNull: true
        },
        tracto_ot_preventivo: {
            type: DataType.INTEGER,
            allowNull: true
        },
        tracto_ot_mtto_correctivo: {
            type: DataType.STRING(200),
            allowNull: true
        },
        tracto_ot_mtto_preventivo: {
            type: DataType.STRING(200),
            allowNull: true
        },
        re1_ot_correctivo: {
            type: DataType.INTEGER,
            allowNull: true
        },
        re1_ot_preventivo: {
            type: DataType.INTEGER,
            allowNull: true
        },
        re1_ot_mtto_correctivo: {
            type: DataType.STRING(200),
            allowNull: true
        },
        re1_ot_mtto_preventivo: {
            type: DataType.STRING(200),
            allowNull: true
        },
        dl_ot_correctivo: {
            type: DataType.INTEGER,
            allowNull: true
        },
        dl_ot_preventivo: {
            type: DataType.INTEGER,
            allowNull: true
        },
        dl_ot_mtto_correctivo: {
            type: DataType.STRING(200),
            allowNull: true
        },
        dl_ot_mtto_preventivo: {
            type: DataType.STRING(200),
            allowNull: true
        },
        re2_ot_correctivo: {
            type: DataType.INTEGER,
            allowNull: true
        },
        re2_ot_preventivo: {
            type: DataType.INTEGER,
            allowNull: true
        },
        re2_ot_mtto_correctivo: {
            type: DataType.STRING(200),
            allowNull: true
        },
        re2_ot_mtto_preventivo: {
            type: DataType.STRING(200),
            allowNull: true
        },
        firma_operador: {
            type: DataType.STRING(200),
            allowNull: true
        },
        aplica_preventivo: {
            type: DataType.BOOLEAN,
            allowNull: true,
        },
        aplica_tracto: {
            type: DataType.BOOLEAN,
            allowNull: true,
        },
        aplica_remolque1: {
            type: DataType.BOOLEAN,
            allowNull: true,
        },
        aplica_dolly: {
            type: DataType.BOOLEAN,
            allowNull: true,
        },
        aplica_remolque2: {
            type: DataType.BOOLEAN,
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
        fk_usuario: {
            type: DataType.INTEGER,
            allowNull: true,
        },
    }, {
        tableName: 'pd_evidencias',
        timestamps: false
    });

    PdEvidencias.beforeUpdate((evidencias, options) => {
        PdEvidencias.actualizado_el = sequelize.literal('CURRENT_TIMESTAMP');
    });

    PdEvidencias.associate = function(models) {
        PdEvidencias.belongsTo(models.Usuarios, { foreignKey: 'fk_usuario' });
    };

    return PdEvidencias;
}