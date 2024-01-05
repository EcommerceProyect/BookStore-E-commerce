const mercadopago = require("mercadopago");
require("dotenv").config();
const { Orders, ISBN, Cart } = require("../../db");

let products = [];
let idCarrito = "";
let address = "calle 1 # 2-3";
let amount = 0;
const createOrderPayment = async (req, res) => {
  mercadopago.configure({
    access_token: process.env.ACCESS_AR_TOKEN,
  });
  console.log("tokenARG", process.env.ACCESS_AR_TOKEN);
  //por ahora se quitara shippingAddress
  const { cartId, books, totalAmount } = req.body;
  idCarrito = cartId;
  // address = shippingAddress;
  products = books;
  amount = totalAmount;
  const preference = {
    items: products.map((book) => ({
      id: book.id,
      title: book.title,
      quantity: book.quantity,
      unit_price: book.price,
      currency_id: "ARS",
    })),
    back_urls: {
      success: "http://localhost:3002/mercadoPago/success",
      failure: "http://localhost:3002/mercadoPago/failure",
      pending: "http://localhost:3002/mercadoPago/pending",
    },
    notification_url:
      "https://1qw6hp6g-3002.brs.devtunnels.ms/mercadoPago/webhook",
  };

  const result = await mercadopago.preferences.create(preference);
  res.status(200).json(result.body.init_point);
};

const receiveWebhook = async (req, res) => {
  console.log("received webhook");
  try {
    const payment = req.query;
    if (payment.type === "payment") {
      const data = await mercadopago.payment.findById(payment["data.id"]);
      console.log("data", data);
      if (data.response.status === "approved") {
        const order = await Orders.create({
          OrderDate: new Date(),
          shippingAddress: address,
          totalAmount: amount,
          CartId: idCarrito,
        });
        // Obtener libros por sus ISBNs
        const isbnPromises = products.map(async (book) => {
          const isbnData = await ISBN.findOne({
            where: {
              ISBNId: book.id,
            },
          });
          // Restar el stock según la cantidad de libros comprados
          if (isbnData) {
            await ISBN.update(
              { stock: isbnData.stock - book.quantity },
              { where: { ISBNId: book.id } }
            );
          }
        });

        // Esperar a que todas las consultas de actualización de stock se completen
        await Promise.all(isbnPromises);
        await Cart.update(
            { status: "Inactivo" },
            { where: { id: idCarrito } }
          );
  
        return res
          .status(200)
          .json({ message: "Order created successfully.", orderId: order.id });
      }
    }
    res.status(204).json({ message: "No content to send." });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500).json({ error: error.message });
  }
};

module.exports = { createOrderPayment, receiveWebhook };

