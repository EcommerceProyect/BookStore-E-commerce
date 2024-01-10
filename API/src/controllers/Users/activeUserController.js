const {Users} = require("../../db");

const activeUserController = async (id) => {
    try {
        
        const user = await Users.restore({
            where:{
                id,
            }
        });

        return user;

    } catch (error) {
        throw new Error(error.message);
        
    }
};


module.exports = {
    activeUserController
};
