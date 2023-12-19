const {updateProduct} = require("../controllers/updateProductController");


const updateProductHandler = async (req,res) => {
    const {id} = req.params;
    const newData = req.body;

    try {
        const newProduct = await updateProduct(id,newData);
        res.status(200).json(newProduct)
        
    } catch (error) {
        console.log("Error al actualizar producto", error)
        res.status(404).json({error: error.message })
        
    }

};

module.exports = {updateProductHandler}