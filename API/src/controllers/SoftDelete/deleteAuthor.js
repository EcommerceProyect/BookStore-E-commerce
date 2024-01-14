const {Author} = require('../../db')

const deleteAuthorController = async(id) => {
   try {
    const author = await Author.findByPk(id);
    if(!author){
        throw new Error('El autor no existe')
    }
    await author.destroy();
    return {success: true, message: 'Autor eliminado exitosamente'}
   } catch (error) {
    throw new Error(error.message)
   }
    
}

module.exports = {deleteAuthorController}