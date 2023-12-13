const { Router } = require("express");
const { getProducts } = require("../handlers/getProducts");
const {createProduct} = require("../handlers/createProduct");
const router = Router();

router.post("/products",createProduct)

router.get("/products",getProducts);

// router.get("/user",getUser());

module.exports = router;