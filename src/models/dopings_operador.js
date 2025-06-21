module.exports = (sequelize, DataType) => {
    const DopingsOperadores = sequelize.define('DopingsOperadores',{
        id_doping:{
            type: DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        operador:{
            type: DataType.STRING,
            allowNull: true
        },
        fecha:{
            type: DataType.STRING,
            allowNull: true
        },
        evidencia:{
            type: DataType.STRING,
            allowNull: false
        },
        fecha_creacion:{
            type: DataType.STRING,
            allowNull: false
        },
        usuario_creacion:{
            type: DataType.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'operadordoping',        
        timestamps: false
    });

    return DopingsOperadores;
}