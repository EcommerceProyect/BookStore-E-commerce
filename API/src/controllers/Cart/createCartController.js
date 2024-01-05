const { Cart, Users} = require("../../db");

const createCartController = async (userId) => {
    try {
        const userExist = await Users.findByPk(userId);

        if (userExist === null) {
            return { message: 'Usuario no registrado' };
        } else {
             // Buscar un carrito activo asociado al usuario
        const activeCart = await Cart.findOne({
            where: {
                UserId: userId,
                status: 'Activo',
            },
        });

        if (activeCart) {
            // Si ya existe un carrito activo, simplemente devolvemos el carrito existente
            return { success: true, message: 'Carrito activo encontrado.', cart: activeCart };
        }

        // Si no existe un carrito activo, creamos uno nuevo
        const newCart = await Cart.create({
            UserId: userId,
            status: 'Activo',
        });

        return { success: true, message: 'Nuevo carrito activo creado.', cart: newCart };
        }
    } catch (error) {
        throw new Error(error.message);
    }

}

module.exports = {createCartController}