/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
require("dotenv").config();

const {DEFAULT} = process.env;

const {Users} = require("../../db");


const postUserController = async (data) => {

    const {name,last_name,phone,email,password,registration_type} = data;

    try {
        
        const [instanceUser, created] = await Users.findOrCreate({

            where:{
                email,
            },
            defaults:{
                name,
                last_name,
                phone,
                email,
                registration_type,
                password,
                role:DEFAULT,
            }

        })

        return created;

    } catch (error) {
        return error;
    }

}

module.exports = {
    postUserController,
}