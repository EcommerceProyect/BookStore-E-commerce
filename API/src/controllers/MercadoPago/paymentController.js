require("dotenv").config();
const mercadopago = require("mercadopago");
const { ACCESS_AR_TOKEN, NOTIFICATION_URL, PORT,END_POINT_FRONT,END_POINT_BACK } = process.env;
const { Orders, ISBN, Cart } = require("../../db");

let products = [];
let idCarrito = "";
let address = "calle 1 # 2-3";

const createOrderPayment = async (req, res) => {
  mercadopago.configure({
    access_token: ACCESS_AR_TOKEN,
  });
  console.log("tokenARG", ACCESS_AR_TOKEN);
  //por ahora se quitara shippingAddress
  const { cartId, books } = req.body;
  idCarrito = cartId;
  // address = shippingAddress;
  products = books;

  const preference = {
    items: products.map((book) => ({
      id: book.id,
      title: book.title,
      quantity: book.quantity,
      unit_price: book.price,
      currency_id: "ARS",
    })),
    back_urls: {
      success: `${END_POINT_FRONT}`,
      failure: `${END_POINT_BACK}/mercadoPago/failure`,
      pending: `${PORT}/mercadoPago/pending`,
    },
    notification_url: `https://${NOTIFICATION_URL}/mercadoPago/webhook`,
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
        // Extraer transaction_amount
        const transactionAmount = data.response.transaction_amount;

        // Crear la orden con transactionAmount como totalAmount
        const order = await Orders.create({
          OrderDate: new Date(),
          shippingAddress: address,
          totalAmount: transactionAmount,
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
        await Cart.update({ status: "Inactivo" }, { where: { id: idCarrito } });

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
