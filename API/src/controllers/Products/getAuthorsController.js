const { Author } = require("../../db");

const itemPerPage = 50;

const getAuthorsController = async (page) => {
  const offset = page * itemPerPage;

  try {
    const { count } = await Author.findAndCountAll();

    const response = await Author.findAll({
      offset,
      limit: itemPerPage,
      attributes: ["name", "id"]
    });

    return {
      totalPages: Math.ceil(count / itemPerPage),
      numberOfResults: count,
      data: response
    };
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAuthorsController
};
