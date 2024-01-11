const { Orders} = require("../../db");

const createOrderController = async (orderData) => {
    try {

        const { OrderDate, shippingAddress, totalAmount} = orderData;

        const order = await Orders.create({
            OrderDate,
            shippingAddress,
            totalAmount,
        });

        return order;
    } catch (error) {
        throw new Error(error.message);
    }
};


module.exports = {
    createOrderController,
};