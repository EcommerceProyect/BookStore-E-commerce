const { Router } = require("express");
const { getProducts } = require("../handlers/getProducts");
const {createProduct} = require("../handlers/createProduct");
const {filterProductByISBN} = require("../handlers/filterProductByISBN");
const {filterProductByGenre} = require("../handlers/filterHandler/filterProductByGenre");
const {filterProductByDate} = require("../handlers/filterHandler/filterProductByDate");
const { getGenres } = require("../handlers/Products/getGenres");
const { getAuthors } = require("../handlers/Products/getAuthors");
const { getEditorials } = require("../handlers/Products/getEditorials");
const { getISBNs } = require("../handlers/Products/getISBNs");
const { updateProductHandler } = require("../handlers/updateProduct");

const router = Router();

router.post("/products",createProduct)

router.get("/products",getProducts);

router.put("/products/:id",updateProductHandler)


router.get("/products/filter",(req,res) =>{
    const {rDate,genre,isbn} = req.query;
    if(rDate)filterProductByDate(req,res);
    else if(genre)filterProductByGenre(req,res);
    else if(isbn)filterProductByISBN(req,res)
});
//get de entidades 
router.get("/genres",getGenres);
router.get("/authors",getAuthors);
router.get("/editorials",getEditorials);
router.get("/ISBNs",getISBNs);

// router.get("/user",getUser());

module.exports = router;