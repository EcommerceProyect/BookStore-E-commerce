const {Author} = require("../../db");

const updateAuthorController = async (authorId, authorData) => {
    try {
      const author = await Author.findByPk(authorId);
      if (!author) {
        throw new Error("No existe el autor");
      }
      await author.update({ name: authorData.name });
      const updatedAuthor = await Author.findByPk(authorId);
      return updatedAuthor;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  module.exports = {
    updateAuthorController,
  };