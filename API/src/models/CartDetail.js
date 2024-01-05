const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('CartDetail', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {
                    args: true,
                    msg: "La cantidad debe ser un número entero no negativo"
                }
            }
        }
    },{timestamps: true,})
}