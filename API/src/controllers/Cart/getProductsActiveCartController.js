const { Cart, CartDetail, Products, Author, ReleasedDate, Editorial, Genre, ISBN } = require("../../db");

const getProductsActiveCartController = async (userId) => {
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

        const cartProducts =  await CartDetail.findAll({
            where: {
                CartId: activeCart.id
            }, 
            attributes: {exclude: ['CartId', 'createdAt', 'updatedAt','id']}
        })

        const products = await Products.findAll({
            where: {
                id: cartProducts.map(product => product.ProductId)
            },
            include: [
                { model: Author, as: 'Authors' },
                { model: ReleasedDate, as: 'ReleasedDate' },  
                { model: Editorial, as: 'Editorial' },
                { model: Genre, as: 'Genres' },     
                { model: ISBN, as: 'ISBN' },
            ]
        })


        // Obtener los detalles del carrito activo
    //    const result = activeCart
        let result = []
        cartProducts.forEach(product => {
            const productData = products.find(p => p.id === product.ProductId);
            result.push({
                ...productData.toJSON(),
                quantity: product.quantity
            })
        })
        return result ;
    } catch (error) {
        console.error('Error al obtener el carrito activo:', error);
        return { success: false, message: 'Error al obtener el carrito activo.' };
    }
};

module.exports = { getProductsActiveCartController };
