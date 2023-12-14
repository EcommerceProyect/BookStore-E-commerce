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
        }
    },{timestamps: false})
}