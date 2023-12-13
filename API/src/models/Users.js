const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define('Users', {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING(50),
        allowNull: false,
        validate:{
            len:[1, 50],
            msg: 'El nombre debe tener entre 1 y 50 caracteres'
        }
    },
    last_name:{
        type: DataTypes.STRING(30),
        allowNull: false,
        validate:{
            len:[1, 30],
            msg: 'El apellido debe tener entre 1 y 30 caracteres'
        }
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            isEmail: true
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    registration_type:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isIn: {
                args: [['local', 'google']],
                msg: 'El tipo de registro debe ser "local" o "google".'
            }
        }
    }
   })
}