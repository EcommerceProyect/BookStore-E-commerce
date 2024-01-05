const {deleteUserController} = require("../../controllers/Users/deleteUserController");

const deleteUserHandler = async (req,res) => {
    const {id} = req.params;
    try {
        const deleteUser = await deleteUserController(id);
        res.status(200).json({
            message: "Usuario eliminado",
            delete: deleteUser
        })
    } catch (error) {
        res.status(500).json(error.message);
    }
};

module.exports = {deleteUserHandler}; 