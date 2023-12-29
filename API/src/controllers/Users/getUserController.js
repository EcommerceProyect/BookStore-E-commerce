
const {Users} = require("../../db");

const getUserController = async (id) => {

    try {
        
        const response = await Users.findByPk(id);

        return response;

    } catch (error) {
        return error;
    }

}

module.exports = { 
    getUserController
}