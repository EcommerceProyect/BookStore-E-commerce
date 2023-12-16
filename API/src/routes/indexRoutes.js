const { Router } = require("express");
const { getProducts } = require("../handlers/getProducts");
const {createProduct} = require("../handlers/createProduct");
const { filterProductByDate } = require("../handlers/filterHandler/filterProductByDate");
const router = Router();

router.post("/products",createProduct)

router.get("/products",getProducts);

//filter by releaseDate

router.get("/products/filter",filterProductByDate);

// router.get("/user",getUser());

module.exports = router;