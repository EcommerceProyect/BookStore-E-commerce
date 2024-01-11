const {Orders} = require("../../db");

const getOrdersController = async () => {
    try {
        const orders = await Orders.findAll();
        return orders;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    getOrdersController
};