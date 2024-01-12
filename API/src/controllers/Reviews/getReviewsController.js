const { Productreview } = require("../../db");
require("dotenv").config();
const { LIMIT_USERS } = process.env;

const getReviewsController = async (page) => {
  const offset = (parseInt(page) || 0) * LIMIT_USERS;

  try {
    const reviews = await Productreview.findAll({
      offset,
      limit: LIMIT_USERS,
    });

    return reviews;
  } catch (error) {
    console.error(error);
    throw new Error(`No se pudieron obtener las reseñas. Detalle del error: ${error.message}`);
  }
};

module.exports = { getReviewsController };