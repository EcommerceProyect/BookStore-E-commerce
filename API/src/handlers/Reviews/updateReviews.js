const {updateReviewController} = require("../../controllers/Reviews/updateReviewsController");


const updateReviewHandler = async (req,res) => {
    const {id} = req.params;
    const {data} = req.body;

    try {
        const updateReview = await updateReviewController(id,data);
        return res.json({
            message: 'Reseña actualizada con éxito',
            updateReview
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: "Error al actualizar Reseña"})
    }
};

module.exports = {updateReviewHandler};