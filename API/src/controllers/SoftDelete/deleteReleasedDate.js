const { ReleasedDate } = require("../../db.js");

const deleteReleasedDateController = async (id) => {
    try {
        const releasedDate = await ReleasedDate.findByPk(id);
        if (!releasedDate) {
            throw new Error("La fecha de lanzamiento no existe");
        }
        await releasedDate.destroy();
        return { success: true, message: "Fecha de lanzamiento eliminada exitosamente" };

    } catch (error) {
        console.error(error);
        throw new Error(`No se pudo eliminar la fecha de lanzamiento. Detalle del error: ${error.message}`);
    }
};


module.exports = {
    deleteReleasedDateController
}