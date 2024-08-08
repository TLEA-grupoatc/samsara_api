module.exports = (sequelize, DataType) => {
    const Alertas = sequelize.define('Alertas',{
        id_alerta:{
            type: DataType.INTEGER,
            primaryKey: true
        },
        eventId:{
            type: DataType.STRING,
            allowNull: true
        },
        eventType:{
            type: DataType.STRING,
            allowNull: true
        },
        alertConditionId:{
            type: DataType.STRING,
            allowNull: true
        },
        webhookId:{
            type: DataType.STRING,
            allowNull: true
        },
        event:{
            type: DataType.STRING,
            allowNull: true
        },
        eventDescription:{
            type: DataType.STRING,
            allowNull: true
        },
        eventTime:{
            type: DataType.STRING,
            allowNull: true
        },
        alertEventURL:{
            type: DataType.STRING,
            allowNull: true
        },
        id_unidad:{
            type: DataType.STRING,
            allowNull: true
        },
        unidad:{
            type: DataType.STRING,
            allowNull: true
        },
        estado:{
            type: DataType.STRING,
            allowNull: true
        },
        fecha_creacion:{
            type: DataType.DATE,
            allowNull: true
        },
        fecha_cierre:{
            type: DataType.DATE,
            allowNull: true
        },
        primer_interaccion:{
            type: DataType.STRING,
            allowNull: true
        },
        fechahora_interaccion:{
            type: DataType.DATE,
            allowNull: true
        }
    },
    {
        tableName: 'alerta',        
        timestamps: false
    });


    Alertas.associate = (models) => {        
        Alertas.hasMany(models.Unidades, {
            foreignKey: 'id_unidad',
            sourceKey: 'id_unidad'
        });
    }

    return Alertas;
}