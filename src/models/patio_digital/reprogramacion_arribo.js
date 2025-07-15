module.exports = (sequelize, DataType) => {
    const PdReprogramacionArribo = sequelize.define('Reprogramaciones_arribos', {
        id_reprogramacion_arribo: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        fecha_arribo_reprogramado: {
            type: DataType.DATE,
            allowNull: false
        },
        horario_arribo_reprogramado: {
            type: DataType.INTEGER,
            allowNull: false
        },
        causa_reprogramacion: {
            type: DataType.STRING(255),
            allowNull: true,
            defaultValue: null
        },
        cumplimiento_arribo_reprogramacion: {
            type: DataType.STRING(100),
            allowNull: true,
            defaultValue: null
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
        fk_agenda: {
            type: DataType.INTEGER,
            allowNull: false,
        }
    }, {
        tableName: 'pd_reprogramaciones_arribos',
        timestamps: false
    });

    PdReprogramacionArribo.beforeUpdate((reprogramacion_arribo, options) => {
        PdReprogramacionArribo.actualizado_el = sequelize.literal('CURRENT_TIMESTAMP');
    });

    PdReprogramacionArribo.associate = function(models) {
        PdReprogramacionArribo.belongsTo(models.Agenda, { foreignKey: 'fk_agenda' });
    };

    return PdReprogramacionArribo;
}