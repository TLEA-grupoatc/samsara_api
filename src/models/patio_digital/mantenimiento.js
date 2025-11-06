module.exports = (sequelize, DataType) => {
    const PdMantenimiento = sequelize.define('Mantenimiento', {
        id_mantenimiento: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
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
        tracto_ot_preventivo: {
            type: DataType.INTEGER,
            allowNull: true,
        },
        re1_ot_preventivo: {
            type: DataType.INTEGER,
            allowNull: true,
        },
        dl_ot_preventivo: {
            type: DataType.INTEGER,
            allowNull: true,
        },
        re2_ot_preventivo: {
            type: DataType.INTEGER,
            allowNull: true,
        },
        tipo_mtto: {
            type: DataType.STRING(50),
            allowNull: true
        },
        carril: {
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
    },{
        tableName: 'pd_mantenimiento',
        timestamps: false
    });

    PdMantenimiento.beforeUpdate((entrada, options) => {
        PdMantenimiento.actualizado_el = sequelize.literal('CURRENT_TIMESTAMP');
    });

    PdMantenimiento.associate = (models) => {
        // PdMantenimiento.belongsTo(models.Usuarios, { foreignKey: 'fk_usuario_cre' });
        // PdMantenimiento.belongsTo(models.Usuarios, { foreignKey: 'fk_usuario_act' });
    };
    
    return PdMantenimiento;
}