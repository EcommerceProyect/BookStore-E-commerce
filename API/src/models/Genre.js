const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Genre",{
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
            unique:true,
            validate:{
                notEmpty:{
                    args: true,
                    msg: "El nombre no puede estar vacío"
                },
                len:{
                    args: [1,20],
                    msg: "La longitud del nombre debe tener entre 1 y 20 caracteres"
                }
            }
        }
    })
}