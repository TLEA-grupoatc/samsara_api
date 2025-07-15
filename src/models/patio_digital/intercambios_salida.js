module.exports = (sequelize, DataType) => {
    const PdIntercambiosSalida = sequelize.define('IntercambiosSalida', {
        id_intercambios_salida:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },

        creado_el: {
            type: DataType.DATE,
            allowNull: false,
            defaultValue: DataType.NOW
        },
        actualizado_el: {
            type: DataType.DATE,
            allowNull: false,
            defaultValue: DataType.NOW
        },
        fk_usuario: {
            type: DataType.INTEGER
        }
    },{
        tableName: 'pd_intercambios_salida',
        timestamps: false
    });

    PdIntercambiosSalida.beforeUpdate((entrada, options) => {
        PdIntercambiosSalida.actualizado_el = sequelize.literal('CURRENT_TIMESTAMP');
    });

    PdIntercambiosSalida.associate = (models) => {
        PdIntercambiosSalida.belongsTo(models.Usuarios, { foreignKey: 'fk_usuario' });
    };
    
    return PdIntercambiosSalida;
}
