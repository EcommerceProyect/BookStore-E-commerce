const { Productreview } = require("../../db");

const createReviewController = async (data) => {
  try {
    const { ProductId, userId, rating, OrderId } = data;
    console.log(data);
    const newReview = await Productreview.create({
      ProductId,
      OrderId,
      userId,
      rating,
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
