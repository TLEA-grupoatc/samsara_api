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
        comentarios: {
            type: DataType.STRING,
            allowNull: true
        },
        tracto_titular: {
            type: DataType.STRING,
            allowNull: true
        },
        tracto_actual: {
            type: DataType.STRING,
            allowNull: true
        },
        conflictivo: {
            type: DataType.INTEGER,
            allowNull: true
        },
        experiencia: {
            type: DataType.INTEGER,
            allowNull: true
        },
        clase: {
            type: DataType.INTEGER,
            allowNull: true
        },
        registrado_por: {
            type: DataType.STRING,
            allowNull: true
        },
        fecha_actividad: {
            type: DataType.STRING,
            allowNull: true
        }
    },
    {
        tableName: 'operador',        
        timestamps: false
    });
    Operadores.associate = (models) => {
        Operadores.hasMany(models.HistoricoOperadores, {
            foreignKey: 'numero_empleado',
            targetKey: 'numero_empleado',
            as: 'historicooperadores'
        });
    };
    
    return Operadores;
}