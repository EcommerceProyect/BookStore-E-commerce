const {Users} = require("../../db");

const deleteUserController = async (id) => {
    try {
        const user = await Users.findByPk(id);
        if(!user){
            throw new Error ("Usuario no encontrado");
        }

        const result = await user.destroy();


        return{
            success: result !== null,
            message: result !== null ? "Usuario eliminado correctamente" : "El usuario ya fue eliminado anteriormente",
        }
    } catch (error) {
        throw new Error(error.message);

    }
};

module.exports = {deleteUserController};