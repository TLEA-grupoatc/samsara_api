module.exports = (sequelize, DataType) => {
    const InspeccionSalida = sequelize.define('InspeccionesInspSalida', {
        id_checklist_insp_sal: {
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
        tableName: 'pd_inspecciones_insp_salida',
        timestamps: false
    });

    InspeccionSalida.associate = (models) => {
        InspeccionSalida.belongsTo(models.Usuarios, { foreignKey: 'fk_usuario_cre' });
        InspeccionSalida.hasMany(models.HallazgosInspSalida, { foreignKey: 'fk_checklist_insp_sal', sourceKey: 'id_checklist_insp_sal', });
    };

    return InspeccionSalida;
};
