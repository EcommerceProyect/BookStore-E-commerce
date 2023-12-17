const { Products,Author,Editorial,Genre,ISBN,ReleasedDate } = require("../../db");

const filterProductByDateController = async (specificDate) => {
  try {

    const response = await Products.findAll({

        include: [
            { model: Author, as: "Authors" },
            { model: Editorial, as: "Editorial" },
            { model: Genre, as: "Genres" },
            { model: ISBN, as: "ISBN" },
            {
                model: ReleasedDate,
                where: {
                    date: new Date(specificDate),
                },
            },
        ],
    });

    console.log(response);

    return response;

  } catch (error) {
    console.error("Error en filterProductByDateController:", error);
    throw error;
  }
};

module.exports = {
  filterProductByDateController,
};