const { Router } = require("express");
// const cors = require("cors");
const { getProducts } = require("../handlers/getProducts");
const { createProduct } = require("../handlers/createProduct");
const { deleteProduct } = require("../handlers/deleteProduct");
const { getGenres } = require("../handlers/Products/getGenres");
const { getAuthors } = require("../handlers/Products/getAuthors");
const { getEditorials } = require("../handlers/Products/getEditorials");
const { getISBNs } = require("../handlers/Products/getISBNs");

//FILTROS COMBINADOS.
const { filterProducts } = require("../handlers/filterProducts");
//-------------------------------------------------------------------------//
const { updateProductHandler } = require("../handlers/updateProduct");
const { getProductByIdHandler } = require("../handlers/getDetailProduct");
const {
  updateAuthorHandler
} = require("../handlers/UpdateInfoHandler/updateAuthorHandler");
const {
  updateGenreHandler
} = require("../handlers/UpdateInfoHandler/updateGenreHandler");
const {
  updateEditorialHandler
} = require("../handlers/UpdateInfoHandler/updateEditorialHandler");
const {
  updateReleasedDateHandler
} = require("../handlers/UpdateInfoHandler/updateReleasedDateHandler");
const { updateUserHandler } = require("../handlers/Users/updateUserHandler");
const { deleteUserHandler } = require("../handlers/Users/deleteUser");
const { createOrderHandler } = require("../handlers/Orders/postOrdersHandler");
const { getOrdersHandler } = require("../handlers/Orders/getOrdersHandler");
const { deleteOrderHandler } = require("../handlers/Orders/deleteOrdersHandler");
const { updateOrderHandler } = require("../handlers/Orders/updateOrdersHandler");
const { updateISBNHandler } = require("../handlers/UpdateInfoHandler/updateISBNHandler");
const {getUser_Token} = require("../handlers/Users/getUser_Token");
const { createCartHandler } = require("../handlers/Cart/createCartHandler");
const { getActiveCartHandler } = require("../handlers/Cart/getActiveCartHandler");
const { getProductsForSearchHandler } = require("../handlers/getProductsForSearchHandler");
const {postUserPruebaController} = require("../controllers/MercadoPago/postUserPruebaController");
const {  createProductReview } = require("../handlers/Reviews/createReviews");
const { addToCartHandler } = require("../handlers/Cart/addToCartHandler");
const { deleteProductCartHandler } = require("../handlers/Cart/deleteProductCartHandler");
const { updateReviewHandler } = require("../handlers/Reviews/updateReviews");
const { deleteReviewHandler } = require("../handlers/Reviews/deleteReviews");
const { getAllReviewsHandler } = require("../handlers/Reviews/getReviews");
const {getProductReviewsAverageRatingHandler} = require("../handlers/Reviews/getReviewsAverage");

const router = Router();

router.get("/products/filterPrueba", (req, res) => filterProducts(req, res));

//get de entidades
router.get("/genres", getGenres);
router.get("/authors", getAuthors);
router.get("/editorials", getEditorials);
router.get("/ISBNs", getISBNs);

// router.get("/user",getUser());

//delete product
router.get("/products/search", getProductsForSearchHandler);

router.post("/products", createProduct);

router.post("/orders", createOrderHandler);



router.get("/products", getProducts);

router.get("/orders", getOrdersHandler);

router.get("/products/:id", getProductByIdHandler);

router.put("/products/:id", updateProductHandler);
router.put("/user/:id", updateUserHandler);

router.put("/author/:id", updateAuthorHandler);

router.put("/genre/:id", updateGenreHandler);

router.put("/editorial/:id", updateEditorialHandler);

router.put("/releasedDate/:id", updateReleasedDateHandler);

router.put("/ISBN/:id", updateISBNHandler);

router.put("/orders/:id", updateOrderHandler);

router.delete("/products/:id", deleteProduct);
router.delete("/user/:id", deleteUserHandler);
router.delete("/orders/:id", deleteOrderHandler);

//Users

router.get("/user", getUser_Token);

//prueba rutas Users de Gena
router.put("/user/:id", updateUserHandler);
router.delete("/user/:id", deleteUserHandler);


//RUTAS DEL CARRITO

router.get("/getActiveCart/:userId", getActiveCartHandler);
router.post("/createCart", createCartHandler);
router.put("/addToCart", addToCartHandler );
router.delete("/deleteProductCart/:userId/:productId", deleteProductCartHandler);


//RUTAS PARA LAS REVIEWS
router.get("/reviews", getAllReviewsHandler);
//Ruta para el promedio de las reviews un producto
router.get("/reviews/average/:productId", getProductReviewsAverageRatingHandler);
router.post("/reviews", createProductReview);
router.put("/reviews/:id", updateReviewHandler);
router.delete("/reviews/:id", deleteReviewHandler);


//Creacion de User Momentanea

router.post("/usersPrueba", postUserPruebaController);


module.exports = router;


