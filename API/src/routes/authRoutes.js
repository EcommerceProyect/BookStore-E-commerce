/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
require("dotenv").config();
const axios = require("axios");
const {Router} = require("express");
const {requiresAuth} = require("express-openid-connect");
const { postUser } = require("../handlers/Users/postUser");
const router = Router();

router.post("/user",(req,res)=>{
  if(req.oidc.isAuthenticated())postUser(req,res);
  else res.status(500).json({message:"No se a iniciado la secion"})
});

router.get("/login",(req,res) => {
  console.log(req.oidc.isAuthenticated())
})

router.get('/profile', requiresAuth(), async (req, res) => {

  const { token_type, access_token } = req.oidc.accessToken;

  
  try {
    const response = await axios.get(
      'http://localhost:5432/protected',
      {
        headers: {
          authorization: `${token_type} ${access_token}`
        }
      }
    );

    console.log(req.oidc.user)
    const { data } = response;
    
    return res.status(200).json(data);
} catch (error) {
    console.log(error.message)
}
  
});


module.exports = router;
