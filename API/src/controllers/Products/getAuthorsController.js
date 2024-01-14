const { Author } = require("../../db")

require("dotenv").config();
const {LIMIT_ITEMS} = process.env

const itemPerPage=LIMIT_ITEMS;

const getAuthorsController = async (page) => {

    const offset = page*itemPerPage;

    try {

        if(!page){
            const response = await Author.findAll({
                attributes:["name","id"],
            })
            return response;
        }

        const {count} = await Author.findAndCountAll();

        const response = await Author.findAll({
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
    getAuthorsController,
}