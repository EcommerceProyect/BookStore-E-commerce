/* eslint-disable no-undef */
const {Router} = require("express");
const router = Router();
const guard = require("express-jwt-permissions")();//agregar () !!!!!
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
router.use(jwtCheck);
router.get('/',guard.check(["admin:admin"]),(req, res) => {
    res.json({challenge1: "this is the first challenge",
    challenge2: "the second challenge"})
});

module.exports = router;
