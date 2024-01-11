const { Cart, CartDetail } = require("../../db");

const addToCartController = async (userId, productId, quantity) => {
  try {
    // Buscar el carrito activo del usuario
    console.log("productId: ", productId);
    const userCart = await Cart.findOne({
      where: {
        UserId: userId,
        status: "Activo", // Asegurarse de que el carrito esté activo
      },
    });
    console.log("Adding product to cart: ", userCart);
    if (!userCart) {
      return {
        success: false,
        message: "El usuario no tiene un carrito activo.",
      };
    }

    // Verificar si el producto ya existe en CartDetail
    const existingCartDetail = await CartDetail.findOne({
      where: {
        CartId: userCart.id,
        ProductId: productId,
      },
    });

    if (existingCartDetail) {
      // Si el producto ya existe en CartDetail, actualiza la cantidad
      await existingCartDetail.update({ quantity });
    } else {
      // Si el producto no existe, crea un nuevo registro en CartDetail
      await CartDetail.create({
        CartId: userCart.id,
        ProductId: productId,
        quantity,
      });
    }

    return {
      success: true,
      message: "Producto agregado al carrito correctamente.",
    };
  } catch (error) {
    console.error("Error al agregar producto al carrito:", error);
    return { success: false, message: "Error al agregar producto al carrito." };
  }
};

module.exports = { addToCartController };

// try {
//     // Confirmar que el usuario exista
//     const user = await Users.findByPk(userId);

//     if (user === null) {
//         return { message: 'Usuario no registrado' };
//     }
//     // Buscar el carrito del usuario
//     let userCart = await Cart.findOne({ where: { UserId: userId } });

//     // ...

//     if (userCart) {
//         // Si el usuario ya tiene un carrito, actualiza el carrito

//         for (const product of products) {

//             const existingCartItem = await userCart.getProducts({ where: { idProduct: product.idProduct } });

//             if (existingCartItem.length > 0) {
//                 // Si el producto ya está en el carrito, actualiza la cantidad
//                 const existingProduct = existingCartItem[0];
//                 await userCart.updateProduct(existingProduct.id, { quantity: existingProduct.quantity + parseInt(product.quantity || 1) });
//             } else {
//                 // Si el producto no está en el carrito, agrégalo con cantidad predeterminada 1 si no se especifica
//                 await userCart.addProduct(product.idProduct, { through: { quantity: parseInt(product.quantity) || 1 } });
//             }
//         }
//     } else {
//       // Si el usuario no tiene un carrito, crea uno y agrega los productos
//       // console.log('vista de products', products);
//       console.log('Products array:', products);
//       userCart = await Cart.create({ UserId: userId });

//       console.log('Products array:', products);
//       for (const product of products) {
//           // Agrega el producto con cantidad predeterminada 1 si no se especifica
//           console.log('vista de products', product);
//           const quantity = parseInt(product.quantity, 10) || 1;
//           console.log('quantity', quantity);

//           await userCart.addProduct(product.idProduct, { through: { quantity } });
//       }
//   }

//     // ...

// } catch (error) {
//     console.error('Error al agregar productos al carrito:', error);
//     return { success: false, message: 'Error al agregar productos al carrito' };
// }
