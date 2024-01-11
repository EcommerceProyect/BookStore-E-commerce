const { createReviewController } = require("../../controllers/Reviews/createReviewsController");

const createProductReview = async (req, res) => {
  const data = req.body;

  try {
    const result = await createReviewController(data);
    res.status(201).json({ message: result.message, data: result.data });
  } catch (error) {
    res.status(500).json({ message: "Error creating review", error: error.message });
  }
};

module.exports = { createProductReview };