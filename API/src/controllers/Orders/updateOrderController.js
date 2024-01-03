const { OrderDetail,Orders } = require("../../db");


const updateOrderController = async (orderId, orderData) => {
    try {
        const order = await Orders.findByPk(orderId, {
            include: OrderDetail,
        });

        if (!order) {
            throw new Error("Orden no encontrada");
        }

        order.OrderDate = orderData.OrderDate || order.OrderDate;
        order.shippingAddress = orderData.shippingAddress || order.shippingAddress;
        order.totalAmount = orderData.totalAmount || order.totalAmount;

        if (orderData.OrderDetail) {
            order.OrderDetail.quantity = orderData.OrderDetail.quantity || order.OrderDetail.quantity;
            await order.OrderDetail.save();
        }

        await order.save();
        const updatedOrder = await Orders.findByPk(orderId, {
            include: OrderDetail,
        });

        return updatedOrder;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    updateOrderController,
};
