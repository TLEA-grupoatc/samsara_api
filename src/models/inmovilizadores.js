module.exports = (sequelize, DataType) => {
    const ReporteInmovilizadores = sequelize.define('ReporteInmovilizadores',{
        id_reporte:{
            type: DataType.INTEGER,
            primaryKey: true
        },
        id_samsara:{
            type: DataType.INTEGER,
            allowNull: false
        },
        economico: {
            type: DataType.STRING,
            allowNull: false
        },
        estaconectado: {
            type: DataType.BOOLEAN,
            allowNull: false
        },
        relay_uno: {
            type: DataType.BOOLEAN,
            allowNull: false
        },
        relay_dos: {
            type: DataType.BOOLEAN,
            allowNull: false
        },
        geocerca: {
            type: DataType.STRING,
            allowNull: false
        },
        direccion: {
            type: DataType.STRING,
            allowNull: false
        },
        fecha: {
            type: DataType.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'reporteInmovilizadores',        
        timestamps: false
    });

    return ReporteInmovilizadores;
}