module.exports = (sequelize, DataType) => {
    const LOGINSLOG = sequelize.define('LOGINSLOG',{
        id_login_log:{
            type: DataType.INTEGER,
            primaryKey: true
        },
        nombre:{
            type: DataType.STRING,
            allowNull: false
        },
        usuario:{
            type: DataType.STRING,
            allowNull: false
        },
        fecha:{
            type: DataType.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'login_logs',
        timestamps: false
    });

    return LOGINSLOG;
}