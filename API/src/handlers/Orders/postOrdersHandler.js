const {createOrderController} = require("../../controllers/Orders/postOrderController");

const createOrderHandler = async (req, res) => {
    const orderData = req.body;
    try {
        const createdOrder = await createOrderController(orderData);
        return res.json({
            message: "Orden creada con éxito",
            order: createdOrder,
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: "Error al crear la orden" });
    }
};

module.exports = {
    createOrderHandler,
};
