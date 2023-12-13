const { Products } = require("../db");

//toma todos los productos pero trae solo los primeros 20 segun la pagina que se encuentre
const itemPerPage = 2;// la cantidad de items que se mandaran a partir de la pagina que este posicionado

const getAllProductsLimit = async (page) => {

    try {
        
        const response = await Products.findAll({
            offset:page,
            limit:itemPerPage,
        });

        return response;

    } catch (error) {
        
        throw new Error(error.message);

    }

}

module.exports = {
    getAllProductsLimit,
}