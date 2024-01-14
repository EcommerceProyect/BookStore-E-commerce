const { Genre } = require("../../db");

const deleteGenreController = async (id) => {
    try {
        const genre = await Genre.findByPk(id);
        if (!genre) {
            throw new Error("El género no existe o ya fue eliminado");
        }
        await genre.destroy();
        return { success: true, message: "Género eliminado exitosamente" };
    } catch (error) {
        console.error(error);
        throw new Error(`No se pudo eliminar el género. Detalle del error: ${error.message}`);
    }
};

module.exports = { deleteGenreController };