const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("ISBN",{
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
            unique:true,
            validate:{
                notEmpty:{
                    args: true,
                    msg: "El nombre no puede estar vacío"
                }
            }        
        },
        stock:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {
                    args: true,
                    msg: "El stock debe ser un número entero"
                },
                min:{
                    args:[0],
                    msg:"El stock no puede ser negativo"
                }
            }
        }
    },{timestamps: true, paranoid: true})
}