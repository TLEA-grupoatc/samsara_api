module.exports = (sequelize, DataType) => {
    const PdHallazgosInspeccionSalida = sequelize.define('HallazgosInspSalida', {
        id_hallazgo_insp_sal: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        fk_checklist_insp_ent: {
            type: DataType.INTEGER,
            allowNull: true
        },
        fk_familia: {
            type: DataType.INTEGER,
            allowNull: true
        },
        fk_componente: {
            type: DataType.INTEGER,
            allowNull: true
        },
        critico: {
            type: DataType.BOOLEAN,
            allowNull: true
        },
        observaciones: {
            type: DataType.STRING(300),
            allowNull: true
        },
        foto_hallazgo_1: {
            type: DataType.STRING(300),
            allowNull: true
        },
        foto_hallazgo_2: {
            type: DataType.STRING(300),
            allowNull: true
        }
    }, {
        tableName: 'pd_hallazgos_inspeccion_salida',
        timestamps: false
    });

    PdHallazgosInspeccionSalida.associate = (models) => {
        PdHallazgosInspeccionSalida.belongsTo(models.InspeccionesInspSalida, { foreignKey: 'fk_checklist_insp_sal', targetKey: 'id_checklist_insp_sal' });
        PdHallazgosInspeccionSalida.belongsTo(models.CatalogoFamilia, { foreignKey: 'fk_familia' });
        PdHallazgosInspeccionSalida.belongsTo(models.CatalogoComponente, { foreignKey: 'fk_componente' });
    };

    return PdHallazgosInspeccionSalida;
};
