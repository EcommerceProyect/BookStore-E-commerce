const {updateOrderController} = require("../../controllers/Orders/updateOrderController");

const updateOrderHandler = async (req, res) => {
    const { id } = req.params;
    const orderData = req.body;

    try {
        const updatedOrder = await updateOrderController(id, orderData);
        return res.json({
            message: "Orden actualizada con éxito",
            order: updatedOrder,
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: "Error al actualizar la orden" });
    }
};


module.exports = {updateOrderHandler}