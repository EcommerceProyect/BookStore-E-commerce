const { Products } = require("../db");

const getAllProducts = async () => {

    try {
        const response = await Products.findAll();

        return response;

    } catch (error) {
        
        throw new Error(error.message);

    }

}

module.exports = {
    getAllProducts
}