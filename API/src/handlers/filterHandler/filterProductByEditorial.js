const {filterProductByEditorialController} = require("../../controllers/filterController/filterProductByEditorialController")


const filterProductByEditorial = async (req,res) =>{
    try {
        const editorial = req.query.editorial
        const page = parseInt(req.query.page) 
        const response = await filterProductByEditorialController(editorial,page)
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports = {
    filterProductByEditorial
}
