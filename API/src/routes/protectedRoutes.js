/* eslint-disable no-undef */
const {Router} = require("express");
const router = Router();
// const { auth } = require('express-oauth2-jwt-bearer');
const {expressjwt} = require("express-jwt");
const jwts = require("jwks-rsa");

const jwtCheck = expressjwt({
    secret:jwts.expressJwtSecret({
        cache:true,
        rateLimit:true,
        jwksRequestsPerMinute:5,
        jwksUri:"https://dev-sxyz47kmh4sumndv.us.auth0.com/.well-known/jwks.json"
    }),
    audience:"http://localhost:5432",
    issuer: 'https://dev-sxyz47kmh4sumndv.us.auth0.com/',
    algorithms: ['RS256']
})

  
router.get('/authorized', jwtCheck, (req, res) => {
    res.send('Secured Resource');
});

router.get('/',jwtCheck,(req, res) => {

    console.log("AAAAAAAAA");
    res.send("Privada");
});

module.exports = router;
