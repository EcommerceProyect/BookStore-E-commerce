const{deleteGenreController} = require("../../controllers/SoftDelete/deleteGenre");

const deleteGenreHandler = async(req,res) => { 
    try {
        const {id} = req.params;
        const result = await deleteGenreController(id);
        res.status(200).json(result);
        
    } catch (error) {
        
        res.status(500).json(error.message);
    }
}


module.exports = {
    deleteGenreHandler
}