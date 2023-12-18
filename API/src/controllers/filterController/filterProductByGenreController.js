const { Products,Author,Editorial,Genre,ISBN,ReleasedDate,GenreProducts } = require("../../db");

const itemPerPage = 2;

const filterProductByGenreController = async (genre,page) => {
    
    const offset = page*itemPerPage;

    try {
        const response = await Products.findAll({
            offset,
            limit:itemPerPage,
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
