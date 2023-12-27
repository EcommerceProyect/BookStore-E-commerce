const { postUserController } = require("../../controllers/Users/postUserController")

const postUser = async (req,res) => {

    const {permissions,name,last_name,phone,password,sub,custom_email_claim} = req.body;

    if(!custom_email_claim) return false;

    try {
        
        const response = await postUserController({

            registration_type: sub.includes("google") ? "google" : "local",
            email:custom_email_claim,
            name:custom_email_claim || name,
            last_name: last_name || " ",
            phone,
            password:password||" ",
            role:[permissions].includes("admin") ? "admin" : "user",
            
        });

        res.status(200).json(response);

    } catch (error) {
        res.status(500).json(error.message)
    }

}

module.exports = {
    postUser,
}