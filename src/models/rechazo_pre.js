module.exports = (sequelize, DataType) => {
    const RechazoPrenominas = sequelize.define('RechazoPrenominas',{
        id_rechazo_pre:{
            type: DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_prenomina:{
            type: DataType.STRING,
            allowNull: true
        },
        fecha:{
            type: DataType.STRING,
            allowNull: true
        },
        operador:{
            type: DataType.STRING,
            allowNull: true
        },
        tracto:{
            type: DataType.STRING,
            allowNull: true
        },
        unidad_negocio:{
            type: DataType.STRING,
            allowNull: true
        },
        prenominista:{
            type: DataType.STRING,
            allowNull: true
        },
        incidencia:{
            type: DataType.STRING,
            allowNull: true
        },
        auditor:{
            type: DataType.STRING,
            allowNull: true
        },
        familia:{
            type: DataType.STRING,
            allowNull: true
        },
        subfamilia:{
            type: DataType.STRING,
            allowNull: true
        }
    },
    {
        tableName: 'rechazodeprenominas',        
        timestamps: false
    });

    return RechazoPrenominas;
}