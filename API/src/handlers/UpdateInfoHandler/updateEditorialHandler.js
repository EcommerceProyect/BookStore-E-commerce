const {updateEditorialController} = require("../../controllers/UpdateInfo/UpdateEditorialController");

const updateEditorialHandler = async (req, res) => {
    const { id } = req.params;
    const newEditorial = req.body;
  
    try {
      const updatedEditorial = await updateEditorialController(id, newEditorial);
      res.status(200).json({
        message: "Editorial actualizada con éxito",
        updatedEditorial,
      });
    } catch (error) {
      console.error("Error al actualizar editorial", error);
      res.status(404).json({ error: error.message });
    }
  };
  
  module.exports = { updateEditorialHandler };