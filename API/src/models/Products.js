const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Products",{
        id:{
            type:DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name:{
            type: DataTypes.STRING(50),
            allowNull: false,
            validate:{
                len:[1,50],
                notNull:{
                    msg: "El nombre del producto debe tener entre 1 y 50 caracteres"
                },
                notEmpty:{
                    msg:"El nombre del producto no puede estar vacío "
                }
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "La descripción del producto no puede estar vacía",
                },
            },
        },
        creationDate: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isDate: {
                    args: true,
                    msg: "La fecha de creación debe ser una fecha válida",
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
        style: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
                isBoolean: {
                    args: true,
                    msg: "El estilo debe ser un valor booleano",
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
    },{timestamps: false})
}