require("dotenv").config();
const axios = require("axios");

const { CLIENT_SECRET, GRANT_TYPE, CLIENT_ID, TOKEN_ENDPOINT, REDIRECT_URI } = process.env


let oAuth = (req, res, next) => {
  let code = req.query.code;
  
  if(!code) {
    res.status(401).send("Missing authorization code");
  }


  const params = new URLSearchParams();
  params.append("grant_type", `${GRANT_TYPE}`);
  params.append("client_id", `${CLIENT_ID}`);
  params.append("client_secret", `${CLIENT_SECRET}`)
  params.append("code", `${code}`);
  params.append("redirect_uri", `${REDIRECT_URI}`);


  axios.post(TOKEN_ENDPOINT, params)
  .then(response => {
    req.oauth = response.data;
    next();
  })
  .catch(err => {
    res.status(403).json(`Reason: ${err.message}`);
  })
}

module.exports = oAuth;