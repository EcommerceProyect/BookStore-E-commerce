const { Products, ISBN, Author, Editorial, Genre, ReleasedDate} = require("../../db");

const filterProductByISBNController = async (isbn) => {
    try {
        const response = await Products.findOne({
            include:[
                {
                model: ISBN,
                as: "ISBN",
                where:{
                name: isbn
            }}
            ],
        });
    
        if(!response){
            throw new Error("Producto no encontrado")
        }
    
        return response;
    } catch (error) {
        console.log("Error al filtrar por ISBN", error);
        throw new Error("Error interno del servidor al filtrar por ISBN");
    }
    
};

module.exports = {
    filterProductByISBNController,
};