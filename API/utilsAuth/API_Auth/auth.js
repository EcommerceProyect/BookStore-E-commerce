var express = require("express");
var axios = require("axios");
var port = process.env.PORT || 3001;
var oAuth = require("./middlewares/oAuth");
var app = express();
const cors = require("cors")

const challengesAPIEndpoint = "http://localhost:5432/authorized";
const authProfile = "https://dev-s3pcs1ovog464bay.us.auth0.com/userinfo";

app.use(cors())
app.use(oAuth);

app.get("/authorized", async (req, res) => {
  try {
    const { access_token } = req.oauth;


    const response = await axios({
      method: "get",
      url: challengesAPIEndpoint,
      headers: { Authorization: `Bearer ${access_token}` },
    });
    res.json(response.data);
  } catch (error) {
    console.log(error);
    if (error.response.status === 401) {
      res.status(401).json("Unauthorized to access data");
    } else if (error.response.status === 403) {
      res.status(403).json("Permission denied");
    } else {
      res.status(500).json("Whoops, something went wrong");
    }
  }
});


app.listen(port, () => console.log("Started"));
