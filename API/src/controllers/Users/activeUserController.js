const {Users} = require("../../db");

const activeUserController = async (id) => {
    try {
        
        const user = await Users.restore({
            where:{
                id,
            }
        });

        const restoredUser = await Users.findByPk(id);
        return restoredUser;

    } catch (error) {
        throw new Error(error.message);
        
    }
};


module.exports = {
    activeUserController
};
