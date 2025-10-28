module.exports = (sequelize, DataType) => {
    const ComentariosItinerarios = sequelize.define('ComentariosItinerarios',{
        id_ci:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_itinerarios:{
            type: DataType.INTEGER,
            allowNull: true
        },
        comentarios:{
            type: DataType.STRING,
            allowNull: true
        },
        usuario:{
            type: DataType.STRING,
            allowNull: true
        },
        fecha_creacion:{
            type: DataType.DATE,
            allowNull: true
        }
    },
    {
        tableName: 'ComentariosItinerarios',        
        timestamps: false
    });
    
    ComentariosItinerarios.associate = (models) => {
        ComentariosItinerarios.belongsTo(models.Itinerarios, {
            foreignKey: 'id_itinerarios',
            targetKey: 'id_itinerarios'
        });
    };

    return ComentariosItinerarios;
}