const {
  Products,
  Author,
  Editorial,
  Genre,
  ISBN,
  ReleasedDate,
  AuthorProducts,
} = require("../../db");



const filterProductByAuthorController = async (authorName, page) => {
    const itemPerPage = 2; // Definir la cantidad de resultados por página
    const offset = (page - 1) * itemPerPage; // Calcular el desplazamiento
  


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
