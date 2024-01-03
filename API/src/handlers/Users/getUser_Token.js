const { getUserController } = require("../../controllers/Users/getUserController")

const getUser_Token = async (req,res) => {

    const {id} = req.query;

    try {
        
        const response = await getUserController(id);
        const {token} = req.auth;

        if(token) res.status(200).json({response,token});
        else res.status(200).json({response});

    } catch (error) {
        res.status(500).json(error.message);
    }

}

module.exports = {
    getUser_Token
}