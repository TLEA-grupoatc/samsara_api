module.exports = (sequelize, DataType) => {
    const PdEntrada = sequelize.define('Entrada', {
        id_entrada: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        fecha_entrada: {
            type: DataType.DATE
        },
        fecha_hora_inicio: {
            type: DataType.DATE
        },
        fecha_hora_fin: {
            type: DataType.DATE
        },
        alcoholimetro: {
            type: DataType.BOOLEAN,
            allowNull: false
        },
        foto_alcoholimetro: {
            type: DataType.STRING(100)
        },
        placas: {
            type: DataType.STRING(30),
            allowNull: true
        },
        rem_1: {
            type: DataType.STRING(40),
            allowNull: true
        },
        rem_2: {
            type: DataType.STRING(40),
            allowNull: true
        },
        placas_rem_1: {
            type: DataType.STRING(100),
            allowNull: true
        },
        placas_rem_2: {
            type: DataType.STRING(100),
            allowNull: true
        },
        kilometraje: {
            type: DataType.INTEGER,
            allowNull: false
        },
        tarjeta_iave: {
            type: DataType.BOOLEAN
        },
        foto_tarjeta_iave: {
            type: DataType.STRING(100)
        },
        tarjeta_ug: {
            type: DataType.BOOLEAN
        },
        foto_tarjeta_ug: {
            type: DataType.STRING(100)
        },
        comentarios: {
            type: DataType.STRING(200)
        },
        reporte_operador: {
            type: DataType.STRING(100)
        },
        check_defensa: {
            type: DataType.BOOLEAN
        },
        foto_defensa: {
            type: DataType.STRING(100)
        },
        observacion_defensa: {
            type: DataType.STRING(300)
        },
        check_motor_bateria_filtros: {
            type: DataType.BOOLEAN
        },
        foto_motor_bateria_filtros: {
            type: DataType.STRING(100)
        },
        observacion_motor_bateria_filtros: {
            type: DataType.STRING(300)
        },
        check_llantas_rines: {
            type: DataType.BOOLEAN
        },
        foto_llantas_rines: {
            type: DataType.STRING(100)
        },
        observacion_llantas_rines: {
            type: DataType.STRING(300)
        },
        check_piso_tracto: {
            type: DataType.BOOLEAN
        },
        foto_piso_tracto: {
            type: DataType.STRING(100)
        },
        observacion_piso_tracto: {
            type: DataType.STRING(300)
        },
        check_tanques_combustible: {
            type: DataType.BOOLEAN
        },
        foto_tanques_combustible: {
            type: DataType.STRING(100)
        },
        observacion_tanques_combustible: {
            type: DataType.STRING(300)
        },
        check_cabina_interior: {
            type: DataType.BOOLEAN
        },
        foto_cabina_interior: {
            type: DataType.STRING(100)
        },
        observacion_cabina_interior: {
            type: DataType.STRING(300)
        },
        check_compartimiento_herramientas: {
            type: DataType.BOOLEAN
        },
        foto_compartimiento_herramientas: {
            type: DataType.STRING(100)
        },
        observacion_compartimiento_herramientas: {
            type: DataType.STRING(300)
        },
        check_tanques_de_aire: {
            type: DataType.BOOLEAN
        },
        foto_tanques_de_aire: {
            type: DataType.STRING(100)
        },
        observacion_tanques_de_aire: {
            type: DataType.STRING(300)
        },
        check_compartimientos_baterias: {
            type: DataType.BOOLEAN
        },
        foto_compartimientos_baterias: {
            type: DataType.STRING(100)
        },
        observacion_compartimientos_baterias: {
            type: DataType.STRING(300)
        },
        check_mofles: {
            type: DataType.BOOLEAN
        },
        foto_mofles: {
            type: DataType.STRING(100)
        },
        observacion_mofles: {
            type: DataType.STRING(300)
        },
        check_quinta_rueda: {
            type: DataType.BOOLEAN
        },
        foto_quinta_rueda: {
            type: DataType.STRING(100)
        },
        observacion_quinta_rueda: {
            type: DataType.STRING(300)
        },
        check_debajo_del_chasis: {
            type: DataType.BOOLEAN
        },
        foto_debajo_del_chasis: {
            type: DataType.STRING(100)
        },
        observacion_debajo_del_chasis: {
            type: DataType.STRING(300)
        },
        check_llantas_rines_remolque: {
            type: DataType.BOOLEAN
        },
        foto_llantas_rines_remolque: {
            type: DataType.STRING(100)
        },
        observacion_llantas_rines_remolque: {
            type: DataType.STRING(300)
        },
        check_estructura_nodriza: {
            type: DataType.BOOLEAN
        },
        foto_estructura_nodriza: {
            type: DataType.STRING(100)
        },
        observacion_estructura_nodriza: {
            type: DataType.STRING(300)
        },
        check_rampas: {
            type: DataType.BOOLEAN
        },
        foto_rampas: {
            type: DataType.STRING(100)
        },
        observacion_rampas: {
            type: DataType.STRING(300)
        },
        check_caja_herramientas_remolque: {
            type: DataType.BOOLEAN
        },
        foto_caja_herramientas_remolque: {
            type: DataType.STRING(100)
        },
        observacion_caja_herramientas_remolque: {
            type: DataType.STRING(300)
        },
        check_lona: {
            type: DataType.BOOLEAN
        },
        foto_lona: {
            type: DataType.STRING(100)
        },
        observacion_lona: {
            type: DataType.STRING(300)
        },
        check_libre_de_plagas: {
            type: DataType.BOOLEAN
        },
        foto_libre_de_plagas: {
            type: DataType.STRING(100)
        },
        observacion_libre_de_plagas: {
            type: DataType.STRING(300)
        },
        check_libre_de_semillas_hojas: {
            type: DataType.BOOLEAN
        },
        foto_libre_de_semillas_hojas: {
            type: DataType.STRING(100)
        },
        observacion_libre_de_semillas_hojas: {
            type: DataType.STRING(300)
        },
        departamento_responsable: {
            type: DataType.STRING(300)
        },
        reporte_descripcion: {
            type: DataType.STRING(300)
        },
        foto_hallazgo: {
            type: DataType.STRING(100)
        },
        foto_unidad_1: {
            type: DataType.STRING(100)
        },
        foto_unidad_2: {
            type: DataType.STRING(100)
        },
        foto_unidad_3: {
            type: DataType.STRING(100)
        },
        foto_unidad_4: {
            type: DataType.STRING(100)
        },
        foto_unidad_5: {
            type: DataType.STRING(100)
        },
        foto_unidad_6: {
            type: DataType.STRING(100)
        },
        firma_guardia: {
            type: DataType.STRING(100)
        },
        firma_operador: {
            type: DataType.STRING(100)
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
        tableName: 'pd_entrada',
        timestamps: false
    });

    PdEntrada.beforeUpdate((entrada, options) => {
        PdEntrada.actualizado_el = sequelize.literal('CURRENT_TIMESTAMP');
    });

    PdEntrada.associate = (models) => {
        PdEntrada.belongsTo(models.Usuarios, { foreignKey: 'fk_usuario' });
    };

    return PdEntrada;
};
