const {getOrdersController} = require("../../controllers/Orders/getOrderController");

const getOrdersHandler = async (req, res) => {

    const {page} = req.query;

    try {
        const orders = await getOrdersController(page);
        
        if (orders.length === 0) {
            return res.json({ message: "No hay ninguna orden realizada." });
        }

        return res.json({ orders });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: "Error al obtener las órdenes" });
    }
};


module.exports = {getOrdersHandler}