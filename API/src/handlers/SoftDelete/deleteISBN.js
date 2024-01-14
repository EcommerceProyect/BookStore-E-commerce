const {deleteISBNController} = require("../../controllers/SoftDelete/deleteISBN");

const deleteISBNHandler = async(req,res) => { 
    try {
        const {name} = req.params;
        const result = await deleteISBNController(name);
        res.status(200).json(result);
        
    } catch (error) {
        
        res.status(500).json(error.message);
    }
}

module.exports = {
    deleteISBNHandler
}