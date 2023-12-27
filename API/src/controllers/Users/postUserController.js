/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
require("dotenv").config();

const {Users} = require("../../db");


const postUserController = async (data) => {

    const {role,name,last_name,phone,email,password,registration_type,id} = data;

    try {
        
        const [instanceUser, created] = await Users.findOrCreate({

            where:{
                email,
            },
            defaults:{
                id,
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