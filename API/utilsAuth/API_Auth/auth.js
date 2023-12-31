const express = require("express");
const axios = require("axios");
const port = 3001;
const oAuth = require("./middlewares/oAuth");
const app = express();
const cors = require("cors")

const challengesAPIEndpoint = "https://bookstore-e-commerce.onrender.com/authorized";


app.use(cors())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use(oAuth);

//por params si viene una ruta se concatena para hacer la peticion correcta
app.get("/authorized", async (req, res) => {
  try {
    const { access_token } = req.oauth;

    const route = req.query.route || "";

    let queryString = "?";

    for (const [key,value] of Object.entries(req.query)){

      console.log(key,value);
      if(key !== "route" && key !== "code"  ){
        queryString+=`${encodeURIComponent(key)}=${encodeURIComponent(value)}&`
      }

    }

    if(queryString==="?") queryString = "";

    queryString = queryString.slice(0, -1);

    const response = await axios({
      method: "get",
      url: `${challengesAPIEndpoint}/${route}${queryString}`,
      headers: { Authorization: `Bearer ${access_token}` },
    });
    
    return res.json(response.data);

  } catch (error) {

    if (error.response.status === 401) {
      return res.status(401).json("Unauthorized to access data");
    } else if (error.response.status === 403) {
      return res.status(403).json("Permission denied");
    } else {
      return res.status(500).json("Whoops, something went wrong");
    }
  }
});


app.listen(port, () => console.log("Started"));
