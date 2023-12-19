const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("ReleasedDate",{
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        date:{
            type: DataTypes.DATE,
            allowNull: false,
            validate:{
                isDate: {
                    msg: "El campo debe ser una fecha valida"
                }
            }
        }
    },{timestamps: true})
}