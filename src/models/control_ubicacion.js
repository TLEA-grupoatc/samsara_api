module.exports = (sequelize, DataType) => {
    const ControlUbicaciones = sequelize.define('ControlUbicaciones',{
        id_cu:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        division:{
            type: DataType.INTEGER,
            allowNull: true
        },
        unidad:{
            type: DataType.STRING,
            allowNull: true
        },
        operador:{
            type: DataType.STRING,
            allowNull: true
        },
        cliente:{
            type: DataType.INTEGER,
            allowNull: true
        },
        origen:{
            type: DataType.STRING,
            allowNull: true
        },
        destino:{
            type: DataType.INTEGER,
            allowNull: true
        },
        estatus:{
            type: DataType.STRING,
            allowNull: true
        },
        plancarga:{
            type: DataType.STRING,
            allowNull: true
        },
        ubicacion1:{
            type: DataType.STRING,
            allowNull: true
        },
        ubicacion2:{
            type: DataType.STRING,
            allowNull: true
        },
        ubicacion3:{
            type: DataType.STRING,
            allowNull: true
        },
        ubicacion4:{
            type: DataType.STRING,
            allowNull: true
        },
        ubicacion5:{
            type: DataType.STRING,
            allowNull: true
        },
        ubicacion6:{
            type: DataType.STRING,
            allowNull: true
        },
        ubicacion7:{
            type: DataType.STRING,
            allowNull: true
        },
        ubicacion8:{
            type: DataType.STRING,
            allowNull: true
        },
        ubicacion9:{
            type: DataType.STRING,
            allowNull: true
        },
        ubicacion10:{
            type: DataType.STRING,
            allowNull: true
        },
        ubicacion11:{
            type: DataType.STRING,
            allowNull: true
        },
        ubicacion12:{
            type: DataType.STRING,
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
        tableName: 'controlubicaciones',        
        timestamps: false
    });
    
    return ControlUbicaciones;
}