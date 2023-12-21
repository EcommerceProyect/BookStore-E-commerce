const { postUserController } = require("../../controllers/Users/postUserController")

const postUser = async (req,res) => {

    const {sub,email,email_verified,given_name} = req.oidc.user;

    const {name,last_name,phone,password} = req.body;

    if(!email_verified) return false;

    try {
        
        const response = await postUserController({

            registration_type: sub.includes("google") ? "google" : "local",
            email,
            name:given_name || name,
            last_name: last_name || " ",
            phone,
            password:password,
            
        });

        res.status(200).json(response);

    } catch (error) {
        res.status(500).json(error.message)
    }

}

module.exports = {
    postUser,
}