const { Router } = require("express");
const {
  createOrderPayment,
  receiveWebhook,
} = require("../controllers/MercadoPago/paymentController");

// const {createOrderHandler} = require("../handlers/MercadoPago/createOrderHandler");

const mercadoPago = Router();

mercadoPago.post("/create-order", createOrderPayment);

mercadoPago.get("/success", (req, res) => {
  res.redirect("http://localhost:5173/success");
});
mercadoPago.get("/failure", (req, res) => {
  res.redirect("http://localhost:5173/failure");
});
mercadoPago.get("/pending", (req, res) => {
  res.send("pago pendiente");
});

mercadoPago.post("/webhook", receiveWebhook);

// receiveWebhook
// mercadoPago.post("/payment", createOrderHandler);

module.exports = mercadoPago;
