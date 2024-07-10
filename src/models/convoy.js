module.exports = (sequelize, DataType) => {
    const Convoys = sequelize.define('Convoys',{
        id_convoy:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre:{
            type: DataType.STRING,
            allowNull: true
        },
        comienza:{
            type: DataType.STRING,
            allowNull: true
        },
        termina:{
            type: DataType.STRING,
            allowNull: true
        },
        unidades:{
            type: DataType.INTEGER,
            allowNull: true
        },
        registro:{
            type: DataType.STRING,
            allowNull: true
        },
        registrado_por:{
            type: DataType.STRING,
            allowNull: true
        },
        estado:{
            type: DataType.STRING,
            allowNull: true
        }
    },
    {
        tableName: 'convoy',        
        timestamps: false
    });
    
    return Convoys;
}