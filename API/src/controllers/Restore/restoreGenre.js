const { Genre } = require("../../db");

const restoreGenreController = async (genreId) => {
    try {
        const genre = await Genre.findByPk(genreId, {
            paranoid: false,
        });
        if (genre.dataValues.deletedAt === null) {
            throw new Error("El género ya ha sido restaurado");
        }
        await genre.restore();
        return { success: true, message: "Género restaurado exitosamente" };
    } catch (error) {
        console.error(error);
        throw new Error(`No se pudo restaurar el género. Detalle del error: ${error.message}`);
    }
};

module.exports = {restoreGenreController};