module.exports = (sequelize, DataType) => {
    const MovimientoCarril = sequelize.define('MovimientosCarriles', {
        id_movimiento: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        fk_mantenimiento: {
            type: DataType.INTEGER,
            allowNull: true,
        },
        carril: {
            type: DataType.STRING(50),
            allowNull: true,
        },
        fecha_cambio: {
            type: DataType.DATE,
            allowNull: true,
        },
        fk_usuario: {
            type: DataType.INTEGER,
            allowNull: true,
        },
    }, {
        tableName: 'pd_movimientos_carriles',
        timestamps: false
    });

    MovimientoCarril.associate = (models) => {
        MovimientoCarril.belongsTo(models.Usuarios, { foreignKey: 'fk_usuario', targetKey: 'id_usuario' });
        // MovimientoCarril.belongsTo(models.Mantenimientos, { foreignKey: 'fk_mantenimiento', targetKey: 'id_mantenimiento' });
    };

    return MovimientoCarril;
};
