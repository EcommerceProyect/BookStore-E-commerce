const { Orders, OrderDetail } = require("../../db");

const createOrderController = async (orderData) => {
    try {

        const { OrderDate, shippingAddress, totalAmount, OrderDetail: orderDetailData } = orderData;

        const order = await Orders.create({
            OrderDate,
            shippingAddress,
            totalAmount,
        });

        if (orderDetailData) {
            const orderDetail = await OrderDetail.create({
                quantity: orderDetailData.quantity,
            });

            await order.setOrderDetail(orderDetail);
        }

        return order;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    createOrderController,
};