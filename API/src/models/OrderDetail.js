const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("OrderDetail",{
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        quantity:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                isInt:{
                    args: {min:0},
                    msg: "La cantidad debe ser un número entero no negativo"
                }

            }

        }
    },{timestamps: false})
}