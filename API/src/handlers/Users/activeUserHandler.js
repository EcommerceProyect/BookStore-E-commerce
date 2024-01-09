const {activeUserController} = require("../../controllers/Users/activeUserController");

const activeUserHandler = async (req,res) =>{
    const {id} = req.params;

    try {
        const updateUser = await activeUserController(id);
        return res.json({
            message: "Usuario actualizado con éxito",
            updateUser
        })
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: "Error al activar el usuario"})

    }
};

module.exports = {activeUserHandler}