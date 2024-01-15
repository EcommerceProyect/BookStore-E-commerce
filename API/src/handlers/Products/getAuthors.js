const { getAuthorsController } = require("../../controllers/Products/getAuthorsController");

const getAuthors = async (req,res) => {

    const {page} = req.query;

    try {
        
        const response = await getAuthorsController(page || 0);

        res.status(200).json(response)

    } catch (error) {
        res.status(500).json(error.message);
    }

}

module.exports = {
    getAuthors,
}