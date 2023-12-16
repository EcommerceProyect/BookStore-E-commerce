const { Products,Autor,Editorial,Genre,ISBN,ReleasedDate } = require("../db");

const getAllProducts = async () => {

    try {
        const response = await Products.findAll({
            include: [
                { model: Autor, as: 'Autors' },
                { model: ReleasedDate, as: 'ReleasedDate' },  
                { model: Editorial, as: 'Editorial' },
                { model: Genre, as: 'Genres' },     
                { model: ISBN, as: 'ISBN' }
              ]
        });

        

        return response;

    } catch (error) {
        
        throw new Error(error.message);

    }

}

module.exports = {
    getAllProducts
}