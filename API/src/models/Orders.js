const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Orders",{
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        OrderDate:{
            type: DataTypes.DATE,
            allowNull: false,
            validate:{
                isDate: {
                    msg: "El campo debe ser una fecha valida"
                }
            }
        },
        shippingAddress:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: {
                    msg: "La dirección de envío no puede estar vacía"
                }
            }
        },
        totalAmount:{
            type: DataTypes.DECIMAL(10,2),
            allowNull:false,
            validate:{
                isDecimal:{
                    args: [10,2],
                    msg: "El campo debe ser un numero decimal con un máximo  de 10 dígitos en total y 2 decimales"
                },
                min:{
                    args: [0],
                    msg: "El campo no puede ser menor que 0"
                }
            }
        }
    },{timestamps: false})
}