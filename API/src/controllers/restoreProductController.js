const {Products} = require('../db')

const restoreProductController = async (id) => {
    try {
        // Buscar el producto por su ID
        const product = await Products.findByPk(id,{
          paranoid:false
        });
    
        // Verificar si el producto existe
        if (!product) {
          // Puedes lanzar un error o devolver un valor específico para indicar que el producto no existe
          throw new Error('Producto no encontrado');
        }
    
        //Reactivacion del producto
        const result = await product.restore();
    
        // Devolver un objeto con el resultado y un mensaje
        return {
          success: result,
          message: result !== null ? 'Producto eliminado correctamente' : 'El producto ya fue eliminado anteriormente'
        };
      }
    catch (error) {
    
        throw new Error(error.message);
        
    }
}

module.exports = {
  restoreProductController
}