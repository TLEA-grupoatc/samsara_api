module.exports = (sequelize, DataType) => {
    const Seguimientos = sequelize.define('Seguimientos',{
        id_seguimiento:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_alerta:{
            type: DataType.INTEGER,
            allowNull: true
        },
        nivel:{
            type: DataType.STRING,
            allowNull: true
        },
        usuario:{
            type: DataType.STRING,
            allowNull: true
        },
        evento:{
            type: DataType.STRING,
            allowNull: true
        },
        descripcionEvento:{
            type: DataType.STRING,
            allowNull: true
        },
        fechahoraEvento:{
            type: DataType.STRING,
            allowNull: true
        },
        urlEvento:{
            type: DataType.STRING,
            allowNull: true
        },
        unidad:{
            type: DataType.STRING,
            allowNull: true
        },
        accion:{
            type: DataType.STRING,
            allowNull: true
        },
        solucion:{
            type: DataType.STRING,
            allowNull: true
        },
        estado:{
            type: DataType.STRING,
            allowNull: true
        },
        fechahora_interaccion:{
            type: DataType.STRING,
            allowNull: true
        },
        fechahora:{
            type: DataType.DATE,
            allowNull: true
        }
    },
    {
        tableName: 'seguimiento',        
        timestamps: false
    });
    return Seguimientos;
}