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
        eventMs:{
            type: DataType.STRING,
            allowNull: true
        },
        alertEventURL:{
            type: DataType.STRING,
            allowNull: true
        },
        incidentUrl:{
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
        fecha_creacion:{
            type: DataType.DATE,
            allowNull: true
        }
    },
    {
        tableName: 'alerta',        
        timestamps: false
    });

    return Alertas;
}