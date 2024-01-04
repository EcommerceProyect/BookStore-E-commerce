const { Router } = require("express");
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
  updateAuthorHandler,
} = require("../handlers/UpdateInfoHandler/updateAuthorHandler");
const {
  updateGenreHandler,
} = require("../handlers/UpdateInfoHandler/updateGenreHandler");
const {
  updateEditorialHandler,
} = require("../handlers/UpdateInfoHandler/updateEditorialHandler");
const {
  updateReleasedDateHandler,
} = require("../handlers/UpdateInfoHandler/updateReleasedDateHandler");
const { updateUserHandler } = require("../handlers/Users/updateUser");
const { deleteUserHandler } = require("../handlers/Users/deleteUser");
// const { createOrderHandler } = require("../handlers/Orders/postOrdersHandler");
const { getOrdersHandler } = require("../handlers/Orders/getOrdersHandler");
const {
  deleteOrderHandler,
} = require("../handlers/Orders/deleteOrdersHandler");
const {
  updateOrderHandler,
} = require("../handlers/Orders/updateOrdersHandler");
const {
  updateISBNHandler,
} = require("../handlers/UpdateInfoHandler/updateISBNHandler");
const { getUser } = require("../handlers/Users/getUser");
const {
  getProductsForSearchHandler,
} = require("../handlers/getProductsForSearchHandler");

//rutas Carrito
const { createCartHandler } = require("../handlers/Cart/createCartHandler");
const { addToCartHandler } = require("../handlers/Cart/addToCartHandler");
const {
  deleteProductCartHandler,
} = require("../handlers/Cart/deleteProductCartHandler");
const {
  getActiveCartHandler,
} = require("../handlers/Cart/getActiveCartHandler");

//rutas Mercado Pago
const {
  createOrderHandler,
} = require("../handlers/MercadoPago/createOrderHandler");

// const { paymentWebhooks } = require("../handlers/MercadoPago/paymentWebhooks");

//ruta Usuario temporal

const { postUserPrueba } = require("../handlers/MercadoPago/postUserPrueba");

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

router.get("/user", getUser);

//prueba rutas Users de Gena
router.put("/user/:id", updateUserHandler);
router.delete("/user/:id", deleteUserHandler);

//rutas para Carrito y Mercado Pago
//RUTAS DEL CARRITO

router.get("/getActiveCart/:userId", getActiveCartHandler);
router.post("/createCart", createCartHandler);
router.put("/addToCart", addToCartHandler);
router.delete(
  "/deleteProductCart/:userId/:productId",
  deleteProductCartHandler
);

//rutas Camilo

router.post("/payment", createOrderHandler);

// router.post("/webhook", paymentWebhooks);
//

//Creacion de User Momentanea

router.post("/usersPrueba", postUserPrueba);

module.exports = router;

//

// user:{
//     idUser: "user1",
//     email: "pHqQ3@example.com",
//     password: "123456",
// }

// const User = {
//     userId = "asjdnjashdfjoenfuiwefghbgiuwe"
// }

// const {filterProductByISBN} = require("../handlers/filterHandler/filterProductByISBN");
// const {filterProductByGenre} = require("../handlers/filterHandler/filterProductByGenre");
// const {filterProductByDate} = require("../handlers/filterHandler/filterProductByDate");
// const { filterProductByAuthor } = require("../handlers/filterHandler/filterProductByAuthor");
// const { filterBySearchTerm } = require("../handlers/filterHandler/filterBySearchTerm");
// const { filterProductByEditorial } = require("../handlers/filterHandler/filterProductByEditorial");

// const objeto = {
//     idUser: "user1",
//     products: [
//         {
//             idProduct: "product1",
//             quantity: 2,
//             price: 200
//         }
//     ]
// }

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

// router.post ("/payment2", createOrderHandler);
// //Pago exitoso
// router.get("/success", (req, res) => {
//   console.log("MercadoPago DATA:", req.query);
//   // codigo: guardar en BDD
//   //modificar stock
// //   res.redirect("http://localhost:5173");
//   res.status(200).json({ message: "pago realizado" });
// });

// //Pago rechazado
// router.get("/failure", (req, res) => {
//   console.log("MercadoPago DATA:", req.query);
//   //* codigo: guardar en BDD
//   //   res.redirect('http://%27/)
//   res.status(200).json({ message: "pago rechazado" });
// });

// //Pago pendiente
// router.get("/pending", (req, res) => {
//   console.log("MercadoPago DATA:", req.query);
//   // codigo: guardar en BDD
//   //   res.redirect('http://%27/)
//   res.status(200).json({ message: "pago pendiente" });
// });
// //Integracion mercadopago
