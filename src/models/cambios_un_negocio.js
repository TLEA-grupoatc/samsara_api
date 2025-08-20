module.exports = (sequelize, DataType) => {
    const CambiosUnNegocio = sequelize.define('CambiosUnNegocio', {
        id_cambio: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        fk_unidad: {
            type: DataType.STRING(100),
            allowNull: true
        },
        fk_coordinador: {
            type: DataType.INTEGER,
            allowNull: true
        },
        fk_cliente: {
            type: DataType.INTEGER,
            allowNull: true
        },
        unidad: {
            type: DataType.STRING(45),
            allowNull: true
        },
        fk_circuito: {
            type: DataType.INTEGER,
            allowNull: true
        },
        division: {
            type: DataType.INTEGER,
            allowNull: true
        },
        operador: {
            type: DataType.STRING(100),
            allowNull: true
        },
        modificado_por: {
            type: DataType.INTEGER,
            allowNull: true
        },
        fecha_cambio: {
            type: DataType.DATE,
            allowNull: true
        }
    }, {
        tableName: 'cambios_un_negocio',
        timestamps: false
    });

    CambiosUnNegocio.associate = (models) => {
        CambiosUnNegocio.belongsTo(models.Unidades, { foreignKey: 'fk_unidad', targetKey: 'id_unidad' });
        CambiosUnNegocio.belongsTo(models.Coordinador, { foreignKey: 'fk_coordinador', targetKey: 'id_coordinador' });
        CambiosUnNegocio.belongsTo(models.Clientes, { foreignKey: 'fk_cliente', targetKey: 'id_cliente' });
        CambiosUnNegocio.belongsTo(models.Circuito, { foreignKey: 'fk_circuito', targetKey: 'id_circuito' });
        CambiosUnNegocio.belongsTo(models.Usuarios, { foreignKey: 'modificado_por', targetKey: 'id_usuario' });
    };

    return CambiosUnNegocio;
}

