require("dotenv").config();
const axios = require("axios");

const { CLIENT_SECRET, GRANT_TYPE, CLIENT_ID, TOKEN_ENDPOINT, REDIRECT_URI } =
  process.env;

const tokenEndpoint = `${TOKEN_ENDPOINT}`;

let oAuth = async (req, res, next) => {
  const { code, token } = req.query;

  // if (!code) {
  //   res.status(401).send("Missing authorization code");
  // }
  if (token) {
    return next();
  }
  const params = new URLSearchParams();
  params.append("grant_type", `${GRANT_TYPE}`);
  params.append("client_id", `${CLIENT_ID}`);
  params.append("client_secret", `${CLIENT_SECRET}`);
  params.append("code", code);
  params.append(
    "scope",
    "user:edit read:roles update:users create:role_members"
  );
  params.append("redirect_uri", `${REDIRECT_URI}`);

  axios
    .post(tokenEndpoint, params)
    .then((response) => {
      console.log(response);
      req.oauth = response.data;
      next();
    })
    .catch((error) => {
      res.status(403).json(`Reason: ${error.message}`);
      next(error);
    });
};

module.exports = oAuth;
