const { Editorial } = require("../../db");

const deleteEditorialController = async(id) => {
    try {
        const editorial = await Editorial.findByPk(id);
        if(!editorial){
            throw new Error('La editorial no existe o ya fue eliminada')
        }
        await editorial.destroy();
        return {success: true, message: 'Editorial eliminada exitosamente'}
        
    } catch (error) {
        throw new Error(error.message)      
    }
    
}

module.exports = {deleteEditorialController}