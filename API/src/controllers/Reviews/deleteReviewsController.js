const { Productreview } = require("../../db");

const deleteReviewController = async (id) => {
  try {
    const review = await Productreview.findByPk(id);

    if (!review) {
      throw new Error("La reseña no existe.");
    }

    await review.destroy();

    return { success: true, message: 'Reseña eliminada exitosamente' };
  } catch (error) {
    console.error(error);
    throw new Error(`No se pudo eliminar la reseña. Detalle del error: ${error.message}`);
  }
};

module.exports = { deleteReviewController };