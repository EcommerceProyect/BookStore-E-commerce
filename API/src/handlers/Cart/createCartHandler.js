const { createCartController } = require("../../controllers/Cart/createCartController");

const createCartHandler = async (req, res) => {
    try {
        const { userId } = req.body;
        const result = await createCartController(userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createCartHandler };
