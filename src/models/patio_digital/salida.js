module.exports = (sequelize, DataType) => {
    const PdSalida = sequelize.define('Salida', {
        id_salida: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        fecha_salida: {
            type: DataType.DATE,
            allowNull: true
        },
        estatus: {
            type: DataType.STRING(100),
            allowNull: false
        },
        fecha_hora_inicio: {
            type: DataType.DATE,
            allowNull: false
        },
        fecha_hora_fin: {
            type: DataType.DATE,
            allowNull: false
        },
        operador: {
            type: DataType.STRING(100),
            allowNull: true
        },
        comentarios: {
            type: DataType.STRING(300),
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
        departamento_responsable: {
            type: DataType.STRING(100),
            allowNull: true
        },
        reporte_descripcion: {
            type: DataType.STRING(300),
            allowNull: true
        },
        foto_hallazgo: {
            type: DataType.STRING(100),
            allowNull: true
        },
        check_defensa: {
            type: DataType.BOOLEAN,
            allowNull: true
        },
        foto_defensa: {
            type: DataType.STRING(100),
            allowNull: true
        },
        observacion_defensa: {
            type: DataType.STRING(300),
            allowNull: true
        },
        check_motor_bateria_filtros: {
            type: DataType.BOOLEAN,
            allowNull: true
        },
        foto_motor_bateria_filtros: {
            type: DataType.STRING(100),
            allowNull: true
        },
        observacion_motor_bateria_filtros: {
            type: DataType.STRING(300),
            allowNull: true
        },
        check_llantas_rines: {
            type: DataType.BOOLEAN,
            allowNull: true
        },
        foto_llantas_rines: {
            type: DataType.STRING(100),
            allowNull: true
        },
        observacion_llantas_rines: {
            type: DataType.STRING(300),
            allowNull: true
        },
        check_piso_tracto: {
            type: DataType.BOOLEAN,
            allowNull: true
        },
        foto_piso_tracto: {
            type: DataType.STRING(100),
            allowNull: true
        },
        observacion_piso_tracto: {
            type: DataType.STRING(300),
            allowNull: true
        },
        check_tanques_combustible: {
            type: DataType.BOOLEAN,
            allowNull: true
        },
        foto_tanques_combustible: {
            type: DataType.STRING(100),
            allowNull: true
        },
        observacion_tanques_combustible: {
            type: DataType.STRING(300),
            allowNull: true
        },
        check_cabina_interior: {
            type: DataType.BOOLEAN,
            allowNull: true
        },
        foto_cabina_interior: {
            type: DataType.STRING(100),
            allowNull: true
        },
        observacion_cabina_interior: {
            type: DataType.STRING(300),
            allowNull: true
        },
        check_compartimiento_herramientas: {
            type: DataType.BOOLEAN,
            allowNull: true
        },
        foto_compartimiento_herramientas: {
            type: DataType.STRING(100),
            allowNull: true
        },
        observacion_compartimiento_herramientas: {
            type: DataType.STRING(300),
            allowNull: true
        },
        check_tanques_de_aire: {
            type: DataType.BOOLEAN,
            allowNull: true
        },
        foto_tanques_de_aire: {
            type: DataType.STRING(100),
            allowNull: true
        },
        observacion_tanques_de_aire: {
            type: DataType.STRING(300),
            allowNull: true
        },
        check_compartimientos_baterias: {
            type: DataType.BOOLEAN,
            allowNull: true
        },
        foto_compartimientos_baterias: {
            type: DataType.STRING(100),
            allowNull: true
        },
        observacion_compartimientos_baterias: {
            type: DataType.STRING(300),
            allowNull: true
        },
        check_mofles: {
            type: DataType.BOOLEAN,
            allowNull: true
        },
        foto_mofles: {
            type: DataType.STRING(100),
            allowNull: true
        },
        observacion_mofles: {
            type: DataType.STRING(300),
            allowNull: true
        },
        check_quinta_rueda: {
            type: DataType.BOOLEAN,
            allowNull: true
        },
        foto_quinta_rueda: {
            type: DataType.STRING(100),
            allowNull: true
        },
        observacion_quinta_rueda: {
            type: DataType.STRING(300),
            allowNull: true
        },
        check_debajo_del_chasis: {
            type: DataType.BOOLEAN,
            allowNull: true
        },
        foto_debajo_del_chasis: {
            type: DataType.STRING(100),
            allowNull: true
        },
        observacion_debajo_del_chasis: {
            type: DataType.STRING(300),
            allowNull: true
        },
        check_llantas_rines_remolque: {
            type: DataType.BOOLEAN,
            allowNull: true
        },
        foto_llantas_rines_remolque: {
            type: DataType.STRING(100),
            allowNull: true
        },
        observacion_llantas_rines_remolque: {
            type: DataType.STRING(300),
            allowNull: true
        },
        check_estructura_nodriza: {
            type: DataType.BOOLEAN,
            allowNull: true
        },
        foto_estructura_nodriza: {
            type: DataType.STRING(100),
            allowNull: true
        },
        observacion_estructura_nodriza: {
            type: DataType.STRING(300),
            allowNull: true
        },
        check_rampas: {
            type: DataType.BOOLEAN,
            allowNull: true
        },
        foto_rampas: {
            type: DataType.STRING(100),
            allowNull: true
        },
        observacion_rampas: {
            type: DataType.STRING(300),
            allowNull: true
        },
        check_caja_herramientas_remolque: {
            type: DataType.BOOLEAN,
            allowNull: true
        },
        foto_caja_herramientas_remolque: {
            type: DataType.STRING(100),
            allowNull: true
        },
        observacion_caja_herramientas_remolque: {
            type: DataType.STRING(300),
            allowNull: true
        },
        check_lona: {
            type: DataType.BOOLEAN,
            allowNull: true
        },
        foto_lona: {
            type: DataType.STRING(100),
            allowNull: true
        },
        observacion_lona: {
            type: DataType.STRING(300),
            allowNull: true
        },
        check_libre_de_plagas: {
            type: DataType.BOOLEAN,
            allowNull: true
        },
        foto_libre_de_plagas: {
            type: DataType.STRING(100),
            allowNull: true
        },
        observacion_libre_de_plagas: {
            type: DataType.STRING(300),
            allowNull: true
        },
        check_libre_de_semillas_hojas: {
            type: DataType.BOOLEAN,
            allowNull: true
        },
        foto_libre_de_semillas_hojas: {
            type: DataType.STRING(100),
            allowNull: true
        },
        observacion_libre_de_semillas_hojas: {
            type: DataType.STRING(300),
            allowNull: true
        },
        foto_unidad_1: {
            type: DataType.STRING(100),
            allowNull: true
        },
        foto_unidad_2: {
            type: DataType.STRING(100),
            allowNull: true
        },
        foto_unidad_3: {
            type: DataType.STRING(100),
            allowNull: true
        },
        foto_unidad_4: {
            type: DataType.STRING(100),
            allowNull: true
        },
        foto_unidad_5: {
            type: DataType.STRING(100),
            allowNull: true
        },
        foto_unidad_6: {
            type: DataType.STRING(100),
            allowNull: true
        },
        autorizacion_salida_con_hallazgo: {
            type: DataType.BOOLEAN,
            allowNull: true
        },
        firma_guardia: {
            type: DataType.STRING(100),
            allowNull: true
        },
        firma_operador: {
            type: DataType.STRING(100),
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
            allowNull: true,
        },
        fk_usuario_auto_salida_hallazgo: {
            type: DataType.INTEGER,
            allowNull: true,
        },
    }, {
        tableName: 'pd_salida',
        timestamps: false
    });

    PdSalida.beforeUpdate((salida, options) => {
        PdSalida.actualizado_el = sequelize.literal('CURRENT_TIMESTAMP');
    });

    PdSalida.associate = (models) => {
        PdSalida.belongsTo(models.Usuarios, { foreignKey: 'fk_usuario' });
        PdSalida.belongsTo(models.Usuarios, { foreignKey: 'fk_usuario_auto_salida_hallazgo', as: 'UsuarioAutoSalidaHallazgo' });
    };

    return PdSalida;
};
