const {Orders} = require("../../db");

const deleteOrderController = async (id) => {
    try {
        const order = await Orders.findByPk(id);

        if (!order) {
            throw new Error("Orden no encontrada");
        }

        const result = await order.destroy();

        return {
            success: result !== null,
            message: result !== null ? "Orden eliminada correctamente" : "La orden ya fue eliminada anteriormente",
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    deleteOrderController,
};