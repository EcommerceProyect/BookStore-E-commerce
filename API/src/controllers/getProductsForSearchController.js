const { Op } = require("sequelize");
const {
  Products,
  Author,
  AuthorProducts,
} = require("../db");

const getProductsForSearch = async (searchTerm) => {
  try {
    //Operado or para realizar búsqueda por más de un campo/columna por uno o por otro.
    const data = await Products.findAndCountAll({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.iLike]: `%${searchTerm}%`
            }
          },
          {
            '$Authors.name$': {
              [Op.iLike]: `%${searchTerm}%`
            }
          }
        ]
      },
      include: [
        {
          model: Author,
          through: {
            model: AuthorProducts
          },
          as: "Authors"
        },
      ]
    });

    console.log(data.count);
    const result = {
      numberOfResults: data.count,
      data: data.rows
    };

    if (data.count === 0) return "No se encontraron datos con el libro buscado";

    return result;
  } catch (error) {
    throw new Error("Error al filtrar por término de búsqueda: " + error.message);
  }
};

module.exports = {
  getProductsForSearch
};
