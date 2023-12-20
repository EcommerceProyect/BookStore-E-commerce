const { getISBNController } = require("../../controllers/Products/getISBNController");


const getISBNs = async (req,res) => {

    const {page} = req.query;

    try {
        
        const response = await getISBNController(page);

        res.status(200).json(response)

    } catch (error) {
        res.status(500).json(error.message);
    }

}

module.exports = {
    getISBNs,
}