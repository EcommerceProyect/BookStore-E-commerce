const { Cart, CartDetail } = require("../../db");

const deleteProductCartController = async (userId, productId) => {
    try {
        // Buscar el carrito activo del usuario
        const userCart = await Cart.findOne({
            where: {
                UserId: userId,
                status: 'Activo',
            },
        });

        if (!userCart) {
            return { success: false, message: 'El usuario no tiene un carrito activo.' };
        }

        // Buscar el detalle del carrito por el id del producto
        const cartDetail = await CartDetail.findOne({
            where: {
                CartId: userCart.id,
                ProductId: productId,
            },
        });

        if (!cartDetail) {
            return { success: false, message: 'No se encontró el detalle del carrito para el producto especificado.' };
        }

        // Eliminar el detalle del carrito
        await cartDetail.destroy();

        return { success: true, message: 'Producto eliminado del carrito correctamente.' };
    } catch (error) {
        console.error('Error al eliminar producto del carrito:', error);
        return { success: false, message: 'Error al eliminar producto del carrito.' };
    }
};

module.exports = {
    deleteProductCartController
};
