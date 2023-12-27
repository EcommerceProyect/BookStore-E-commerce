const {updateAuthorController} = require("../../controllers/UpdateInfo/UpdateAuthorController");


const updateAuthorHandler = async (req, res) => {
  const { id } = req.params;
  const authorData = req.body;

  try {
    const updatedAuthor = await updateAuthorController(id, authorData);
    res.status(200).json({
      message: "Autor actualizado con éxito",
      updatedAuthor,
    });
  } catch (error) {
    console.log("Error al actualizar autor", error);
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  updateAuthorHandler,
};