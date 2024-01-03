const express = require("express");
const axios = require("axios");
const port = 3001;
const oAuth = require("./middlewares/oAuth");
const app = express();
const cors = require("cors");

const challengesAPIEndpoint = "http://localhost:5433/authorized";

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(oAuth);

//por params si viene una ruta se concatena para hacer la peticion correcta
app.get("/authorized", async (req, res) => {
  console.log("req.oauth:", req.oauth);
  console.log("req.query:", req.query);
  try {
    let finalToken = req.oauth ? req.oauth.access_token : req.query.token;
    console.log("Final Token:", finalToken, "yoooooooooooos");

    const route = req.query.route || "";

    let queryString = "?";

    for (const [key, value] of Object.entries(req.query)) {
      console.log(key, value);
      if (key !== "route" && key !== "code") {
        queryString += `${encodeURIComponent(key)}=${encodeURIComponent(
          value
        )}`;
      }
    }

    if (queryString === "?") queryString = "";

    queryString = queryString.slice(0, -1);

    const response = await axios({
      method: "get",
      url: `${challengesAPIEndpoint}/${route}${queryString}`,
      headers: { Authorization: `Bearer ${finalToken}` }
    });

    res.json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 401) {
      res.status(401).json("Unauthorized to access data");
    } else if (error.response && error.response.status === 403) {
      res.status(403).json("Permission denied");
    } else {
      res.status(500).json("Whoops, something went wrong");
    }
  }
});

app.listen(port, () => console.log("Started"));
