const { Router } = require("express");
const { getProducts } = require("../handlers/getProducts");
const {createProduct} = require("../handlers/createProduct");
const { filterProductByDate } = require("../handlers/filterHandler/filterProductByDate");
const { filterProductByGenre } = require("../handlers/filterHandler/filterProductByGenre");
const { getGenres } = require("../handlers/Products/getGenres");
const { getAuthors } = require("../handlers/Products/getAuthors");
const { getEditorials } = require("../handlers/Products/getEditorials");
const { getISBNs } = require("../handlers/Products/getISBNs");
const router = Router();

router.post("/products",createProduct)

router.get("/products",getProducts);

//filter by releaseDate

router.get("/products/filter",(req,res) =>{
    const {rDate,genre} = req.query;
    if(rDate)filterProductByDate(req,res);
    else if(genre)filterProductByGenre(req,res);
});

//get de entidades 
router.get("/genres",getGenres);
router.get("/authors",getAuthors);
router.get("/editorials",getEditorials);
router.get("/ISBNs",getISBNs);

// router.get("/user",getUser());

module.exports = router;