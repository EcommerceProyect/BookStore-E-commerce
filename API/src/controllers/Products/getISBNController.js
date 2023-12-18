const { ISBN } = require("../../db")

const itemPerPage = 50;

const getISBNController = async (page) => {

    const offset = page*itemPerPage;

    try {
        
        const response = await ISBN.findAll({
            offset,
            limit:itemPerPage,
            attributes:["name","id","ISBNId"],
        })

        return response;

    } catch (error) {
        return error;
    }

}

module.exports = {
    getISBNController,
}