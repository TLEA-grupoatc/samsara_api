module.exports = (sequelize, DataType) => {
    const MotivoArribo = sequelize.define('Motivo_programacion_arribo', {
        id_motivo_programacion_arribo:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        motivo: {
            type: DataType.STRING(100),
            allowNull: true,
        }
    },{
        tableName: 'pd_motivo_programacion_arribo',
        timestamps: false
    });

    // MotivoArribo.associate = (models) => {
    //     MotivoArribo.hasOne(models.Agenda, { foreignKey: 'fk_motivo_programacion_arribo', as: 'motivo_programacion_arribo' });
    // };
    
    return MotivoArribo;
}