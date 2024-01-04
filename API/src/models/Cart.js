const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Cart', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                isIn: {
                    args: [['Activo', 'Inactivo']],
                    msg: 'El tipo de registro debe ser "Activo" o "Inactivo"'
                }
            }
        }
    }, {timestamps: true})
}