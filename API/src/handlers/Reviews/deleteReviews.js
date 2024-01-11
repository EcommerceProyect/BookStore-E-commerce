const {deleteReviewController} = require("../../controllers/Reviews/deleteReviewsController");

const deleteReviewHandler = async (req,res) => {
    const {id} = req.params;
    try {
        const deleteReview= await deleteReviewController(id);
        res.status(200).json({
            message: "Reseña eliminada",
            delete: deleteReview
        })
    } catch (error) {
        res.status(500).json(error.message);
    }
};

module.exports = {deleteReviewHandler}; 