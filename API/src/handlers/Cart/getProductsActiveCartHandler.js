
const { getProductsActiveCartController } = require("../../controllers/Cart/getProductsActiveCartController");

const getProductsActiveCartHandler = async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await getProductsActiveCartController(userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getProductsActiveCartHandler };
