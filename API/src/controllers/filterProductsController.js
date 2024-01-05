const { Op } = require("sequelize");
const {
  Products,
  ISBN,
  ReleasedDate,
  Author,
  AuthorProducts,
  Genre,
  GenreProducts,
  Editorial,
} = require("../db");

const filterProductsController = async (filters, sort, page) => {
  try {
    const { genre, editorial, title, author, rDate, isbn } = filters;
    const includeOptions = [];
    const titleCondition = {};

    const itemPerPage = 2;
    const offset = page * itemPerPage;


    if (genre) {
      includeOptions.push({
        model: Genre,
        where: {
          name: genre,
        },
        through: GenreProducts,
      });
    }

    if (author) {
      includeOptions.push({
        model: Author,
        where: {
          name: author,
        },
        through: AuthorProducts,
      });
    }

    if (editorial) {
      includeOptions.push({
        model: Editorial,
        where: {
          name: editorial,
        },
      });
    }

    if (rDate) {
      // Añadir condición para filtrar por año
      includeOptions.push({
        model: ReleasedDate,
        where: {
          date: {
            [Op.between]: [`${rDate}-01-01`, `${rDate}-12-31`],
          },
        }
      });
    }

    if (isbn) {
      includeOptions.push({
        model: ISBN,
        where: {
          name: isbn,
        },
      });
    }

    if (title) {
      titleCondition.title = { [Op.iLike]: `%${title}%` };
    }

    const data = await Products.findAndCountAll({
      include: includeOptions,
      where: {
        [Op.and]: [titleCondition],
      },
    });

    if (data.count === 0) {
      return { message: "No se encontraron resultados." };
    }

    const idResults = data.rows.map((result) => result.id);
    
    const getOrderSintax = (sort) => {
        if (sort.sortField && sort.sortAction) {
          if (sort.sortField === "date") {
            return [[{ model: ReleasedDate, as: "ReleasedDate" }, "date", sort.sortAction]];
          }
          return [[sort.sortField, sort.sortAction]];
        }
        return []; // Si no hay sortField y sortAction, no se aplica ordenamiento
      };
    const detailedResults = await Products.findAll({
      offset,
      limit: itemPerPage,
      include: [
        { model: Author, as: "Authors" },
        { model: ReleasedDate, as: "ReleasedDate" },
        { model: Editorial, as: "Editorial" },
        { model: Genre, as: "Genres" },
        { model: ISBN, as: "ISBN" },
      ],
      where: {
        id: {
          [Op.in]: idResults,
        },
      },
      order: getOrderSintax(sort),
    });
    if (detailedResults.length === 0) {
      return { message: `La página ${page} no tiene contenido.` };
    }
    return {
      count: data.count,
      page: page,
      detailedResults: detailedResults,
    };
  } catch (error) {
    return error;
  }
};

module.exports = {
  filterProductsController,
};
