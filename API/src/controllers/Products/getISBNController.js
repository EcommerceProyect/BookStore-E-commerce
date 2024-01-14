const { ISBN } = require("../../db")

require("dotenv").config();
const {LIMIT_ITEMS} = process.env

const itemPerPage = LIMIT_ITEMS;

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