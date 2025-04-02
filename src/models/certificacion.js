module.exports = (sequelize, DataType) => {
    const Rutas = sequelize.define('Rutas',{
        id_certificacion:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ruta:{
            type: DataType.STRING,
            allowNull: true
        },
        origen: {
            type: DataType.STRING,
            allowNull: true
        },
        destino: {
            type: DataType.STRING,
            allowNull: true
        },
        via: {
            type: DataType.STRING,
            allowNull: true
        },
        km_gmap: {
            type: DataType.INTEGER,
            allowNull: true
        },
        km_advan: {
            type: DataType.INTEGER,
            allowNull: true
        },
        caseta_oneway: {
            type: DataType.INTEGER,
            allowNull: true
        },
        diesel: {
            type: DataType.INTEGER,
            allowNull: true
        },
        caseta_round_trip: {
            type: DataType.INTEGER,
            allowNull: true
        },
        sueldo: {
            type: DataType.INTEGER,
            allowNull: true
        },
        gop: {
            type: DataType.INTEGER,
            allowNull: true
        },
        tarifa: {
            type: DataType.INTEGER,
            allowNull: true
        },
        rentabilidad: {
            type: DataType.INTEGER,
            allowNull: true
        },
        porcentaje_rentabilidad: {
            type: DataType.INTEGER,
            allowNull: true
        },
        seguridad: {
            type: DataType.INTEGER,
            allowNull: true
        },
        condicion_carretera: {
            type: DataType.INTEGER,
            allowNull: true
        },
        tipo_carretera: {
            type: DataType.INTEGER,
            allowNull: true
        },
        permisos: {
            type: DataType.INTEGER,
            allowNull: true
        },
        estatus_actual: {
            type: DataType.INTEGER,
            allowNull: true
        },
        estatus: {
            type: DataType.STRING,
            allowNull: true
        },
        fecha_creacion: {
            type: DataType.STRING,
            allowNull: true
        },
        usuario_creacion: {
            type: DataType.STRING,
            allowNull: true
        },
        fecha_ultima_moficacion: {
            type: DataType.STRING,
            allowNull: true
        },
        usuario_ultima_moficacion: {
            type: DataType.STRING,
            allowNull: true
        },
    },
    {
        tableName: 'certificacion_ruta',        
        timestamps: false
    });
    
    return Rutas;
}