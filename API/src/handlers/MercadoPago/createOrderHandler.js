const {
  createOrderController,
} = require("../../controllers/MercadoPago/createOrderController");

const createOrderHandler = async (req, res) => {
  try {
    // books es un array de objetos, contiene los libros que se van a comprar
    const books = req.body;
    const response = await createOrderController(books);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createOrderHandler };

// let preference = {
//   items: [
//     {
//       id: id,
//       title: title,
//       quantity: 1,
//       unit_price: price,
//       currency_id: "ARS",
//       picture_url: image,
//       synopsis: synopsis,
//     },
//   ],
//   back_urls: {
//     success: "http://localhost:5432/payment/success",
//     failure: "http://localhost:5432/payment/failure",
//     pending: "http://localhost:5432/payment/pending",
//   },
// };
// const mercadoConfig = getMercadoConfig();
// mercadoConfig.preferences
//   .create(preference)
//   .then((response) => res.status(200).json(response))
//   .catch((error) => res.status(400).json({ message: error.message }));

// let multiPreference = {
//   items: items.map((item) => ({
//     id: item.id,
//     title: item.title,
//     quantity: item.quantity,
//     unit_price: item.unit_price,
//     currency_id: item.currency_id,
//     picture_url: item.picture_url,
//     description: item.description,
//   })),
//   back_urls: {
//     success: "http://localhost:3002/payment/success",
//     failure: "http://localhost:3002/payment/failure",
//     pending: "http://localhost:3002/payment/pending",
//   },
// };
