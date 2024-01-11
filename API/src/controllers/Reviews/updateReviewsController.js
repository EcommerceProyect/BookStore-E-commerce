const {Productreview} = require("../../db");

const updateReviewController = async (id,data) => {
    const {updateRating, updateComment} = data;
    try {
        const review = await Productreview.findByPk(id);

        if(!review){
            throw new Error("La reseña no existe");
        }

        review.rating= updateRating;
        review.comment= updateComment;

        await review.save()
        
        return {success: true, message : 'Reseña actualizada con exitosamente'}
    } catch (error) {
        console.log(error);
            throw new Error (`No se pudo actualizar la reseña. Detalle del error: ${error.message}`)
    }
};

module.exports = {updateReviewController}