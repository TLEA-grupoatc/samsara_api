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
        }
    },
    {
        tableName: 'operador',        
        timestamps: false
    });
    
    return Operadores;
}