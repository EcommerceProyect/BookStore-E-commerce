const mercadopago = require("mercadopago");

require("dotenv").config();
// eslint-disable-next-line no-undef
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
//* pasar credenciales de mp
mercadopago.configure({
  access_token: ACCESS_TOKEN,
});

//*preferencia = { }
const createOrder = (req, res) => {
  //   const { items } = req.body;

  const { id, title, synopsis, image, price } = req.body;
//   let multiPreference = {
//     items: items.map((item) => ({
//       id: item.id,
//       title: item.title,
//       quantity: item.quantity,
//       unit_price: item.unit_price,
//       currency_id: item.currency_id,
//       picture_url: item.picture_url,
//       description: item.description,
//     })),
//     back_urls: {
//       success: "http://localhost:3002/payment/success",
//       failure: "http://localhost:3002/payment/failure",
//       pending: "http://localhost:3002/payment/pending",
//     },
//   };
  let preference = {
    items: [
      {
        id: id,
        title: title,
        quantity: 1,
        unit_price: price,
        currency_id: "ARS",
        picture_url: image,
        synopsis: synopsis,
      },
    ],
    back_urls: {
      success: "http://localhost:5432/payment/success",
      failure: "http://localhost:5432/payment/failure",
      pending: "http://localhost:5432/payment/pending",
    },
  };

  mercadopago.preferences
    .create(preference)
    .then((response) => res.status(200).json(response))
    .catch((error) => res.status(400).json({ message: error.message }));
};

module.exports = {createOrder};