module.exports = (sequelize, DataType) => {
    const Prenominas = sequelize.define('Prenominas',{
        id_prenomina:{
            type: DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        operador:{
            type: DataType.STRING,
            allowNull: false
        },
        tracto:{
            type: DataType.STRING,
            allowNull: false
        },
        localidad:{
            type: DataType.STRING,
            allowNull: false
        },
        terminal:{
            type: DataType.STRING,
            allowNull: false
        },
        folio:{
            type: DataType.STRING,
            allowNull: false
        },
        checklist:{
            type: DataType.INTEGER,
            allowNull: false
        },
        firma:{
            type: DataType.INTEGER,
            allowNull: false
        },
        pago:{
            type: DataType.INTEGER,
            allowNull: false
        },
        fecha:{
            type: DataType.STRING,
            allowNull: false
        },
        usuario:{
            type: DataType.STRING,
            allowNull: false
        },
        verificado_por:{
            type: DataType.STRING,
            allowNull: true
        },
        estado:{
            type: DataType.STRING,
            allowNull: true
        }
    },
    {
        tableName: 'prenomina',        
        timestamps: false
    });

    return Prenominas;
}