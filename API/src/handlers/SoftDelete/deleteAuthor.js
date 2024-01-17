const {
  deleteAuthorController
} = require("../../controllers/SoftDelete/deleteAuthor");

const deleteAuthorHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteAuthorController(id);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

module.exports = {
  deleteAuthorHandler
};
