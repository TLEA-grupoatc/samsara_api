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
        id_unidad:{
            type: DataType.STRING,
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
            type: DataType.STRING,
            allowNull: true
        },
        fecha_entrada_a:{
            type: DataType.DATE,
            allowNull: true
        },
        fecha_salida_a:{
            type: DataType.DATE,
            allowNull: true
        },
        fecha_llegada_b:{
            type: DataType.DATE,
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