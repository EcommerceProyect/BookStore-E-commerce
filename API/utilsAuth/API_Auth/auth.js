/* eslint-disable no-undef */
const express = require("express");
const axios = require("axios");
const port = process.env.PORT || 3001;
const oAuth = require("./middlewares/oAuth");
const app = express();
const cors = require("cors")

const challengesAPIEndpoint = "http://localhost:5432/authorized";


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
