const { Products,Author,Editorial,Genre,ISBN,ReleasedDate,GenreProducts } = require("../../db");

const filterProductByGenreController = async (genre) => {
    try {
        const response = await Products.findAll({
            include: [
                { model: Author, as: "Authors" },
                { model: ReleasedDate, as: "ReleasedDate" },  
                { model: Editorial, as: "Editorial" },    
                { model: ISBN, as: "ISBN" }, 
                {
                    model: Genre,
                    through: {
                        model: GenreProducts,
                        timestamps: false,
                    },
                    where: {
                        name: genre,
                    },
                    
                },

            ],
        });

        return response;
    } catch (error) {
        console.error("Error en filterProductByGenreController:", error);
        return error;
    }
};
module.exports = {
  filterProductByGenreController,
};
