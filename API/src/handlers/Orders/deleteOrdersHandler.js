const {deleteOrderController} = require("../../controllers/Orders/deleteOrderController");

const deleteOrderHandler = async (req, res) => {
    const { id } = req.params;

    try {
        const deleteOrder = await deleteOrderController(id);
        res.status(200).json({
            message: "Orden eliminada",
            delete: deleteOrder,
        });
    } catch (error) {
        res.status(500).json(error.message);
    }
};


module.exports = {deleteOrderHandler};