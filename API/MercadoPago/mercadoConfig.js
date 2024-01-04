const Mercado_Pago = require("mercadopago");
require("dotenv").config();


const getMercadoConfig = () => {
    // eslint-disable-next-line no-undef
const ACCESS_AR_TOKEN = process.env.ACCESS_AR_TOKEN;
console.log("ACCESS_TOKEN", ACCESS_AR_TOKEN);
// console.log(Mercado_Pago)
Mercado_Pago.configure({
    access_token: ACCESS_AR_TOKEN || "",
})
return Mercado_Pago
}

module.exports = getMercadoConfig