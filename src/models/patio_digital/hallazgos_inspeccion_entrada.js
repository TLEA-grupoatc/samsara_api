module.exports = (sequelize, DataType) => {
    const PdHallazgosInspeccionEntrada = sequelize.define('HallazgosInspEntrada', {
        id_hallazgo_insp_ent: {
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
        descripcion_check: {
            type: DataType.STRING(300),
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
        tableName: 'pd_hallazgos_inspeccion_entrada',
        timestamps: false
    });

    PdHallazgosInspeccionEntrada.associate = (models) => {
        PdHallazgosInspeccionEntrada.belongsTo(models.InspeccionesInspEntrada, { foreignKey: 'fk_checklist_insp_ent', targetKey: 'id_checklist_insp_ent' });
        PdHallazgosInspeccionEntrada.belongsTo(models.CatalogoFamilia, { foreignKey: 'fk_familia' });
        PdHallazgosInspeccionEntrada.belongsTo(models.CatalogoComponente, { foreignKey: 'fk_componente' });
    };

    return PdHallazgosInspeccionEntrada;
};
