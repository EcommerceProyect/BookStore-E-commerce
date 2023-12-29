const {updateReleasedDateController} = require("../../controllers/UpdateInfo/UpdateReleasedDateController");

const updateReleasedDateHandler = async (req, res) => {
    const { id } = req.params;
    const newReleasedDate = req.body;
  
    try {
      const updatedReleasedDate = await updateReleasedDateController(id, newReleasedDate);
      res.status(200).json({
        message: "Fecha de lanzamiento actualizada con éxito",
        updatedReleasedDate,
      });
    } catch (error) {
      console.error("Error al actualizar fecha de lanzamiento", error);
      res.status(404).json({ error: error.message });
    }
  };
  
  module.exports = { updateReleasedDateHandler };