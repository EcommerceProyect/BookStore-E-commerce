const { deleteProductController } = require("../controllers/deleteProductController");

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await deleteProductController(id);
        res.status(200).json({ message: "Libro eliminado", deleted: response });
    } catch (error) {
        res.status(500).json(error.message);
    }
};

module.exports = {
    deleteProduct
};
