module.exports = (sequelize, DataType) => {
    const UnidadesConvoy = sequelize.define('UnidadesConvoy',{
        id_unidadconvoy:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_convoy:{
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
        tableName: 'unidad_convoys',        
        timestamps: false
    });
    
    return UnidadesConvoy;
}