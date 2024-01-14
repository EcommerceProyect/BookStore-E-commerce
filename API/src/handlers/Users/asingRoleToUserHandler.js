require("dotenv").config();
const {CLIENT_SECRET,API_DOMAIN,CLIENT_ID} = process.env;

const { asingRoleToUserController } = require("../../controllers/Users/asingRoleToUserController");
const axios = require("axios").default;

const asingRoleToUserHandler = async (req,res) => {

    const {id} = req.params;

    try {

        let options = {
        method: 'POST',
        url: `https://${API_DOMAIN}/oauth/token`,
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        data: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: `${CLIENT_ID}`,
            client_secret: `${CLIENT_SECRET}`,
            audience: `https://${API_DOMAIN}/api/v2/`
        })
        };

        const responseToken = await axios.request(options)
        console.log(responseToken);
        const response = await asingRoleToUserController(id,responseToken.data.access_token);

        res.status(200).json({response,message:"User rol Updated"});

    } catch (error) {
        res.status(500).json({error:error.message})
    }

}

module.exports= {
    asingRoleToUserHandler
}