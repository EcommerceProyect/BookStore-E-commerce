require("dotenv").config()
const app = require("./src/app");
const {conn} = require("./src/db");
//eslint-disable-next-line no-undef
const {PORT} = process.env;


conn.sync({alter:true})
.then(() =>{
    app.listen(PORT,() => {
        console.log(`Servidor iniciado en el puerto  ${PORT}`);
    })
})