const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Users", {
    id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    },
    last_name: {
      type: DataTypes.STRING(30),
      allowNull: true,
      validate: {
        len: [1, 30]
      }
    },
    phone: {
        type: DataTypes.STRING(10),
        allowNull: true,
        unique: true,
        validate: {
          len: [0, 10],
        }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["admin", "invitado", "user"]]
      }
    },
    registration_type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["local", "google"]]
      }
    },
  }, {timestamps:true, paranoid: true});
};
