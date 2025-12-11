module.exports = (sequelize, DataType) => {
    const ReseteoSamsaraXHora = sequelize.define('ReseteoSamsaraXHora',{
        id_reseteo:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_samsara:{
            type: DataType.STRING,
            allowNull: true
        },
        economico:{
            type: DataType.STRING,
            allowNull: true
        }, 
        dieselml:{
            type: DataType.FLOAT,
            allowNull: true
        }, 
        diesel:{
            type: DataType.FLOAT,
            allowNull: true
        }, 
        kmm:{
            type: DataType.FLOAT,
            allowNull: true
        }, 
        km:{
            type: DataType.FLOAT,
            allowNull: true
        }, 
        direccion:{
            type: DataType.STRING,
            allowNull: true
        }, 
        geocerca:{
            type: DataType.STRING,
            allowNull: true
        }, 
        ultimoreseteo:{
            type: DataType.STRING,
            allowNull: true
        }, 
        fecha_inicio:{
            type: DataType.STRING,
            allowNull: true
        }, 
        fecha_fin:{
            type: DataType.STRING,
            allowNull: true
        }, 
        fecha_creacion:{
            type: DataType.STRING,
            allowNull: true
        }
    },
    {
        tableName: 'reseteosamsaraxhora',        
        timestamps: false
    });
    
    return ReseteoSamsaraXHora;
}