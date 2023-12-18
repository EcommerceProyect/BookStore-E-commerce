const { Products, ISBN, Author, Editorial, Genre, ReleasedDate} = require("../db");

const filterProductByISBNController = async (isbn) => {
    const response = await Products.findOne({
        include:[
            {model: Author, as:"Author"},
            {model: Editorial, as:"Editorial"},
            {model: ReleasedDate, as:"ReleasedDate"},
            {model: Genre, as: "Genre"},
            {
                model: ISBN,
            as: "ISBN",
            where:{
            isbn: isbn
            
        }}
        ]
    });

    return response;
};


module.exports = {
    filterProductByISBNController,
};