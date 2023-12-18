const {filterProductByDateController} = require("../../controllers/filterController/filterProductByDateController");

const filterProductByDate = async (req,res) =>{

    const {rDate} = req.query;

    try {
        
        const response = await filterProductByDateController(rDate);

        res.status(200).json(response);

    } catch (error) {
        res.status(500).json(error.message);
    }

}

module.exports= {
    filterProductByDate,
}