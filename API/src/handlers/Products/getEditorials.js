const { getEditorialController } = require("../../controllers/Products/getEditorialController");


const getEditorials = async (req,res) => {

    const {page} = req.query;

    try {
        
        const response = await getEditorialController(page);

        res.status(200).json(response)

    } catch (error) {
        res.status(500).json(error.message);
    }

}

module.exports = {
    getEditorials,
}