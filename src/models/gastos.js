module.exports = (sequelize, DataType) => {
    const SolicitudGastos = sequelize.define('SolicitudGastos',{
        id_gastos: {
            type: DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        fecha_solicitud: {
            type: DataType.STRING,
            allowNull: false
        },
        solicitante: {
            type: DataType.STRING,
            allowNull: true
        }, 
        unidad_negocio: {
            type: DataType.STRING,
            allowNull: true
        }, 
        folio: {
            type: DataType.STRING,
            allowNull: true
        }, 
        operador: {
            type: DataType.STRING,
            allowNull: true
        }, 
        economico: {
            type: DataType.STRING,
            allowNull: true
        }, 
        origen: {
            type: DataType.STRING,
            allowNull: true
        }, 
        destino: {
            type: DataType.STRING,
            allowNull: true
        }, 
        cliente: {
            type: DataType.STRING,
            allowNull: true
        }, 
        tipo_gasto: {
            type: DataType.STRING,
            allowNull: true
        }, 
        concepto: {
            type: DataType.STRING,
            allowNull: true
        }, 
        monto: {
            type: DataType.FLOAT,
            allowNull: true
        }, 
        comentarios: {
            type: DataType.STRING,
            allowNull: true
        }, 
        conceptos_agrupados: {
            type: DataType.STRING,
            allowNull: true
        }, 
        fecha_envio: {
            type: DataType.STRING,
            allowNull: true
        }, 
        pendientedeaprobar: {
            type: DataType.INTEGER,
            allowNull: true
        }, 
        aprobado_por: {
            type: DataType.STRING,
            allowNull: true
        }, 
        fecha_jun: {
            type: DataType.STRING,
            allowNull: true
        }, 
        aprobado_por_gerente: {
            type: DataType.STRING,
            allowNull: true
        }, 
        fecha_gerente: {
            type: DataType.STRING,
            allowNull: true
        }, 
        id_doc_gastos: {
            type: DataType.INTEGER,
            allowNull: true
        }, 
        comentarios_nomina: {
            type: DataType.STRING,
            allowNull: true
        }, 
        estatus: {
            type: DataType.STRING,
            allowNull: true
        },
        fecha_creacion: {
            type: DataType.STRING,
            allowNull: true
        },
        id_liquidacion: {
            type: DataType.INTEGER,
            allowNull: true
        }
    },
    
    {
        tableName: 'gastos',        
        timestamps: false
    });

    return SolicitudGastos;
}