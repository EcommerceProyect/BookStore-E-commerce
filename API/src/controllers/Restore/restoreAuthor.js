const { Author } = require("../../db");

const restoreAuthorController = async(id) => {
    try {
        
        const author = await Author.findByPk(id,{
            paranoid: false
        });
        if(!author){
            throw new Error('El autor no existe')
        }
        await author.restore();
        return {success: true, message: 'Autor restaurado exitosamente'}
        
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {restoreAuthorController}