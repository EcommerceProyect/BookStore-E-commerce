const {Products} = require('../db')

const deleteProductController = async (id) => {
    try {
        // Buscar el producto por su ID
        const product = await Products.findByPk(id);
    
        // Verificar si el producto existe
        if (!product) {
          // Puedes lanzar un error o devolver un valor específico para indicar que el producto no existe
          throw new Error('Producto no encontrado');
        }
    
        // Realizar un borrado lógico utilizando el método destroy
        const result = await product.destroy();
    
        // Devolver un objeto con el resultado y un mensaje
        return {
          success: result !== null,
          message: result !== null ? 'Producto eliminado correctamente' : 'El producto ya fue eliminado anteriormente'
        };
      }
    catch (error) {
    
        throw new Error(error.message);
        
    }
}

module.exports = {
    deleteProductController
}