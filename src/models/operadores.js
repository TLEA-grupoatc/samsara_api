module.exports = (sequelize, DataType) => {
    const Operadores = sequelize.define('Operadores',{
        id_operador: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        unidad: {
            type: DataType.STRING,
            allowNull: true
        },
        numero_empleado: {
            type: DataType.INTEGER,
            allowNull: true
        },
        nombre: {
            type: DataType.STRING,
            allowNull: true
        },
        estado: {
            type: DataType.STRING,
            allowNull: true
        },
        estado_actividad: {
            type: DataType.STRING,
            allowNull: true
        },
        registrado_por: {
            type: DataType.STRING,
            allowNull: true
        },
        fecha_actividad: {
            type: DataType.STRING,
            allowNull: true
        },


//         ALTER TABLE `samsara`.`operador` 
// ADD COLUMN `fecha_actividad` VARCHAR(45) NULL AFTER `registrado_por`;


// DROP TRIGGER IF EXISTS `samsara`.`operador_AFTER_UPDATE`;

// DELIMITER $$
// USE `samsara`$$
// CREATE TRIGGER `operador_AFTER_UPDATE` AFTER UPDATE ON `operador` FOR EACH ROW BEGIN
// 	INSERT INTO historico_actividad_op (numero_empleado, unidad, nombre, estado, actividad, fecha, usuario) 
//     VALUES (NEW.numero_empleado, NEW.unidad, NEW.nombre, NEW.estado, NEW.estado_actividad, NEW.fecha_actividad, NEW.registrado_por);
// END$$
// DELIMITER ;

    },
    {
        tableName: 'operador',        
        timestamps: false
    });
    
    return Operadores;
}