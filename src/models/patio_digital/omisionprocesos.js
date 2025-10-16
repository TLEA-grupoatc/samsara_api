module.exports = (sequelize, DataType) => {
    const PdOmisionProceso = sequelize.define('OmisionProcesos', {
        id_omision_proceso:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        modulo: {
            type: DataType.STRING(100),
            allowNull: true,
        },
        autorizo: {
            type: DataType.STRING(150),
            allowNull: true,
        },
        comentario: {
            type: DataType.STRING(300),
            allowNull: true,
        },
        evidencia_autorizacion: {
            type: DataType.STRING(300),
            allowNull: true,
        },
        usr_omision: {
            type: DataType.INTEGER,
            allowNull: true,
        },
    },{
        tableName: 'pd_omision_proceso',
        timestamps: false
    });

    PdOmisionProceso.associate = (models) => {
        PdOmisionProceso.belongsTo(models.Usuarios, { foreignKey: 'usr_omision' });
    };
    
    return PdOmisionProceso;
}
