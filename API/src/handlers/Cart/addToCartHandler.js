
const { addToCartController } = require("../../controllers/Cart/addToCartController");

const addToCartHandler = async (req, res) => {
    try {
        const {userId, productId, quantity} = req.body;
        console.log("addtocardbody", req.body);
        const result = await addToCartController(userId, productId, quantity||1);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });  
    }
}

module.exports = { addToCartHandler }