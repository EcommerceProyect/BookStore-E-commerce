const { getGenresController } = require("../../controllers/Products/getGenresController");

const getGenres = async (req,res) => {

    const {page} = req.query;

    try {
        
        const response = await getGenresController(page);

        res.status(200).json(response);

    } catch (error) {
        res.status(500).json(error.message);
    }

}

module.exports = {
    getGenres,
}