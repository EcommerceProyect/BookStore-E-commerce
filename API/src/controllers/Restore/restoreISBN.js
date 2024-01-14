const {ISBN} = require("../../db.js")

const restoreISBNController = async (name) => {
    try {
        const isbn = await ISBN.findOne({
            where:{
                name: name
            },
            paranoid: false
        })
        if(isbn.dataValues.deletedAt === null){
            throw new Error("El ISBN ya ha sido restaurado")
        }
        await ISBN.restore({
            where:{
                name: name
            }
        })
        return {
            success: true,
            message: "ISBN restaurado"
        }
 
    } catch (error) {
        throw new Error(error.message)   
    }
}

module.exports = {
    restoreISBNController
}