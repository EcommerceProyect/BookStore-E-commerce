require('dotenv').config();
const { Productreview, Orders, Cart } = require("../../db");
const { LIMIT_USERS } = process.env;

const getReviewsByUserController = async (userId, page) => {
    try {
        const pageNumber = page || 0; // Si la página no se proporciona, por defecto es la página 0

        // Consulta para carros inactivos
        const inactiveCarts = await Cart.findAll({
            where: {
                UserId: userId,
                status: "Inactivo"
            },
            attributes: ['id'],
            raw: true,
        });

        if (inactiveCarts.length === 0) {
            return "El usuario no ha realizado ninguna compra";
        }

        // Extrae solo los ids de los carros inactivos
        const inactiveCartsIds = inactiveCarts.map(cart => cart.id);

        // Consulta para obtener los ids de las orders que coincidan con los ids de los carros inactivos
        const orders = await Orders.findAll({
            where: {
                CartId: inactiveCartsIds
            },
            attributes: ['id'],
            raw: true,
        });

        const ordersIds = orders.map(order => order.id);

        // Consulta para obtener las reseñas paginadas
        const offset = pageNumber * parseInt(LIMIT_USERS, 10);
        const limit = parseInt(LIMIT_USERS, 10);

        const reviewsByUser = await Productreview.findAll({
            where: {
                OrderId: ordersIds
            },
            attributes: ['id', 'rating', 'OrderId', 'ProductId'],
            offset,
            limit,
            raw: true
        });

        if (reviewsByUser.length === 0) {
            return `La página ${pageNumber} no tiene contenido`;
        }

        return {
            count: reviewsByUser.length,
            currentPage:parseInt(page)||0,
            reviews: reviewsByUser
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = { getReviewsByUserController };
