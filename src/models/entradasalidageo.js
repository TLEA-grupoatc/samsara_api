module.exports = (sequelize, DataType) => {
    const EntradaSalidaGeocerca = sequelize.define('EntradaSalidaGeocerca',{
        entsalgeo:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        operador:{
            type: DataType.STRING,
            allowNull: true
        },
        tracto:{
            type: DataType.STRING,
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
        enlace:{
            type: DataType.STRING,
            allowNull: true
        },
        entrada:{
            type: DataType.STRING,
            allowNull: true
        },
        salida:{
            type: DataType.STRING,
            allowNull: true
        },
        fecha:{
            type: DataType.STRING,
            allowNull: true
        },
        fecha_creacion:{
            type: DataType.STRING,
            allowNull: true
        }
    },
    {
        tableName: 'entradasalidageo',        
        timestamps: false
    });
    
    return EntradaSalidaGeocerca;
}