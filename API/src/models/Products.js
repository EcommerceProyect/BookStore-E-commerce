const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Products",{
        id:{
            type:DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        title:{
            type: DataTypes.STRING(50),
            allowNull: false,
            validate:{
                len:[1,50],
                notNull:{
                    msg: "El titulo del producto debe tener entre 1 y 50 caracteres"
                },
                notEmpty:{
                    msg:"El titulo del producto no puede estar vacío "
                }
            }
        },
        synopsis: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Este campo no puede estar vacío",
                },
            },
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: {
                isDecimal: {
                    args: true,
                    msg: "El precio debe ser un número decimal",
                },
                min: {
                    args: [0],
                    msg: "El precio no puede ser negativo",
                },
            },
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: {
                    args: true,
                    msg: "La imagen debe ser una URL válida",
                },
            },
        },
    }, {
        timestamps: true,
        paranoid: true, // mediante esta acción, habilitamos el borrado lógico
    })
}