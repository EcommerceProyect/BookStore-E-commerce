const { filterProductByGenreController } = require("../../controllers/filterController/filterProductByGenreController");

const filterProductByGenre = async (req,res) => {

    const {genre} = req.query;

    try {
        
        const response = await filterProductByGenreController(genre);
        
        res.status(200).json(response);

    } catch (error) {
        res.status(500).json(error.message);
    }

}

module.exports = {
    filterProductByGenre,
}