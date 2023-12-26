require("dotenv").config();
const axios = require("axios");

const {CLIENT_SECRET} = process.env;


const tokenEndpoint = "https://dev-s3pcs1ovog464bay.us.auth0.com/oauth/token";

let oAuth = (req, res, next) => {
  var code = req.query.code;

  if(!code) {
    res.status(401).send("Missing authorization code");
  }

  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("client_id", "V1mOd1KV60WmMBdH9Lgw8vWWCEH7koDY");
  params.append("client_secret", "ym8UEKrhfdmcTeNEF7utwMMxgWBWHDYhWoofbuaKyf29SEfs3IP6u9soMtUsByYD")
  params.append("code", code);
  params.append("redirect_uri", "http://localhost:5173/challenges");

  axios.post(tokenEndpoint, params)
  .then(response => {
    req.oauth = response.data;
    next();
  })
  .catch(err => {
    console.log(err);
    res.status(403).json(`Reason: ${err.message}`);
  })
}

module.exports = oAuth;