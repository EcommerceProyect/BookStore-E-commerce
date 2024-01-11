const { Productreview} = require("../../db");

const createReviewController = async (data) => {  
  try {
    const { productId, userId, rating } = data;

    const newReview = await Productreview.create({
      productId,
      userId,
      rating
    });

    return {
      success: true,
      message: "Review created successfully",
      data: newReview,
    };
  } catch (error) {
    return {
      success: false,
      message: "Error creating review",
      error: error.message,
    };
  }
};

module.exports = { createReviewController };

