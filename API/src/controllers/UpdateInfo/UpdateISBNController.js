const {ISBN} = require("../../db");

const updateISBNController = async (id,ISBNdata) => {

    try {
        
        const response = await ISBN.findByPk(id);

        if(!response) return null;

        await response.update({
            stock:ISBNdata.stock,
        },)

        const updateISBN = await ISBN.findByPk(id);
        return updateISBN;

    } catch (error) {
        return error;
    }

}

module.exports = {
    updateISBNController
}