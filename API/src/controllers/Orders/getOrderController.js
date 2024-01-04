const {Orders, OrderDetail} = require("../../db");

const getOrdersController = async () => {
    try {
        const orders = await Orders.findAll({ include: [OrderDetail] });

        return orders;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    getOrdersController
};