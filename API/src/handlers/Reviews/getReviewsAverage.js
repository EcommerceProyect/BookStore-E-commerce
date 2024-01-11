const {getProductReviewsAverageRatingController} = require("../../controllers/Reviews/getReviewsAverageController");

const getProductReviewsAverageRatingHandler = async (req, res) => {
  const { productId } = req.params;

  try {
    const averageRating = await getProductReviewsAverageRatingController(productId);
    res.json({ productId, averageRating });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { getProductReviewsAverageRatingHandler };