
const { Productreview } = require("../../db");

const restoreReviewController = async (reviewId) => {
  try {
    console.log('id', reviewId);
    const reviewToRestore = await Productreview.findByPk(reviewId, { paranoid: false });
    
    if (reviewToRestore.dataValues.deletedAt === null) {
      throw new Error("La reseña ya ha sido restaurada.");
    }

    // Restaurar la reseña (eliminar la marca de tiempo de eliminación)
    await reviewToRestore.restore();

    return { success: true, message: 'Reseña restaurada exitosamente' };
  } catch (error) {
    // Lanza una excepción para ser manejada en la capa superior
    throw new Error(`No se pudo restaurar la reseña. Detalle del error: ${error.message}`);
  }
};

module.exports = { restoreReviewController };
