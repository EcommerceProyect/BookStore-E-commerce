const { restoreProductController } = require("../controllers/restoreProductController");

const restoreProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await restoreProductController(id);
        res.status(200).json({ message: "Libro Restaurado", deleted: response });
    } catch (error) {
        res.status(500).json(error.message);
    }
};

module.exports = {
    restoreProduct
};
