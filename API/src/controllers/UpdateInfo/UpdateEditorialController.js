const {Editorial} = require("../../db");
const updateEditorialController = async (id, editorialData) => {
    try {
      const editorial = await Editorial.findByPk(id);
      if (!editorial) {
        throw new Error("No existe la editorial");
      }
      await editorial.update({ name: editorialData.name });
  
      const updatedEditorial = await Editorial.findByPk(id);
      return updatedEditorial;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  module.exports = {
    updateEditorialController,
  };