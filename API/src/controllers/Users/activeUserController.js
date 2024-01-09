const {Users} = require("../../db");

const activeUserController = async (id) => {
    try {
        const user = await Users.findByPk(id);

        if (!user){
            throw new Error ("No existe el usuario");
        }else{
        user.deletedAt = null;
        await user.save();
        }

        const updateUser = await Users.findByPk(id);
        return updateUser;

    } catch (error) {
        throw new Error(error.message);
        
    }
};


module.exports = {
    activeUserController
};
