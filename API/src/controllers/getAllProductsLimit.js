const {
  Products,
  Author,
  Genre,
  ISBN,
  ReleasedDate,
  Editorial
} = require("../db");

//toma todos los productos pero trae solo los primeros 20 segun la pagina que se encuentre

require("dotenv").config();
const { LIMIT_PRODUCTS } = process.env; // la cantidad de items que se mandaran a partir de la pagina que este posicionado

const getAllProductsLimit = async (page) => {
  const itemPerPage = LIMIT_PRODUCTS;
  const offset = page * itemPerPage;

  try {
    const { count } = await Products.findAndCountAll();

    const response = await Products.findAndCountAll({
      offset,
      limit: LIMIT_PRODUCTS,
      include: [
        { model: Author, as: "Authors" },
        { model: ReleasedDate, as: "ReleasedDate" },
        { model: Editorial, as: "Editorial" },
        { model: Genre, as: "Genres" },
        { model: ISBN, as: "ISBN" }
      ]
    });

    const data = {
      totalPages: Math.ceil(count / itemPerPage),
      currentPage: page,
      numberOfResults: count,
      data: response.rows
    };
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllProductsLimit
};
