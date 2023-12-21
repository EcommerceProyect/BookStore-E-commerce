/* eslint-disable no-undef */
const express = require('express');
const bodyParser = require("body-parser");
const morgan = require('morgan');
const cookieParser = require('cookie-parser'); 
const { auth } = require('express-openid-connect');
const {BASE_URL,SECRET,CLIENT_ID,ISSUER_BASE_URL,CLIENT_SECRET} = process.env;
//autenticacion para roles

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: SECRET,
  baseURL: BASE_URL,
  clientID: CLIENT_ID,
  issuerBaseURL: ISSUER_BASE_URL,
  clientSecret: CLIENT_SECRET,
  authorizationParams: {
    response_type: "code",
    audience: "http://localhost:5432",
    scope: "openid profile email",
  },
};
//middlewares
const routes = require("./routes/indexRoutes.js");
const authRouter = require("./routes/authRoutes.js");
const protectedRoutes = require("./routes/protectedRoutes.js");

const app = express();

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(morgan('dev'));
  // res.header('Access-Control-Allow-Origin',"*"); 
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin',"http://localhost:5173"); // REEMPLAZAR POR  http://localhost:5173 SI ESTAS DE FORMA LOCAL update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


app.use("/ebook",routes);

//protected
app.use(auth(config));

app.use("/protected",protectedRoutes);

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use("/",authRouter);


// error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = app;
