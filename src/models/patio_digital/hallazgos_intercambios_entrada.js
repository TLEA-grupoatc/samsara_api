module.exports = (sequelize, DataType) => {
    const PdHallazgosIntercambios = sequelize.define('HallazgosIntercambios', {
        id_hallazgo: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        fk_intercambios_entrada: {
            type: DataType.INTEGER,
            allowNull: true
        },
        fk_intercambios_salida: {
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
        tableName: 'pd_hallazgos_intercambios',
        timestamps: false
    });

    PdHallazgosIntercambios.associate = (models) => {
        PdHallazgosIntercambios.belongsTo(models.IntercambiosEntrada, { foreignKey: 'fk_intercambios_entrada', targetKey: 'id_intercambios_entrada' });
        PdHallazgosIntercambios.belongsTo(models.IntercambiosSalida, { foreignKey: 'fk_intercambios_salida', targetKey: 'id_intercambios_salida' });
        PdHallazgosIntercambios.belongsTo(models.CatalogoFamilia, { foreignKey: 'fk_familia' });
        PdHallazgosIntercambios.belongsTo(models.CatalogoComponente, { foreignKey: 'fk_componente' });
    };

    return PdHallazgosIntercambios;
};
