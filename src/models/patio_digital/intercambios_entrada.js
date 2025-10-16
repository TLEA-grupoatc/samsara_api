module.exports = (sequelize, DataType) => {
    const PdIntercambiosEntrada = sequelize.define('IntercambiosEntrada', {
        id_intercambios_entrada: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        tipo_checklist: {
            type: DataType.INTEGER,
            allowNull: true
        },
        fecha_intercambio: {
            type: DataType.DATE,
            allowNull: true
        },
        fecha_hora_inicio: {
            type: DataType.DATE,
            allowNull: true
        },
        fecha_hora_fin: {
            type: DataType.DATE,
            allowNull: true
        },
        tarjeta_iave: {
            type: DataType.BOOLEAN,
            allowNull: true
        },
        foto_tarjeta_iave: {
            type: DataType.STRING(300),
            allowNull: true
        },
        cinchos: {
            type: DataType.INTEGER,
            allowNull: true
        },
        malla: {
            type: DataType.INTEGER,
            allowNull: true
        },
        antifaz: {
            type: DataType.INTEGER,
            allowNull: true
        },
        cojin: {
            type: DataType.INTEGER,
            allowNull: true
        },
        liga: {
            type: DataType.INTEGER,
            allowNull: true
        },
        llave_lona: {
            type: DataType.INTEGER,
            allowNull: true
        },
        barra: {
            type: DataType.INTEGER,
            allowNull: true
        },
        pqs_vencimiento: {
            type: DataType.BOOLEAN,
            allowNull: true
        },
        pqs_presion: {
            type: DataType.BOOLEAN,
            allowNull: true
        },
        pqs_seguro: {
            type: DataType.BOOLEAN,
            allowNull: true
        },
        espuma_vencimiento: {
            type: DataType.BOOLEAN,
            allowNull: true
        },
        espuma_presion: {
            type: DataType.BOOLEAN,
            allowNull: true
        },
        espuma_seguro: {
            type: DataType.BOOLEAN,
            allowNull: true
        },
        firma_intercambista: {
            type: DataType.STRING(300),
            allowNull: true
        },
        firma_operador: {
            type: DataType.STRING(300),
            allowNull: true
        },
        observaciones: {
            type: DataType.STRING(300),
            allowNull: true
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
            type: DataType.INTEGER,
            allowNull: true
        }
    }, {
        tableName: 'pd_intercambios_entrada',
        timestamps: false
    });

    PdIntercambiosEntrada.beforeUpdate((entrada, options) => {
        PdIntercambiosEntrada.actualizado_el = sequelize.literal('CURRENT_TIMESTAMP');
    });

    PdIntercambiosEntrada.associate = (models) => {
        PdIntercambiosEntrada.belongsTo(models.Usuarios, { foreignKey: 'fk_usuario' });
        PdIntercambiosEntrada.hasMany(models.HallazgosIntercambios, { foreignKey: 'fk_intercambios_entrada', sourceKey: 'id_intercambios_entrada', });

    };
    
    return PdIntercambiosEntrada;
}
