const {
    Products,
    Author,
    Editorial,
    Genre,
    ISBN,
    ReleasedDate,
} = require('../../db');

const filterProductByEditorialController = async (editorial,page) => {
    
    const itemPerPage = 2; // Definir la cantidad de resultados por página
    const offset = (page) * itemPerPage; // Calcular el desplazamiento

    try {

        const response = await Products.findAll({
            offset,
            limit: itemPerPage,
            include: [
                { model: Editorial,
                    where: {
                        name: editorial
                    }
                    , as: "Editorial" },
                { model: Author, as: "Authors" },
                { model: ReleasedDate, as: "ReleasedDate" },
                { model: ISBN, as: "ISBN" },
                { model: Genre, as: "Genres" },
            ],
        });
        console.log(response.length);
        return response;
    } catch (error) {

        console.error("Error en filterProductByEditorialController:", error);

    }
    
    
}

module.exports = {
    filterProductByEditorialController
}
