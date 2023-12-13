const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {

    sequelize.define("ProductReview",{
            id:{
                type:DataTypes.UUID,
                primaryKey:true,
                defaultValue:DataTypes.UUIDV4,
            },
            rating:{
                type:DataTypes.INTEGER,
                allowNull:false,
                validate: {
                    notNull:{
                    msg: "Name is required"
                    },
                    notEmpty:{
                    msg: "Name can't be empty"
                    }, 
                    is:{
                        args:/^[0-5]$/,
                        msg:"acepta un numero del 0 al 5"
                    },
                },
            },
            comment:{
                type:DataTypes.STRING,
                allowNull:false,
                validate: {
                    notNull:{
                    msg: "Name is required"
                    },
                    notEmpty:{
                    msg: "Name can't be empty"
                    }, 
                    len:{
                        args:[0,255],
                        msg:"acepta un texto menor a 255 caracteres"
                    },
                },
            },
            reviewDate:{
                type:DataTypes.DATE,
                allowNull:false,
                validate: {
                    notNull:{
                    msg: "Name is required"
                    },
                    notEmpty:{
                    msg: "Name can't be empty"
                    }, 
                    isDate: {
                        args: true,
                        msg: "La fecha de creación debe ser una fecha válida",
                    },
                },
            }
        },{timestamps: false})

}