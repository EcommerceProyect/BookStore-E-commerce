const { Products, Author, Editorial, ReleasedDate, Genre, ISBN } = require("../db");

const updateProduct = async (id, newData) => {
  try {
    const productExisting = await Products.findByPk(id, {
      include: [
        { model: Author, as: 'Authors' },
        { model: ReleasedDate, as: 'ReleasedDate' },
        { model: Editorial, as: 'Editorial' },
        { model: Genre, as: 'Genres' },
        { model: ISBN, as: 'ISBN' },
      ],
    });

    if (!productExisting) {
      throw new Error("No existe el Producto");
    }

    await productExisting.update(newData,{
        where:{id:id}
    });


    if (newData.Authors) {
      await productExisting.setAuthors(newData.Authors);
    }

    if (newData.Genres) {
      await productExisting.setGenres(newData.Genres);
    }

    if (newData.Editorial) {
      await productExisting.setEditorial(newData.Editorial);
    }

    if (newData.ISBN) {
      await productExisting.setISBN(newData.ISBN);
    }

    if (newData.ReleasedDate) {
      await productExisting.setReleasedDate(newData.ReleasedDate);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
    updateProduct
}