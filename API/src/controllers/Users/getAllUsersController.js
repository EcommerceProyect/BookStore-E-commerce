/* eslint-disable no-undef */
require("dotenv").config();
const {Users} = require("../../db");

const {LIMIT_USERS} = process.env;


const getAllUsersController = async (page,deleted) => {

    const offset = page*LIMIT_USERS;

    try {
        
        const response = await Users.findAll({
            offset,
            limit:LIMIT_USERS,
            paranoid:!deleted
        });

        return response;

    } catch (error) {
        return error;   
    }

}

module.exports = {
    getAllUsersController
}