const { Op } = require("sequelize");
const {
  Products,
  Editorial,
  ISBN,
  Genre,
  Author,
  AuthorProducts,
} = require("../db");

const getProductsForSearch = async (searchTerm) => {
  try {
    const data = await Products.findAndCountAll({
      where: {
        title: {
          [Op.iLike]: `%${searchTerm}%`,
        },
      },
      include: [
        {
          model: Author,
          through: {
            model: AuthorProducts,
          },
          as: "Authors",
        },
        { model: Editorial, as: "Editorial" },
        { model: ISBN, as: "ISBN" },
        { model: Genre, as: "Genres" },
      ],
    });

    console.log(data.count);
    const result = {
      numberOfResults: data.count,
      data: data.rows,
    };

    if (data.count === 0) return "No se encontraron datos con el libro buscado";

    return result;
  } catch (error) {
    throw new Error(
      "Error al filtrar por término de búsqueda: " + error.message
    );
  }
};

module.exports = {
  getProductsForSearch,
};
