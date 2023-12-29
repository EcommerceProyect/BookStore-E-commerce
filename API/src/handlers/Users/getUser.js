const { getUserController } = require("../../controllers/Users/getUserController")

const getUser = async (req,res) => {

    const {id} = req.query;

    try {
        
        const response = await getUserController(id);

        res.status(200).json(response);

    } catch (error) {
        res.status(500).json(error.message);
    }

}

module.exports = {
    getUser
}