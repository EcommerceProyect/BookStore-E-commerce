
const { getActiveCartController } = require("../../controllers/Cart/getActiveCartController");

const getActiveCartHandler = async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await getActiveCartController(userId);

        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: result.message });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getActiveCartHandler };
