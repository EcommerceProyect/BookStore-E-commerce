const { Products,Author,Editorial,Genre,ISBN,ReleasedDate } = require("../../db");

const filterProductByPk = async (pk) =>{

    try {
        
        const response = await Products.findByPk(pk, {
            include: [
                { model: Author, as: 'Authors' },
                { model: ReleasedDate, as: 'ReleasedDate' },
                { model: Editorial, as: 'Editorial' },
                { model: Genre, as: 'Genres' },
                { model: ISBN, as: 'ISBN' }
            ]
        });

        if (!response) {
            throw new Error(`Producto con clave primaria ${pk} no encontrado.`);
        }

        return response;

    } catch (error) {
        return error;
    }

}

module.exports = {
    filterProductByPk,
}