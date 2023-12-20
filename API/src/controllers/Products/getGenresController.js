const { Genre } = require("../../db")

const itemPerPage = 50;

const getGenresController = async (page) => {

    const offset = page*itemPerPage;

    try {
        
        const response = await Genre.findAll({
            offset,
            limit:itemPerPage,
            attributes:["name","id"],
        })

        return response;

    } catch (error) {
        return error;
    }

}

module.exports = {
    getGenresController,
}