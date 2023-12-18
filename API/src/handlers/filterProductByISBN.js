const {filterProductByISBNController} = require("../controllers/FilterProductByISBNController");


const filterProductByISBN = async (req,res) => {
    const {isbn} = req.query;

    try{
        if(!isbn){
            return res.status(400).json({error:"Se requiere ISBN."});
        }
        const response = await filterProductByISBNController(isbn);

        res.status(200).json(response);
    } catch(error){
        res.status(500).json({error: error.message});
    }
};

module.exports = {
    filterProductByISBN
}