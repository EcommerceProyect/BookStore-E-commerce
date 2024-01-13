const { Products,Author,Editorial,Genre,ISBN,ReleasedDate } = require("../db");
require("dotenv").config();
const {LIMIT_PRODUCTS} = process.env

const getAllProducts = async () => {

    try {

        const {count} = await Products.findAndCountAll();

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
            totalPages: Math.ceil(count / LIMIT_PRODUCTS),
            numberOfResults: count,
            data: response.rows,
          };

        return data;

    } catch (error) {
        
        throw new Error(error.message);

    }

}

module.exports = {
    getAllProducts
}