const { Author } = require("../../db")

const itemPerPage=50;

const getAuthorsController = async (page) => {

    const offset = page*itemPerPage;

    try {
        
        const response = await Author.findAll({
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
    getAuthorsController,
}