const { Cart } = require("../../db");

const getActiveCartController = async (userId) => {
    try {
        // Buscar el carrito activo del usuario
        const activeCart = await Cart.findOne({
            where: {
                UserId: userId,
                status: 'Activo',
            },
        });

        if (!activeCart) {
            return { success: false, message: 'El usuario no tiene un carrito activo.' };
        }

        return { success: true, message: 'Carrito activo encontrado.', cart: activeCart };
    } catch (error) {
        console.error('Error al obtener el carrito activo:', error);
        return { success: false, message: 'Error al obtener el carrito activo.' };
    }
};

module.exports = { getActiveCartController };
