module.exports = (sequelize, DataTypes) => {
    const PdPickAndUp = sequelize.define('PickAndUp', {
        idpickandup: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        base: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        unidad: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        operador: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        estatus: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        division: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        unidad_negocio: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        cargado: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        autorizacion_salida_con_omision: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        creado_el: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        actualizado_el: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        fk_cliente: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        fk_agenda: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        fk_entrada: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        fk_evidencias: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        fk_inspeccion_entrada: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        fk_inspeccion_salida: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        fk_salida: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        fk_usuario: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        fk_usuario_auto_salida_omision: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        fk_intercambios_entrada: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        fk_omision_intercambios_entrada: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        fk_omision_inspeccion_entrada: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        fk_omision_mantenimiento: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        fk_omision_inspeccion_salida: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        fk_omision_intercambios_salida: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    }, {
        tableName: 'pd_pickandup',
        timestamps: false
    });

    PdPickAndUp.beforeUpdate((pickandup, options) => {
        PdPickAndUp.actualizado_el = sequelize.literal('CURRENT_TIMESTAMP');
    });

    PdPickAndUp.associate = function(models) {
        PdPickAndUp.belongsTo(models.Clientes, { foreignKey: 'fk_cliente' });
        PdPickAndUp.belongsTo(models.Usuarios, { foreignKey: 'fk_usuario' });
        PdPickAndUp.belongsTo(models.Usuarios, { foreignKey: 'fk_usuario_auto_salida_omision', as: 'UsuarioAutoSalidaOmision' });
        PdPickAndUp.belongsTo(models.Agenda, { foreignKey: 'fk_agenda' });
        PdPickAndUp.belongsTo(models.Entrada, { foreignKey: 'fk_entrada' });
        PdPickAndUp.belongsTo(models.IntercambiosEntrada, { foreignKey: 'fk_intercambios_entrada' });
        PdPickAndUp.belongsTo(models.InspeccionEntrada, { foreignKey: 'fk_inspeccion_entrada', sourceKey: 'id_inspeccion_entrada' });
        PdPickAndUp.belongsTo(models.InspeccionSalida, { foreignKey: 'fk_inspeccion_salida', sourceKey: 'id_inspeccion_salida' });
        PdPickAndUp.belongsTo(models.Evidencias, { foreignKey: 'fk_evidencias' });
        PdPickAndUp.belongsTo(models.IntercambiosSalida, { foreignKey: 'fk_intercambios_salida' });
        PdPickAndUp.belongsTo(models.Salida, { foreignKey: 'fk_salida' });
    };

    return PdPickAndUp;
};
