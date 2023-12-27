const { Products, Author, Editorial, ReleasedDate, Genre, ISBN } = require("../db");

const updateProductController = async (id, newData) => {
  try {
    const productExisting = await Products.findByPk(id, {
      include: [
        { model: Author, as: 'Authors' },
        { model: ReleasedDate},
        { model: Editorial},
        { model: Genre, as: 'Genres' },
        { model: ISBN},
      ],
    });

    if (!productExisting) {
      throw new Error("No existe el Producto");
    }

    await productExisting.update(newData);

    if (newData.Authors) {
      const updatedAuthors = await Promise.all(newData.Authors.map(async (author) => {
        await Author.update({ name: author.name }, { where: { id: author.id } });
        return Author.findByPk(author.id);
      }));

      // Actualizo la asociación con autores
      await productExisting.setAuthors(updatedAuthors);
    }

    if (newData.Genres) {
      const updatedGenres = await Promise.all(newData.Genres.map(async (genre) => {
        await Genre.update({ name: genre.name }, { where: { id: genre.id } });
        return Genre.findByPk(genre.id);
      }));

     
      await productExisting.setGenres(updatedGenres);
    }

    if (newData.Editorial) {
      await productExisting.Editorial.update(newData.Editorial);
    }

    if (newData.ISBN) {
      await productExisting.ISBN.update(newData.ISBN);
    }

    if (newData.ReleasedDate) {
      await productExisting.ReleasedDate.update(newData.ReleasedDate);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
    updateProductController
}