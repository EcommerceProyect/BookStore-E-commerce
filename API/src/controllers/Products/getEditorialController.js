const { Editorial } = require("../../db");

const itemPerPage = 50;

const getEditorialController = async (page) => {

    const offset = page*itemPerPage;

    try {
        
        const response = await Editorial.findAll({
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
    getEditorialController,
}