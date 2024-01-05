const { postUserPruebaController } = require("../../controllers/Users/postUserPruebaController");

const postUserPrueba = async (req, res) => {
    const data = req.body;

    try {
        const response = await postUserPruebaController(data);
        res.status(200).json({ message: "Usuario creado", created: response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    postUserPrueba,
};
