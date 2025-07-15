module.exports = (sequelize, DataTypes) => {
    const PdAgenda = sequelize.define('Agenda', {
        id_agenda: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        base: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        turno: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        comentarios: { 
            type: DataTypes.STRING(300),
            allowNull: true
        },
        fecha_arribo_programado: {
            type: DataTypes.DATE,
            allowNull: false
        },
        horario_arribo_programado: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cumplimiento_arribo: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        creado_el: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        actualizado_el: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        fk_motivo_programacion_arribo: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fk_usuario: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'pd_agenda',
        timestamps: false
    });

    PdAgenda.beforeUpdate((agenda, options) => {
        PdAgenda.actualizado_el = sequelize.literal('CURRENT_TIMESTAMP');
    });

    PdAgenda.associate = (models) => {
        PdAgenda.hasMany(models.Reprogramaciones_arribos, { foreignKey: 'fk_agenda' });
        PdAgenda.hasOne(models.PickAndUp, { foreignKey: 'fk_agenda', as: 'pickandup' });
        PdAgenda.belongsTo(models.Motivo_programacion_arribo, { foreignKey: 'fk_motivo_programacion_arribo' });
        PdAgenda.belongsTo(models.Usuarios, { foreignKey: 'fk_usuario' });
    };

    return PdAgenda;
};
