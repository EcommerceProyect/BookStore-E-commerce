const {getOrderByUserIdController} = require("../../controllers/Orders/getOrderByUserIdController");

const getOrderByUserIdAdminHandler = async (req, res) => {

    const {page} = req.query;
    const id = req.params.id;
    console.log(id);
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


module.exports = {getOrderByUserIdAdminHandler}