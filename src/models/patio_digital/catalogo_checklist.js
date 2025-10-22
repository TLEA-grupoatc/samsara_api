module.exports = (sequelize, DataType) => {
    const PdCatalogoChecklist = sequelize.define('CatalogoChecklist', {
        id_check: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre_checklist: {
            type: DataType.STRING(100),
            allowNull: true,
        },
        descripcion_check: {
            type: DataType.STRING(300),
            allowNull: true,
        },
        estandar: {
            type: DataType.STRING(300),
            allowNull: true,
        },
        requiere_posiciones: {
            type: DataType.BOOLEAN,
        },
        tipo_checklist: {
            type: DataType.INTEGER,
        },
        documento_checklist: {
            type: DataType.STRING(100),
            allowNull: true,
        },
        activo: {
            type: DataType.INTEGER,
        },
        posicion: {
            type: DataType.INTEGER,
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
        fk_componente: {
            type: DataType.INTEGER
        },
        fk_usuario_cre: {
            type: DataType.INTEGER
        },
        fk_usuario_act: {
            type: DataType.INTEGER
        }
    },{
        tableName: 'pd_catalogo_checklist',
        timestamps: false
    });

    PdCatalogoChecklist.beforeUpdate((entrada, options) => {
        PdCatalogoChecklist.actualizado_el = sequelize.literal('CURRENT_TIMESTAMP');
    });

    PdCatalogoChecklist.associate = (models) => {
        PdCatalogoChecklist.belongsTo(models.CatalogoComponente, { foreignKey: 'fk_componente' });
        PdCatalogoChecklist.belongsTo(models.Usuarios, { foreignKey: 'fk_usuario_cre' });
        PdCatalogoChecklist.belongsTo(models.Usuarios, { foreignKey: 'fk_usuario_act' });
    };
    
    return PdCatalogoChecklist;
}