module.exports = (sequelize, DataType) => {
    const Trips = sequelize.define('Trips',{
        idtrip: {
            type: DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }, 
        idunidad: {
            type: DataType.INTEGER,
            allowNull: true
        }, 
        startMs: {
            type: DataType.INTEGER,
            allowNull: true
        }, 
        endMs: {
            type: DataType.INTEGER,
            allowNull: true
        }, 
        startLocation: {
            type: DataType.STRING,
            allowNull: true
        }, 
        endLocation: {
            type: DataType.STRING,
            allowNull: true
        }, 
        startAddress: {
            type: DataType.STRING,
            allowNull: true
        }, 
        endAddress: {
            type: DataType.STRING,
            allowNull: true
        }, 
        startCoordinatesLat: {
            type: DataType.INTEGER,
            allowNull: true
        }, 
        startCoordinatesLon: {
            type: DataType.INTEGER,
            allowNull: true
        }, 
        endCoordinatesLat: {
            type: DataType.INTEGER,
            allowNull: true
        }, 
        endCoordinatesLon: {
            type: DataType.INTEGER,
            allowNull: true
        }, 
        distanceMeters: {
            type: DataType.INTEGER,
            allowNull: true
        }, 
        fuelConsumedMl: {
            type: DataType.INTEGER,
            allowNull: true
        }, 
        tollMeters: {
            type: DataType.INTEGER,
            allowNull: true
        }, 
        driverId: {
            type: DataType.INTEGER,
            allowNull: true
        }, 
        codriverIds: {
            type: DataType.STRING,
            allowNull: true
        }, 
        startOdometer: {
            type: DataType.INTEGER,
            allowNull: true
        }, 
        endOdometer: {
            type: DataType.INTEGER,
            allowNull: true
        }, 
        assetIds: {
            type: DataType.STRING,
            allowNull: true
        }
    },
    {
        tableName: 'trip',        
        timestamps: false
    });

    return Trips;
}