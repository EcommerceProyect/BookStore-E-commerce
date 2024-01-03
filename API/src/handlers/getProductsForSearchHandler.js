const {
  getProductsForSearch,
} = require("../controllers/getProductsForSearchController");

const getProductsForSearchHandler = async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm;
    const response = await getProductsForSearch(searchTerm);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
module.exports = {
  getProductsForSearchHandler,
};
