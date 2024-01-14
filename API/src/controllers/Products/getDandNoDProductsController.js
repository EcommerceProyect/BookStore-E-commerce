const { Products,Author,Editorial,Genre,ISBN,ReleasedDate } = require("../../db");
require("dotenv").config();
const {LIMIT_PRODUCTS} = process.env

//get all deleted and no deleted products
const getDandNoDProductsController = async (page) => {

    const itemPerPage = LIMIT_PRODUCTS;
    const offset = page*itemPerPage;

    try {

        
        if(!page){

            const response = await Products.findAll({
                include: [
                    { model: Author, as: 'Authors' },
                    { model: ReleasedDate, as: 'ReleasedDate' },  
                    { model: Editorial, as: 'Editorial' },
                    { model: Genre, as: 'Genres' },     
                    { model: ISBN, as: 'ISBN' }
                  ],
                paranoid:false
            });

            return response;
        }
        
        const {count} = await Products.findAndCountAll();

        const response = await Products.findAndCountAll({
            offset,
            limit:LIMIT_PRODUCTS,
            include: [
                { model: Author, as: 'Authors' },
                { model: ReleasedDate, as: 'ReleasedDate' },  
                { model: Editorial, as: 'Editorial' },
                { model: Genre, as: 'Genres' },     
                { model: ISBN, as: 'ISBN' }
              ],
            paranoid:false
        });
        
        const data = {
            totalPages: Math.ceil(count / itemPerPage),
            currentPage: page,
            numberOfResults: count,
            data: response.rows,
        };
        return data;

    } catch (error) {
        
        throw new Error(error.message);

    }
}

module.exports = {
    getDandNoDProductsController
}