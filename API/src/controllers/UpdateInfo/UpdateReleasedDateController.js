const { Products, ReleasedDate } = require("../../db");

const updateReleasedDateController = async (productId, newReleasedDate) => {
    try {
        const product = await Products.findByPk(productId, {
            include: ReleasedDate,
        });

        if (!product) {
            throw new Error("No existe el producto");
        }

        const releasedDate = product.ReleasedDate;

        if (!releasedDate) {
            throw new Error("El producto no tiene información de fecha de lanzamiento");
        }

        // Aca actualizo el dato.
        await releasedDate.update({ date: newReleasedDate });

        return releasedDate;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = { updateReleasedDateController };