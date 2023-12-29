const {updateGenreController} = require("../../controllers/UpdateInfo/UpdateGenreController");

const updateGenreHandler = async (req,res) => {
    const {id} = req.params;
    const genreData = req.body;

    try {
        const updateGenre = await updateGenreController(id, genreData);
        res.status(200).json({
            message: "Genre actualizado con éxito",
            updateGenre
        })
    } catch (error) {
        console.log("Error al actualizar genre",error);
        res.status(404).json({error: error.message})
    }
};

module.exports = {
    updateGenreHandler
};