const { Productreview } = require("../../db");

const getProductReviewsAverageRatingController = async (productId) => {
  try {
    const averageRating = await Productreview.findAll({
      attributes: [
        [Productreview.sequelize.fn('AVG', Productreview.sequelize.col('rating')), 'averageRating']
      ],
      where: {
        ProductId: productId
      }
    });

    return averageRating[0].dataValues.averageRating || 0; // si no hay reseñas para el producto, el promedio es 0.
  } catch (error) {
    console.error(error);
    throw new Error(`No se pudo obtener el promedio de las reseñas. Detalle del error: ${error.message}`);
  }
};

module.exports = { getProductReviewsAverageRatingController };