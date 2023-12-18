const { Router } = require("express");
const { getProducts } = require("../handlers/getProducts");
const {createProduct} = require("../handlers/createProduct");
const {filterProductByISBN} = require("../handlers/filterProductByISBN");
const router = Router();

router.post("/products",createProduct)

router.get("/products",getProducts);

//ACA TENDRIA QUE IR LA RUTA DEL FILTRO POR ISBN. Creo yo que seria algo asi.
router.get("/products/filter/:isbn", (req,res) => {
    const {isbn} = req.params;
    if (isbn) filterProductByISBN(req,res);
})

//get de entidades 
router.get("/genres",getGenres);
router.get("/authors",getAuthors);
router.get("/editorials",getEditorials);
router.get("/ISBNs",getISBNs);

// router.get("/user",getUser());

module.exports = router;