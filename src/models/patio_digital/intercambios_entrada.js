module.exports = (sequelize, DataType) => {
    const PdIntercambiosEntrada = sequelize.define('IntercambiosEntrada', {
        id_intercambios_entrada:{
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
        tableName: 'pd_intercambios_entrada',
        timestamps: false
    });

    PdIntercambiosEntrada.beforeUpdate((entrada, options) => {
        PdIntercambiosEntrada.actualizado_el = sequelize.literal('CURRENT_TIMESTAMP');
    });

    PdIntercambiosEntrada.associate = (models) => {
        PdIntercambiosEntrada.belongsTo(models.Usuarios, { foreignKey: 'fk_usuario' });
    };
    
    return PdIntercambiosEntrada;
}
