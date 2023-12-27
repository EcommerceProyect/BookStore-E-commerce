const { Router } = require("express");
const { getProducts } = require("../handlers/getProducts");
const {createProduct} = require("../handlers/createProduct");
// const {filterProductByISBN} = require("../handlers/filterHandler/filterProductByISBN");
// const {filterProductByGenre} = require("../handlers/filterHandler/filterProductByGenre");
// const {filterProductByDate} = require("../handlers/filterHandler/filterProductByDate");
// const { filterProductByAuthor } = require("../handlers/filterHandler/filterProductByAuthor");
// const { filterBySearchTerm } = require("../handlers/filterHandler/filterBySearchTerm");
// const { filterProductByEditorial } = require("../handlers/filterHandler/filterProductByEditorial");
const { deleteProduct } = require("../handlers/deleteProduct");
const { getGenres } = require("../handlers/Products/getGenres");
const { getAuthors } = require("../handlers/Products/getAuthors");
const { getEditorials } = require("../handlers/Products/getEditorials");
const { getISBNs } = require("../handlers/Products/getISBNs");

//FILTROS COMBINADOS.
const { filterProducts } = require("../handlers/filterProducts");
const { updateProductHandler } = require("../handlers/updateProduct");
const {getProductByIdHandler} = require("../handlers/getDetailProduct");

const router = Router();


//iniciando filtro Authors y Editorials paginado
// router.get("/products/filter",(req,res) =>{
//     const {rDate,genre,author,editorial, title, isbn} = req.query;
//     if(rDate)filterProductByDate(req,res);
//     else if(genre)filterProductByGenre(req,res);
//     else if(isbn)filterProductByISBN(req,res)
//     else if(author)filterProductByAuthor(req,res);
//     else if(editorial)filterProductByEditorial(req,res);
//     else if(title)filterBySearchTerm(req,res);
// });

router.get("/products/filterPrueba", (req,res) => filterProducts(req, res));

//get de entidades 
router.get("/genres",getGenres);
router.get("/authors",getAuthors);
router.get("/editorials",getEditorials);
router.get("/ISBNs",getISBNs);

// router.get("/user",getUser());

//delete product

router.post("/products",createProduct)

router.get("/products",getProducts);

router.get("/products/:id",getProductByIdHandler);

router.put("/products/:id",updateProductHandler);

router.delete("/products/:id", deleteProduct);


module.exports = router;