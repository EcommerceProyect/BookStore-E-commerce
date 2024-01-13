const {getReviewsByUserController} = require("../../controllers/Reviews/getReviewsByUserController");


const getReviewsByUserHandler = async (req, res) => {
    try {
        const {userId} = req.params;
        const {page} = req.query;
        const result = await getReviewsByUserController(userId, page);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    
}


module.exports = {getReviewsByUserHandler}