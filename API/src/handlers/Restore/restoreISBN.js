const{restoreISBNController} = require("../../controllers/Restore/restoreISBN")

const restoreISBNHandler = async (req, res) => {
  try {
    const{name} = req.params;
    const result = await restoreISBNController(name);
    res.status(200).json(result);
    
  } catch (error) {
    res.status(500).json(error.message);
  }
}

module.exports = {restoreISBNHandler}