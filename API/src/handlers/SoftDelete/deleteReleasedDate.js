const{deleteReleasedDateController} = require("../../controllers/SoftDelete/deleteReleasedDate");

const deleteReleasedDateHandler = async (req,res) => {
    try {
        const {id} = req.params;
        const result = await deleteReleasedDateController(id);
        res.status(200).json(result);
        
    } catch (error) {
        res.status(500).json(error.message);    
    }
    
}

module.exports = {
    deleteReleasedDateHandler
}