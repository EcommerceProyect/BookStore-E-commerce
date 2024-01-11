const { getUserBuyedProductController } = require("../../controllers/Reviews/getUserBuyedProductController");

const getUserBuyedProductHandler = async (req, res) => {
    try {
        const { userId, productId } = req.query;

        const result = await getUserBuyedProductController(userId, productId);
        res.status(200).json(result);
        
    } catch (error) {
        res.status(500).json({ error: error.message });  
    }
}



module.exports = {
    getUserBuyedProductHandler
}