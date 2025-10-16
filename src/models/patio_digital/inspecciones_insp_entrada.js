module.exports = (sequelize, DataType) => {
    const InspeccionEntrada = sequelize.define('InspeccionesInspEntrada', {
        id_checklist_insp_ent: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        checklist: {
            type: DataType.STRING(100),
            allowNull: true,
        },
        tipo_checklist: {
            type: DataType.INTEGER,
            allowNull: true,
        },
        fecha_inspeccion: {
            type: DataType.DATE,
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
        fk_usuario_cre: {
            type: DataType.INTEGER,
            allowNull: true,
        },
    }, {
        tableName: 'pd_inspecciones_insp_entrada',
        timestamps: false
    });

    InspeccionEntrada.associate = (models) => {
        InspeccionEntrada.belongsTo(models.Usuarios, { foreignKey: 'fk_usuario_cre' });
        InspeccionEntrada.hasMany(models.HallazgosInspEntrada, { foreignKey: 'fk_checklist_insp_ent', sourceKey: 'id_checklist_insp_ent', });
    };

    return InspeccionEntrada;
};
