

const { addToCartController } = require("../../controllers/Cart/addToCartController");

const addToCartHandler = async (req, res) => {
    try {
        const {userId, idProduct, quantity} = req.body;
        const result = await addToCartController(userId, idProduct, quantity||1);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });  
    }
}

module.exports = { addToCartHandler }