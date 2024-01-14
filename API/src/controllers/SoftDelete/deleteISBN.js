const {ISBN} = require("../../db")

const deleteISBNController = async (name) => {
    try {
        const isbn = await ISBN.findOne({
            where:{
                name: name
            }
        })
        if(!isbn){
            throw new Error("No existe el ISBN o ya fue eliminado")
        }
        await ISBN.destroy({
            where:{
                name: name
            }
        })
        return {
            success: true,
            message: "ISBN eliminado"
        }
        
    } catch (error) {
        throw new Error(error.message)
        
    }
    
}

module.exports = {deleteISBNController}