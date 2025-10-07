module.exports = (sequelize, DataType) => {
    const PdCatalogoFamilia = sequelize.define('CatalogoFamilia', {
        id_familia: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre_familia: {
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
        fk_usuario_cre: {
            type: DataType.INTEGER
        },
        fk_usuario_act: {
            type: DataType.INTEGER
        }
    },{
        tableName: 'pd_catalogo_familia',
        timestamps: false
    });

    PdCatalogoFamilia.beforeUpdate((entrada, options) => {
        PdCatalogoFamilia.actualizado_el = sequelize.literal('CURRENT_TIMESTAMP');
    });

    PdCatalogoFamilia.associate = (models) => {
        PdCatalogoFamilia.hasMany(models.CatalogoComponente, {
            foreignKey: 'fk_familia',
            sourceKey: 'id_familia'
        });
        PdCatalogoFamilia.belongsTo(models.Usuarios, { foreignKey: 'fk_usuario_cre' });
        PdCatalogoFamilia.belongsTo(models.Usuarios, { foreignKey: 'fk_usuario_act' });
    };
    
    return PdCatalogoFamilia;
}