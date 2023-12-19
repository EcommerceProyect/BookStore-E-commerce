/* eslint-disable no-undef */
require("dotenv").config();
const {Router} = require("express");
const router = Router();
const { auth } = require("express-oauth2-jwt-bearer");
const {API_ID_IDENTIFIER,AUTH_DOMAIN} = process.env;

const checkJwt = auth({
    audience:API_ID_IDENTIFIER,
    issuerBaseURL:AUTH_DOMAIN,
  });

router.use(checkJwt)

router.get("/login",(req,res) => {
    res.status(200).json({message:"Esta ruta esta Protegida"})
})

module.exports = router;
