const {getOrderByUserIdController} = require("../../controllers/Orders/getOrderByUserIdController");

const getOrderByUserIdHandler = async (req, res) => {

    const {page} = req.query;
    const {id} = req.params;

    try {
        const orders = await getOrderByUserIdController(id,page);
        
        if (orders.length === 0) {
            return res.json({ message: "No hay ninguna orden realizada." });
        }

        return res.json({ orders });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: "Error al obtener las órdenes" });
    }
};


module.exports = {getOrderByUserIdHandler}