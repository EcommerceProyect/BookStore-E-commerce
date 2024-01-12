/* eslint-disable no-undef */
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
//autenticacion para roles

//middlewares
const routes = require("./routes/indexRoutes.js");
const protectedRoutes = require("./routes/protectedRoutes.js");
const mercadoPago = require("./routes/mercadoPagoRoutes.js");

const app = express();

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  // res.header('Access-Control-Allow-Origin',"http://localhost:5173"); // REEMPLAZAR POR  http://localhost:5173 SI ESTAS DE FORMA LOCAL update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/ebook", routes);

app.use("/mercadoPago", mercadoPago);
//protected
app.use("/", protectedRoutes);

// error handler
app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = app;
