module.exports = (sequelize, DataType) => {
    const ParosDeMotor = sequelize.define('ParosDeMotor',{
        id_paromotor:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_evento:{
            type: DataType.INTEGER,
            allowNull: true
        },
        unidad_denegocio:{
            type: DataType.STRING,
            allowNull: true
        },
        unidad:{
            type: DataType.STRING,
            allowNull: true
        },
        motivo:{
            type: DataType.STRING,
            allowNull: true
        },
        ubicacion:{
            type: DataType.STRING,
            allowNull: true
        },
        corte_deaceleracion:{
            type: DataType.STRING,
            allowNull: true
        },
        fecha:{
            type: DataType.STRING,
            allowNull: true
        },
        hora:{
            type: DataType.STRING,
            allowNull: true
        },
        quien_solicita:{
            type: DataType.STRING,
            allowNull: true
        },
        latitud:{
            type: DataType.STRING,
            allowNull: true
        },
        longitud:{
            type: DataType.STRING,
            allowNull: true
        },
        c4:{
            type: DataType.STRING,
            allowNull: true
        },
        operaciones:{
            type: DataType.STRING,
            allowNull: true
        },
        turno:{
            type: DataType.STRING,
            allowNull: true
        },
        estado:{
            type: DataType.STRING,
            allowNull: true
        }
    },
    {
        tableName: 'paros_demotor',        
        timestamps: false
    });
    
    return ParosDeMotor;
}