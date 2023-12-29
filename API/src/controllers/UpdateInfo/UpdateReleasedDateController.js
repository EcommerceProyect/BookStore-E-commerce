const {ReleasedDate} = require("../../db");

const updateReleasedDateController = async (releasedDateId, releasedDateData) => {
    try {
      const releasedDate = await ReleasedDate.findByPk(releasedDateId);
      if (!releasedDate) {
        throw new Error("No existe la fecha de lanzamiento");
      }
      await releasedDate.update({ date: releasedDateData.date });
  
      const updatedReleasedDate = await ReleasedDate.findByPk(releasedDateId);
      return updatedReleasedDate;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  module.exports = {
    updateReleasedDateController,
  };
