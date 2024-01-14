const {
  Products,
  Author,
  Editorial,
  Genre,
  ISBN,
  ReleasedDate,
  AuthorProducts,
} = require("../../db");

require("dotenv").config();
const {LIMIT_PRODUCTS} = process.env

const filterProductByAuthorController = async (authorName, page) => {
    const itemPerPage = LIMIT_PRODUCTS; // Definir la cantidad de resultados por página
    const offset = (page) * itemPerPage; // Calcular el desplazamiento
  


  try {
    const response = await Products.findAll({
      offset,
      limit: itemPerPage,
      include: [
        {
          model: Author,
          through: {
            model: AuthorProducts,
            timestamps: false,
          },
          where: {
            name: authorName,
          },

          as: "Authors",
        },
        { model: ReleasedDate, as: "ReleasedDate" },
        { model: Editorial, as: "Editorial" },
        { model: ISBN, as: "ISBN" },
        { model: Genre, as: "Genres" },
      ],
    });
    
    return response;
  } catch (error) {
    console.error("Error en filterProductByAuthorController:", error);
    throw error;
  }
};

module.exports = {
  filterProductByAuthorController,
};
