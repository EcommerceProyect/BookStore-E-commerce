const {Genre} = require("../../db");
const updateGenreController = async (genreId, genreData) => {
  try {
    const genre = await Genre.findByPk(genreId);
    if (!genre) {
      throw new Error("No existe el género");
    }
    await genre.update({ name: genreData.name });
    const updatedGenre = await Genre.findByPk(genreId);
    return updatedGenre;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  updateGenreController,
};