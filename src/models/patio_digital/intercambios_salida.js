module.exports = (sequelize, DataType) => {
    const PdIntercambiosSalida = sequelize.define('IntercambiosSalida', {
        id_intercambios_salida: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        tipo_checklist: {
            type: DataType.INTEGER
        },
        fecha_intercambio: {
            type: DataType.DATE
        },
        fecha_hora_inicio: {
            type: DataType.DATE
        },
        fecha_hora_fin: {
            type: DataType.DATE
        },
        tarjeta_iave: {
            type: DataType.BOOLEAN
        },
        foto_tarjeta_iave: {
            type: DataType.STRING(300)
        },
        cinchos: {
            type: DataType.INTEGER
        },
        malla: {
            type: DataType.INTEGER
        },
        antifaz: {
            type: DataType.INTEGER
        },
        cojin: {
            type: DataType.INTEGER
        },
        liga: {
            type: DataType.INTEGER
        },
        llave_lona: {
            type: DataType.INTEGER
        },
        barra: {
            type: DataType.INTEGER
        },
        pqs_vencimiento: {
            type: DataType.BOOLEAN
        },
        pqs_presion: {
            type: DataType.BOOLEAN
        },
        pqs_seguro: {
            type: DataType.BOOLEAN
        },
        espuma_vencimiento: {
            type: DataType.BOOLEAN
        },
        espuma_presion: {
            type: DataType.BOOLEAN
        },
        espuma_seguro: {
            type: DataType.BOOLEAN
        },
        firma_intercambista: {
            type: DataType.STRING(300)
        },
        firma_operador: {
            type: DataType.STRING(300)
        },
        observaciones: {
            type: DataType.STRING(300)
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
    }, {
        tableName: 'pd_intercambios_salida',
        timestamps: false
    });

    PdIntercambiosSalida.beforeUpdate((entrada, options) => {
        entrada.actualizado_el = sequelize.literal('CURRENT_TIMESTAMP');
    });

    PdIntercambiosSalida.associate = (models) => {
        PdIntercambiosSalida.belongsTo(models.Usuarios, { foreignKey: 'fk_usuario' });
        PdIntercambiosSalida.hasMany(models.HallazgosIntercambios, { foreignKey: 'fk_intercambios_salida', sourceKey: 'id_intercambios_salida', });
    };

    return PdIntercambiosSalida;
};
