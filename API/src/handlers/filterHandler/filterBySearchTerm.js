const {
  filterBySearchTermController,
} = require("../../controllers/filterController/filterBySearchTermController");

const filterBySearchTerm = async (req, res) => {
  try {
    const searchTerm = req.query.title;
    const page = parseInt(req.query.page) || 0;
    const response = await filterBySearchTermController(searchTerm, page);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  filterBySearchTerm,
};
