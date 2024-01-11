const { Router } = require("express");
const {
  createOrderPayment,
  receiveWebhook,
} = require("../controllers/MercadoPago/paymentController");

// const {createOrderHandler} = require("../handlers/MercadoPago/createOrderHandler");

const mercadoPago = Router();

mercadoPago.post("/create-order", createOrderPayment);

mercadoPago.get("/success", (req, res) => {
  res.send("creado con exito");
});
mercadoPago.get("/failure", (req, res) => {
  res.send("fallo en el pago");
});
mercadoPago.get("/pending", (req, res) => {
  res.send("pago pendiente");
});

mercadoPago.post("/webhook", receiveWebhook);

// receiveWebhook
// mercadoPago.post("/payment", createOrderHandler);

module.exports = mercadoPago;
