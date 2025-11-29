module.exports = (sequelize, DataType) => {
    const ReseteoSamsara = sequelize.define('ReseteoSamsara',{
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
        diesel:{
            type: DataType.FLOAT,
            allowNull: true
        }, 
        km:{
            type: DataType.FLOAT,
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
        tableName: 'resetoSamsara',        
        timestamps: false
    });
    
    return ReseteoSamsara;
}