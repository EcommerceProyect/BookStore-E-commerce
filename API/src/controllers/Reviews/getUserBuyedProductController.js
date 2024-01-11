const { Cart, CartDetail, Products} = require("../../db")

const getUserBuyedProductController = async (userId, productId) => {
    try {

    const productInCart = await Cart.findOne({
        where: { UserId: userId, status: 'Inactivo' },
        include: [
          {
            model: Products,
            where: { id: productId },
            through: { model: CartDetail },
          },
        ],
      });

      if (productInCart) {
        return { success: true, message: 'El usuario adquirió el producto con id ' + productId  };
        
      } else {
        return { success: false, message: 'El usuario No adquirió el producto con id ' + productId  };
      }

    } catch (error) {
        throw new Error(error.message);       
    }
}


module.exports = {
    getUserBuyedProductController
}