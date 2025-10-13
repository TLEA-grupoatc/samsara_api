module.exports = (sequelize, DataType) => {
    const TABLELOGS = sequelize.define('TABLELOGS',{
        id_log:{
            type: DataType.INTEGER,
            primaryKey: true
        },
        nombre_tabla:{
            type: DataType.STRING,
            allowNull: false
        },
        modulo:{
            type: DataType.STRING,
            allowNull: false
        },
        accion:{
            type: DataType.STRING,
            allowNull: false
        },
        id:{
            type: DataType.STRING,
            allowNull: false
        },
        movimiento:{
            type: DataType.STRING,
            allowNull: false
        },
        descripcion:{
            type: DataType.STRING,
            allowNull: false
        },
        valor_anterior:{
            type: DataType.STRING,
            allowNull: false
        },
        valor_nuevo:{
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
        },
        usuario_db:{
            type: DataType.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'table_logs',
        timestamps: false
    });

    return TABLELOGS;
}