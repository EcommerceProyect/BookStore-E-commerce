const {filterProductByAuthorController} = require("../../controllers/filterController/filterProductByAuthorController")


const filterProductByAuthor = async (req,res) =>{
    try {
        const authorName = req.query.author;
        const page = parseInt(req.query.page) || 1;

        const response = await filterProductByAuthorController(authorName, page);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

module.exports = {
    filterProductByAuthor
}