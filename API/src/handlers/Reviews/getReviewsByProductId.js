const {getReviewsByProductIdController} = require("../../controllers/Reviews/getReviewsByProductIdController");

const getReviewsByProductId = async (req, res) => {
  const {productId} = req.params
    try {
      const result = await getReviewsByProductIdController(productId);
      res.json({ reviews: result});
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };



  module.exports = {getReviewsByProductId};