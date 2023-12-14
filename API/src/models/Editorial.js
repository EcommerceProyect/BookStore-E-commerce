const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Editorial",{
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty:{
                    args: true,
                    msg: "El nombre de la editorial no puede estar vacío"
                }
            }
        }
    },{timestamps: false})
}