const {restoreReviewController} = require("../../controllers/Reviews/restoreReviewController");

const restoreReviewHandler = async(req,res) => {
    try {
        const {reviewId} = req.params;
        const restoreReview = await restoreReviewController(reviewId);
        res.status(200).json(restoreReview);
    } catch (error) {
        res.status(500).json(error.message);      
    }

}

module.exports = {restoreReviewHandler}