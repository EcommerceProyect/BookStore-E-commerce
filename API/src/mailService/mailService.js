const nodemailer = require ("nodemailer");
const dotenv = require ("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: process.env.EMAIL_HOST,
    port: "587",
    secure: false,
    tls: {
      ciphers: "TLS_AES_256_GCM_SHA384",
      rejectUnauthorized: false,
    },
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  


async function registrationMail(custom_email_claim){
  return await transporter.sendMail({
    from:"Librería Apolo <ebookstoreapolo@gmail.com>",
    to:custom_email_claim,
    subject:"Bienvenido/a a Apolo!",
    html: registrationMailHTML()
  })
}

function registrationMailHTML(){
  return `
  <!DOCTYPE html>
<html lang="es">
<head>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f9f9f9;
    }
    .container {
      max-width: 600px;
      margin: auto;
      background-color: #fff;
      padding: 20px;
      border-radius: 4px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .logo {
      text-align: center;
      margin-bottom: 20px;
    }
    button {
      style: none;
      display: block;
      width: 200px;
      margin: 20px auto;
      padding: 10px 15px;
      font-size: 16px;
      color: #fff;
      background-color: #590925;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      text-decoration: none;
      text-align: center;
    }
    hr {
      border: 0;
      border-top: 1px solid #ccc;
      margin: 20px 0;
    }
    .social-icons {
      text-align: center;
      font-size: 12px;
      margin-top: 20px;
    }
.social-img{
padding-left: 12px}
    .social-icons a {
      margin: 0 5px;
    }
    .contact-text {
text-align: center;
      font-size: 12px;
      color: #888;
    }
  </style>
</head>
<body>
  <table class="container" cellspacing="0" cellpadding="0">
    <tr>
      <td class="logo">
        <img href="https://frontend-b33g.onrender.com/" src="rutadelogo.jpg" alt="Logo de Librería Apolo" width="200">
        <hr>
      </td>
    </tr>
    <tr>
      <td>
        <h1 style="color: #590925;">Registro exitoso - Librería Apolo</h1>
        <p>¡Bienvenido a <strong>Librería Apolo!</strong> Hemos registrado una cuenta con esta dirección de correo electrónico.</p>
        <p>Ya eres parte de nuestra comunidad de lectores y puedes perderte en nuestras estanterías virtuales y escoger cuál es la próxima historia de la que formarás parte.</p>
        <a href="https://frontend-b33g.onrender.com/">
          <button>Ingresar a la página</button>
        </a>
        <p>Atentamente,</p>
        <p>El equipo de Librería Apolo</p>
        <hr>
        <p class="contact-text">Contáctanos</p>
        <div class="social-icons">
<img class="social-img" height="32" width="32"src="https://cdn-icons-png.flaticon.com/512/59/59439.png"></img>
<img class="social-img" height="32" width="32" src="https://cdn-icons-png.flaticon.com/512/87/87390.png"></img>
<img class="social-img" height="32" width="32" src="https://cdn-icons-png.flaticon.com/512/152/152810.png"></img>
<img class="social-img" height="32" width="32" src="https://cdn-icons-png.flaticon.com/512/1617/1617541.png"></img>
<img class="social-img" height="32" width="32" src="https://cdn-icons-png.flaticon.com/512/561/561127.png"></img>

        </div>
      </td>
    </tr>
  </table>
</body>
</html>

  `
}

async function successfulPurchase(email){
    return await transporter.sendMail({
      from:"Librería Apolo <ebookstoreapolo@gmail.com>",
      to:email,
      subject:"Compra registrada con éxito",
      html: successfulPurchaseHTML()
    })
  }

  function successfulPurchaseHTML(){
    return `
    <!DOCTYPE html>
<html lang="es">
<head>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f9f9f9;
    }
    .container {
      max-width: 600px;
      margin: auto;
      background-color: #fff;
      padding: 40px;
      border-radius: 4px;
      margin-top: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    h1 {
      color: #590925;
    }
    .info-section {
      margin-bottom: 20px;
    }
    strong {
      color: #590925;
    }
    img.logo {
      width: 200px;
      display: block;
      margin: auto;
      margin-bottom: 20px;
    }
    button {
      display: block;
      width: 200px;
      margin: 20px auto;
      padding: 10px 15px;
      font-size: 16px;
      color: #fff;
      background-color: #590925;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      text-decoration: none;
      text-align: center;
    }
    hr {
      border: 0;
      border-top: 1px solid #ccc;
      margin: 20px 0;
    }
    .social-icons {
      text-align: center;
      font-size: 12px;
      margin-top: 20px;
    }
    .social-img {
      padding-left: 12px;
    }
    .contact-text {
      text-align: center;
      font-size: 12px;
      color: #888;
    }
  </style>
</head>
<body>
  <div class="container">
<img class="logo" src="rutadelogo.jpg" alt="Logo de Librería Apolo">
<hr>
    <h1>¡Compra exitosa!</h1>
    <div class="info-section">
      <p>Estimado/a,</p>
      <p>Tu pago ha sido procesado con éxito a través de Mercado Pago.</p>
    </div>
    <div class="info-section">
      <p>Detalles de la compra:</p>
      <ul>
        <li>Producto: <strong>Nombre de los libros</strong></li>
        <li>Monto: <strong>$XX.XX</strong></li>
        <li>Fecha: <strong>Fecha de la Compra</strong></li>
      </ul>
    </div>
    <div class="info-section">
      <p>¡Gracias por tu compra!</p>
      <p>Si tienes alguna consulta, no dudes en contactarnos.</p>
    </div>
    
    <p>Atentamente,</p>
    <p>El equipo de Librería Apolo</p>
    <hr>
    <p class="contact-text">Contáctanos</p>
    <div class="social-icons">
      <img class="social-img" height="32" width="32" src="https://cdn-icons-png.flaticon.com/512/59/59439.png">
      <img class="social-img" height="32" width="32" src="https://cdn-icons-png.flaticon.com/512/87/87390.png">
      <img class="social-img" height="32" width="32" src="https://cdn-icons-png.flaticon.com/512/152/152810.png">
      <img class="social-img" height="32" width="32" src="https://cdn-icons-png.flaticon.com/512/1617/1617541.png">
      <img class="social-img" height="32" width="32" src="https://cdn-icons-png.flaticon.com/512/561/561127.png">
    </div>
  </div>
</body>
</html>
`
  }

  module.exports = { registrationMail, successfulPurchase };