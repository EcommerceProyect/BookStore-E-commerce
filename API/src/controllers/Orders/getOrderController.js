const {Orders, Cart} = require("../../db");
require("dotenv").config();
const {LIMIT_USERS} = process.env


const getOrdersController = async (page) => {

    const offset = page*LIMIT_USERS;

    try {
        const orders = await Orders.findAll({ 
            include: [Cart],
            offset,
            limit:LIMIT_USERS
        });

        return orders;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    getOrdersController
};