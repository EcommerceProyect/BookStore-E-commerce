const {getAllReviewsController, getAverageRatingController} = require("../../controllers/Reviews/getReviewsController");

const getAllReviewsHandler = async (req, res) => {
    try {
      const result = await getAllReviewsController();
      res.json({ reviews: result});
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

  const getAverageRatingHandler = async (req, res) => {
    const productId = req.params.productId;
  
    try {
      const result = await getAverageRatingController(productId);
      res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };



  module.exports = {getAllReviewsHandler, getAverageRatingHandler};