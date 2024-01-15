const { ReleasedDate } = require("../../db");


const restoreReleasedDateController = async (releasedDateId) => {
    try {
        const releasedDate = await ReleasedDate.findByPk(releasedDateId, { paranoid: false });
        if (releasedDate.dataValues.deletedAt === null) {
            throw new Error("La fecha de lanzamiento ya ha sido restaurada");
        }
        await releasedDate.restore();
        return { success: true, message: "Fecha de lanzamiento restaurada exitosamente" };
    } catch (error) {
        console.error(error);
        throw new Error(`No se pudo restaurar la fecha de lanzamiento. Detalle del error: ${error.message}`);
    }
};

module.exports = {restoreReleasedDateController};