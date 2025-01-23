module.exports = (sequelize, DataType) => {
    const Liquidaciones = sequelize.define('Liquidaciones',{
        id_liquidacion:{
            type: DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        operador:{
            type: DataType.STRING,
            allowNull: false
        },
        terminal:{
            type: DataType.STRING,
            allowNull: false
        },
        folio:{
            type: DataType.STRING,
            unique: true,
            allowNull: false
        },
        monto:{
            type: DataType.FLOAT,
            allowNull: false
        },
        checklist:{
            type: DataType.INTEGER,
            allowNull: false
        },
        firma:{
            type: DataType.INTEGER,
            allowNull: false
        },
        pago:{
            type: DataType.INTEGER,
            allowNull: false
        },
        fecha:{
            type: DataType.STRING,
            allowNull: false
        },
        usuario:{
            type: DataType.STRING,
            allowNull: false
        },
        verificado_por:{
            type: DataType.STRING,
            allowNull: true
        },
        fecha_verificado:{
            type: DataType.STRING,
            allowNull: true
        },
        cargo_firma:{
            type: DataType.STRING,
            allowNull: true
        },
        fecha_firma:{
            type: DataType.STRING,
            allowNull: true
        },
        cargo_pago:{
            type: DataType.STRING,
            allowNull: true
        },
        fecha_pago:{
            type: DataType.STRING,
            allowNull: true
        },
        fecha_enviado_rev:{
            type: DataType.STRING,
            allowNull: true
        },
        comentarios:{
            type: DataType.STRING,
            allowNull: true
        },
        diferencia_diesel:{
            type: DataType.INTEGER,
            allowNull: true
        },
        verificado_diesel_por:{
            type: DataType.STRING,
            allowNull: true
        },
        fecha_verificado_diesel:{
            type: DataType.STRING,
            allowNull: true
        },
        dieselrendimientos:{
            type: DataType.DOUBLE,
            allowNull: true
        },
        fecha_inicio_rendimientos:{
            type: DataType.STRING,
            allowNull: true
        },
        fecha_fin_rendimientos:{
            type: DataType.STRING,
            allowNull: true
        },
        dias_rendimientos:{
            type: DataType.INTEGER,
            allowNull: true
        },
        aplicaautorizacion:{
            type: DataType.INTEGER,
            allowNull: true
        },
        aplica_cobro_diesel:{
            type: DataType.INTEGER,
            allowNull: true
        },
        aplica_cobro_por:{
            type: DataType.STRING,
            allowNull: true
        },
        comentarioautorizacion:{
            type: DataType.STRING,
            allowNull: true
        },
        diferenciakilometros:{
            type: DataType.INTEGER,
            allowNull: true
        },
        estado:{
            type: DataType.STRING,
            allowNull: true
        }
    },
    {
        tableName: 'liquidacion',        
        timestamps: false
    });

    return Liquidaciones;
}