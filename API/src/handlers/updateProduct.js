const {updateProductController} = require("../controllers/updateProductController");


const updateProductHandler = async (req,res) => {
    const {id} = req.params;
    const newData = req.body;

    try {
        const newProduct = await updateProductController(id,newData);
        res.status(200).json({
            message: "Producto actualizado con éxito", newProduct})
        
    } catch (error) {
        console.log("Error al actualizar producto", error)
        res.status(404).json({error: error.message })
    }
};

module.exports = {updateProductHandler}