const { Productreview } = require("../../db");

const getAllReviewsController = async () => {
  try {
    const allReviews = await Productreview.findAll();

    return allReviews
  } catch (error) {
    console.error(error);
    throw new Error(`No se pudieron obtener las reseñas. Detalle del error: ${error.message}`);
  }
};

module.exports = { getAllReviewsController };
