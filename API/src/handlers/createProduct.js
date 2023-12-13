const { createProductController } = require("../controllers/createProductController");


const createProduct = async (req,res) =>{

    const data = req.body;

    try {

        const response = await createProductController(data);

        res.status(200).json({message:"libro posteado",created:response});
        
    } catch (error) {
        res.status(500).json(error.message)
    }

}

module.exports = {
    createProduct
}