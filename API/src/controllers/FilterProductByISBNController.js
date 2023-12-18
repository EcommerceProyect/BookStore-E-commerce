const { Products, ISBN, Author, Editorial, Genre, ReleasedDate} = require("../db");

const filterProductByISBNController = async (isbn) => {
    try {
        const response = await Products.findOne({
            include:[
                {model: Author, as:"Authors"},
                {model: Editorial, as:"Editorial"},
                {model: ReleasedDate, as:"ReleasedDate"},
                {model: Genre, as: "Genres"},
                {
                    model: ISBN,
                as: "ISBN",
                where:{
                name: isbn
            }}
            ]
        });
    
        if(!response){
            throw new Error("Producto no encontrado")
        }
    
        return response;
    } catch (error) {
        console.log("Error al filtrar por ISBN, error");
        return error;
    }
    
};

module.exports = {
    filterProductByISBNController,
};