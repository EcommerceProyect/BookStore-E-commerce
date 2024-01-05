// const mercadopago = require("mercadopago");
const getMercadoConfig = require("../../../MercadoPago/mercadoConfig");
// eslint-disable-next-line no-undef
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

const createOrderController = async (books) => {
  try {
    console.log("books", books);
    console.log(ACCESS_TOKEN, "soyDEV");
    // let data = books;
    const preference = {
      items: books.map((book) => ({
        id: book.id,
        title: book.title,
        quantity: book.quantity,
        unit_price: book.price,
        currency_id: "ARS",
      })),
      back_urls: {
        success: "http://localhost:3001/success",
        failure: "http://localhost:3001/failure",
        pending: "http://localhost:3001/payment/pending",
      },

      // notification_url: `${
      //   ACCESS_TOKEN === "development"
      //     ? `https://1qw6hp6g-3001.brs.devtunnels.ms/payment/webhook`
      //     : `PARAELDEPLOY/payment/webhook`
      // }`,
    };
    const mercadoConfig = getMercadoConfig();
    const result = await mercadoConfig.preferences.create(preference);
    // console.log("result", result);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

// const receiveWebhook = async (req, res) => {
//   const payment = req.query;
//   console.log(payment.type);
// };
module.exports = {
  createOrderController,
  // receiveWebhook
};

// notification_url: `${
//   DEV === "development"
//     ? `${PORTS_SERVER}/payment/webhook`
//     : `${BE_DEPLOY}/payment/webhook`
// }`,
//   "https://1qw6hp6g-3001.brs.devtunnels.ms/payment/webhook";
