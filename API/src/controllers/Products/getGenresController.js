const { Genre } = require("../../db")

require("dotenv").config();

const {LIMIT_ITEMS} = process.env

const itemPerPage = LIMIT_ITEMS;

const getGenresController = async (page) => {

    const offset = page*itemPerPage;

    try {
        
        const {count} = await Genre.findAndCountAll();

        const response = await Genre.findAll({
            offset,
            limit:itemPerPage,
            attributes:["name","id"],
        })

        return {
            totalPages: Math.ceil(count / itemPerPage),
            numberOfResults: count,
            data:response
        };

    } catch (error) {
        return error;
    }

}

module.exports = {
    getGenresController,
}