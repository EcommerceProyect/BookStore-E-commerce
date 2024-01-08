const {DataTypes} = require("sequelize");

module.exports = (sequelize) =>{

    sequelize.define("Productreview",{
        raiting:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                notEmpty:{
                    args: true,
                    msg: "El reiting no puede estar vacío",
                },
                isInt:{
                    args:true,
                    msg:"El reiting debe ser un entero"
                },
                is:{
                    args: /[0-5]/,
                    msg: "El numero de reiting debe ser entre el 0 - 5",
                }
            }
        },
        comment:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Este campo no puede estar vacío",
                },
                len:{
                    args:[0,255],
                    msg:"El comentario debe de tener de 0 a 255 caracteres",
                }
            },
        },
        review_date:{
            type: DataTypes.DATE,
            allowNull: false,
            validate:{
                isDate: {
                    msg: "El campo debe ser una fecha valida"
                }
            }
        }
    },{timestamps: true});

}