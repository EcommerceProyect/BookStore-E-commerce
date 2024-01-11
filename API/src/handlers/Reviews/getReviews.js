const {getAllReviewsController} = require("../../controllers/Reviews/getReviewsController");

const getAllReviewsHandler = async (req, res) => {
    try {
      const result = await getAllReviewsController();
      res.json({ reviews: result});
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };



  module.exports = {getAllReviewsHandler};