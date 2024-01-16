const {filterProductsController} = require("../controllers/filterProductsController")


const filterProducts = async (req,res) => {
   try {
    const {rDate,genre,author,editorial, title, isbn, page, sortField, sortAction,deleted} = req.query;
    const filters = {
        genre,
        rDate,
        author,
        editorial,
        title,
        isbn
    }
    const sort = {
        sortField: sortField ? sortField.toLowerCase() : undefined,
      sortAction: sortAction ? sortAction.toUpperCase() : undefined,
    }

    const pageNumber = parseInt(page) || 0;
    const response = await filterProductsController(filters,sort,pageNumber,deleted);
    res.status(200).json(response);

   } catch (error) {
    res.status(500).json(error.message);
   }
}

module.exports = {
    filterProducts
}