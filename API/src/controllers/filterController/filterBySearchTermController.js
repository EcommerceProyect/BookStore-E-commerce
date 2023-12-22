const { Op } = require("sequelize");
const { Products, Editorial, ISBN, Genre, ReleasedDate, Author, AuthorProducts} = require("../../db");

const filterBySearchTermController = async (searchTerm, page) => {
  try {
    const itemPerPage = 4; // Definir la cantidad de resultados por página

    const data = await Products.findAndCountAll({
      where: {
        title: {
          [Op.iLike]: `%${searchTerm}%`, //el iLike realiza una busqueda insensible a mayusculas o minusculas.
        },
      },
      include:[
        {
            model: Author,
            through: {
              model: AuthorProducts,
            },
            as: "Authors",
          },
        { model: ReleasedDate, as: "ReleasedDate" },
        {model:Editorial, as:"Editorial"},
        { model: ISBN, as: "ISBN" },
        { model: Genre, as: "Genres" },
      ],
      limit: itemPerPage,
      offset: page * itemPerPage,
    });

    console.log(data.count);
    const result = {
        totalPages: Math.ceil(data.count / itemPerPage),
        currentPage: page,
        numberOfResults: data.count,
        data: data.rows,
      };
      
    if(data.count === 0)return "No se encontraron datos con el libro buscado"
    if(result.currentPage + 1 > result.totalPages) return "No hay datos en esta pagina"
    
    return result
    
  } catch (error) {
    throw new Error(
      "Error al filtrar por término de búsqueda: " + error.message
    );
  }
};

module.exports = {
  filterBySearchTermController,
};
