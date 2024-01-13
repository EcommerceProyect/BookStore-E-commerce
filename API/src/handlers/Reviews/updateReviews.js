const {updateReviewController} = require("../../controllers/Reviews/updateReviewsController");


const updateReviewHandler = async (req,res) => {
    const {id} = req.params;
    const {rating} = req.body;

    try {
        const updateReview = await updateReviewController(id,rating);
        return res.json({
            message: 'Reseña actualizada con éxito',
            updateReview
        })
    } catch (error) {
        return res.status(500).json({ error: "Error al actualizar Reseña"})
    }
};

module.exports = {updateReviewHandler};