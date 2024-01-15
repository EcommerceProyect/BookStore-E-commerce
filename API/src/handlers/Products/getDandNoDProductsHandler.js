const { getDandNoDProductsController } = require("../../controllers/Products/getDandNoDProductsController");

const getDandNoDProductsHandler = async (req,res) =>{

    const {page} = req.query;

    try {
        
            
        const limitResponse = await getDandNoDProductsController(page);
            
        res.status(200).json(limitResponse);

    } catch (error) {
     
        res.status(500).json(error.message);

    }

}

module.exports={
    getDandNoDProductsHandler
}