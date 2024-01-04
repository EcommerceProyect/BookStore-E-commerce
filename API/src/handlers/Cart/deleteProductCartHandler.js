const {deleteProductCartController} = require("../../controllers/Cart/deleteProductCartController");

const deleteProductCartHandler = async (req, res) => {
    try {
        const { userId, productId } = req.params;
        const result = await deleteProductCartController(userId, productId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {deleteProductCartHandler}