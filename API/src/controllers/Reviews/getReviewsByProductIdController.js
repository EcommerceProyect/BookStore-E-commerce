const { Productreview } = require("../../db");

const getReviewsByProductIdController = async (productId, userId) => {
  try {
    const review = await Productreview.findOne({
      where: {
        ProductId: productId,
        userId,
      },
    });

    return review;
  } catch (error) {
    console.error(error);
    throw new Error(
      `No se pudo obtener la reseña. Detalle del error: ${error.message}`
    );
  }
};

module.exports = { getReviewsByProductIdController };
