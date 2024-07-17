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
        caseta:{
            type: DataType.STRING,
            allowNull: true
        },
        fecha:{
            type: DataType.DATE,
            allowNull: true
        },
        horario:{
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