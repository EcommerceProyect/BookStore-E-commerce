const { Editorial } = require("../../db");

const updateEditorial = async (id, newData) => {
    try {
        const editorialExisting = await Editorial.findByPk(id);

        if (!editorialExisting) {
            throw new Error("No existe la editorial");
        }

        await editorialExisting.update(newData);

        return editorialExisting;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    updateEditorial
};