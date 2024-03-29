const {
  updateUserController
} = require("../../controllers/Users/updateUserController");

const updateUserHandler = async (req, res) => {
  console.log(req.auth);
  const id = req.auth.payload.sub;
  const userData = req.body;
  console.log(userData);
  try {
    const updateUser = await updateUserController(id, userData);
    return res.json({
      message: "Usuario actualizado con éxito",
      updateUser
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Error al actualizar usuario" });
  }
};

module.exports = { updateUserHandler };
