const { Editorial } = require("../../db");

const itemPerPage = 50;

const getEditorialController = async (page) => {
  const offset = page * itemPerPage;

    try {

        if(!page){
            const response = await Editorial.findAll({
                attributes:["name","id"],
            })
            return response;
        }
        
        const {count} = await Editorial.findAndCountAll();

        const response = await Editorial.findAll({
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
  getEditorialController
};
