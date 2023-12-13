const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("ClothingType",{
        id:{
            type:DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name:{
            type: DataTypes.STRING(20),
            allowNull: false,
            validate:{
                len: {
                    args: [1,20],
                    msg: "La longitud del nombre de tener entre 1 y 20 caracteres"
                },
                notEmpty:{
                    args:true,
                    msg: "El nombre no puede estar vacío"
                }
            }
        }
    })
}