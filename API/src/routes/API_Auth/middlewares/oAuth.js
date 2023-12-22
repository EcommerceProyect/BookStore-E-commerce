var axios = require("axios");

const tokenEndpoint = "https://ambient-coder.us.auth0.com/oauth/token";

 let oAuth = (req, res, next) => {
  var code = req.query.code;

  if(!code) {
    res.status(401).send("Missing authorization code");
  }


  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("client_id", "ihbSNJFDpF9CgJC47ykNSKevrzVkb2OR");
  params.append("client_secret", "BKYauLUaQ2VA7LZw4YXLBq2IW35mmOxBtc2Ghuyex8A5IXyhRLxgiCHcFNvE34ky")
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

module.exports = {oAuth};