module.exports = (sequelize, DataType) => {
    const OperadoresDanos = sequelize.define('OperadoresDanos',{
        id_dano_op:{
            type: DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        cliente:{
            type: DataType.STRING,
            allowNull: true
        },
        cartaporte: {
            type: DataType.STRING,
            allowNull: true
        }, 
        vin: {
            type: DataType.STRING,
            allowNull: true
        }, 
        pt: {
            type: DataType.STRING,
            allowNull: true
        }, 
        modelo_vin: {
            type: DataType.STRING,
            allowNull: true
        }, 
        posicion_vin: {
            type: DataType.STRING,
            allowNull: true
        }, 
        proceso_enque_ocurrio: {
            type: DataType.STRING,
            allowNull: true
        }, 
        causa_dano: {
            type: DataType.STRING,
            allowNull: true
        }, 
        puesto_responsable: {
            type: DataType.STRING,
            allowNull: true
        }, 
        nombre_responsable: {
            type: DataType.STRING,
            allowNull: true
        }, 
        tipo_dano: {
            type: DataType.STRING,
            allowNull: true
        }, 
        panel_danado: {
            type: DataType.STRING,
            allowNull: true
        }, 
        severidad_dano: {
            type: DataType.INTEGER,
            allowNull: true
        }, 
        fecha_dano: {
            type: DataType.STRING,
            allowNull: true
        }, 
        tipo_movimiento: {
            type: DataType.STRING,
            allowNull: true
        }, 
        economico: {
            type: DataType.STRING,
            allowNull: true
        }, 
        operador: {
            type: DataType.STRING,
            allowNull: true
        }, 
        cliente_considero_dano: {
            type: DataType.STRING,
            allowNull: true
        }, 
        clasificacion_dano: {
            type: DataType.STRING,
            allowNull: true
        },
        fecha_creacion: {
            type: DataType.STRING,
            allowNull: true
        }, 
        usuario_creacion: {
            type: DataType.STRING,
            allowNull: true
        }
    },
    {
        tableName: 'operadordanos',        
        timestamps: false
    });

    return OperadoresDanos;
}