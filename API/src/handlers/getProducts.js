const {getAllProducts} = require("../controllers/getAllProducts");
const {getAllProductsLimit} = require("../controllers/getAllProductsLimit");

//toma los productos por partes si se le especifico una pagina por query

const getProducts = async (req,res) =>{

    const {page} = req.query;

    try {
        
        if(page){
            
            const limitResponse = await getAllProductsLimit(page);
            
            res.status(200).json(limitResponse);
            
        }else{
            
            const response = await getAllProducts();
            
            res.status(200).json(response);

        }

    } catch (error) {
     
        res.status(500).json(error.message);

    }

}

module.exports = {
    getProducts,
}