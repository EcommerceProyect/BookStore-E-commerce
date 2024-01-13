const {DataTypes} = require("sequelize");

module.exports = (sequelize) =>{
    sequelize.define("Productreview",{
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        rating:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                notEmpty:{
                    args: true,
                    msg: "El rating no puede estar vacío",
                },
                isInt:{
                    args:true,
                    msg:"El rating debe ser un entero"
                },
                is:{
                    args: /[0-5]/,
                    msg: "El numero de rating debe ser entre el 0 - 5",
                }
            }
        },
    },{timestamps: true, paranoid: true});
}