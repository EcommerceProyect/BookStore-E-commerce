const { Productreview } = require("../../db");

const getReviewsByProductIdController = async (productId) => {
  try {
    const allReviews = await Productreview.findOne({
      where: {
        ProductId: productId,
      },
    });

    return allReviews;
  } catch (error) {
    console.error(error);
    throw new Error(
      `No se pudo obtener la reseña. Detalle del error: ${error.message}`
    );
  }
};

module.exports = { getReviewsByProductIdController };
