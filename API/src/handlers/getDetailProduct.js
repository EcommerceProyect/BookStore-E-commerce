const {getProductByIdController} = require("../controllers/getProductById");

const getProductByIdHandler = async (req, res) => {
    const productId = req.params.id;
  
    try {
      const product = await getProductByIdController(productId);
  
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
  
      res.status(200).json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  };
  
  module.exports = {getProductByIdHandler};