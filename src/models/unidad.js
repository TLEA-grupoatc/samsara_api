module.exports = (sequelize, DataType) => {
    const Unidades = sequelize.define('Unidades',{
        id_unidad:{
            type: DataType.STRING,
            primaryKey: true
        },
        auxInputType1:{
            type: DataType.STRING,
            allowNull: true
        },
        auxInputType2:{
            type: DataType.STRING,
            allowNull: true
        },
        auxInputType3:{
            type: DataType.STRING,
            allowNull: true
        },
        cameraSerial:{
            type: DataType.STRING,
            allowNull: true
        },
        samsara_serial:{
            type: DataType.STRING,
            allowNull: true
        },
        samsara_vin:{
            type: DataType.STRING,
            allowNull: true
        },
        gateway_serial:{
            type: DataType.STRING,
            allowNull: true
        },
        gateway_model:{
            type: DataType.STRING,
            allowNull: true
        },
        harshAccelerationSettingType:{
            type: DataType.STRING,
            allowNull: true
        },
        licensePlate:{
            type: DataType.STRING,
            allowNull: true
        },
        make:{
            type: DataType.STRING,
            allowNull: true
        },
        model:{
            type: DataType.STRING,
            allowNull: true
        },
        name:{
            type: DataType.STRING,
            allowNull: true
        },
        notes:{
            type: DataType.STRING,
            allowNull: true
        },
        serial:{
            type: DataType.STRING,
            allowNull: true
        },
        tagid:{
            type: DataType.STRING,
            allowNull: true
        },
        tag:{
            type: DataType.STRING,
            allowNull: true
        },
        gobernada:{
            type: DataType.INTEGER,
            allowNull: true
        },
        fechagobernada:{
            type: DataType.STRING,
            allowNull: true
        },
        paromotor:{
            type: DataType.INTEGER,
            allowNull: true
        },
        fechaparomotor:{
            type: DataType.STRING,
            allowNull: true
        },
        instaladoen:{
            type: DataType.STRING,
            allowNull: true
        },
        fechacompromisopm:{
            type: DataType.STRING,
            allowNull: true
        },
        staticAssignedDriver_id:{
            type: DataType.INTEGER,
            allowNull: true
        },
        staticAssignedDriver_name:{
            type: DataType.STRING,
            allowNull: true
        },
        vin:{
            type: DataType.STRING,
            allowNull: true
        },
        year:{
            type: DataType.INTEGER,
            allowNull: true
        },
        vehicleRegulationMode:{
            type: DataType.STRING,
            allowNull: true
        },
        createdAtTime:{
            type: DataType.STRING,
            allowNull: true
        },
        updatedAtTime:{
            type: DataType.STRING,
            allowNull: true
        },
        esn:{
            type: DataType.INTEGER,
            allowNull: true
        },
        tanque:{
            type: DataType.INTEGER,
            allowNull: true
        },
        division:{
            type: DataType.INTEGER,
            allowNull: true
        },
        idcliente:{
            type: DataType.INTEGER,
            allowNull: true
        },
        idcoordinador: {
            type: DataType.INTEGER,
            allowNull: true
        },
        idcircuito: {
            type: DataType.INTEGER,
            allowNull: true
        },
        estructura: {
            type: DataType.STRING(100),  
            allowNull: true
        },
        operador: {
            type: DataType.STRING(100),  
            allowNull: true
        },
        neg_tipo: {
            type: DataType.STRING(45),  
            allowNull: true
        },
        estado:{
            type: DataType.STRING,
            allowNull: true
        },
    },
    {
        tableName: 'unidad',        
        timestamps: false
    });

    // Unidades.associate = (models) => {        
    //     Unidades.belongsToMany(models.Alertas, {
    //         foreignKey: 'id_unidad',
    //         sourceKey: 'id_unidad'
    //     });
    // }

    return Unidades;
}