const { restoreGenreController } = require("../../controllers/Restore/restoreGenre");

const restoreGenreHandler = async (req,res) =>{
    const { id } = req.params;
    try {
        const result = await restoreGenreController(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

module.exports = {restoreGenreHandler}