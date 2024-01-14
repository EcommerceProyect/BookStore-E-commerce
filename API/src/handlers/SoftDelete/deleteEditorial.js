const{ deleteEditorialController } = require("../../controllers/SoftDelete/deleteEditorial")

const deleteEditorialHandler = async (req, res) => {
    try {
        const {id} = req.params;
        const result = await deleteEditorialController(id);
        res.status(200).json(result);
        
    } catch (error) {
        res.status(500).json(error.message);    
    }
    
}

module.exports = {
    deleteEditorialHandler
}