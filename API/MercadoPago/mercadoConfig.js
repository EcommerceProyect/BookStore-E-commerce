const Mercado_Pago = require("mercadopago");
require("dotenv").config();

const getMercadoConfig = () => {
  // eslint-disable-next-line no-undef
  const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
  console.log("ACCESS_TOKEN", ACCESS_TOKEN);
  // console.log(Mercado_Pago)
  Mercado_Pago.configure({
    access_token: ACCESS_TOKEN,
  });
  return Mercado_Pago;
};

module.exports = getMercadoConfig;
