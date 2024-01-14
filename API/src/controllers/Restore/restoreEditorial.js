const { Editorial } = require("../../db");

const restoreEditorialController = async (id) => {
        try {
            const editorial = await Editorial.findByPk(id, {
                paranoid: false,
            });
            if (!editorial) {
                throw new Error("La editorial no existe");
            }
            await editorial.restore();
            return { success: true, message: "Editorial restaurada exitosamente" };
        } catch (error) {
            throw new Error(error.message);
        }
    };

module.exports = {restoreEditorialController}