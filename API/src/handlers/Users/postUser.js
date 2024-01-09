const {
  postUserController
} = require("../../controllers/Users/postUserController");
const { registrationMail } = require("../../mailService/mailService");

const postUser = async (req,res) => {

    const {permissions,custom_email_claim,sub} = req.auth.payload;

    console.log(req.user);

    if(!custom_email_claim) return false;

    try {
        
        const response = await postUserController({
            
            id:sub,
            registration_type: sub.includes("google") ? "google" : "local",
            email:custom_email_claim,
            name:custom_email_claim,
            last_name: null,
            phone: null ,
            password:null,
            role:[permissions].includes("admin") ? "admin" : "user",
            
        });

        if(response === true){
          await registrationMail(custom_email_claim);
          return response
        }else{
          throw new Error("El Usuario ya existe");
        }


    } catch (error) {
       throw new Error(error.message);
    }

}

module.exports = {
  postUser
};
