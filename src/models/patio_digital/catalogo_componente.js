module.exports = (sequelize, DataType) => {
    const PdCatalogoComponente = sequelize.define('CatalogoComponente', {
        id_componente: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre_componente: {
            type: DataType.STRING(100),
            allowNull: false,
        },
        activo: {
            type: DataType.INTEGER,
            defaultValue: 1
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
        fk_familia: {
            type: DataType.INTEGER
        },
        fk_usuario_cre: {
            type: DataType.INTEGER
        },
        fk_usuario_act: {
            type: DataType.INTEGER
        }
    },{
        tableName: 'pd_catalogo_componente',
        timestamps: false
    });

    PdCatalogoComponente.beforeUpdate((componente, options) => {
        PdCatalogoComponente.actualizado_el = sequelize.literal('CURRENT_TIMESTAMP');
    });

    PdCatalogoComponente.associate = (models) => {
        PdCatalogoComponente.belongsTo(models.CatalogoFamilia, {
            foreignKey: 'fk_familia',
            targetKey: 'id_familia'
        });
        PdCatalogoComponente.belongsTo(models.Usuarios, { foreignKey: 'fk_usuario_cre' });
        PdCatalogoComponente.belongsTo(models.Usuarios, { foreignKey: 'fk_usuario_act' });
    };
    
    return PdCatalogoComponente;
}