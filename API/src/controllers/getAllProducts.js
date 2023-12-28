const { Products,Author,Editorial,Genre,ISBN,ReleasedDate } = require("../db");
const itemPerPage = 4;

const getAllProducts = async () => {

    try {
        const response = await Products.findAndCountAll({
            include: [
                { model: Author, as: 'Authors' },
                { model: ReleasedDate, as: 'ReleasedDate' },  
                { model: Editorial, as: 'Editorial' },
                { model: Genre, as: 'Genres' },     
                { model: ISBN, as: 'ISBN' }
              ]
        });

        const data = {
            totalPages: Math.ceil(response.count / itemPerPage),
            numberOfResults: response.count,
            data: response,
          };

        return data;

    } catch (error) {
        
        throw new Error(error.message);

    }

}

module.exports = {
    getAllProducts
}