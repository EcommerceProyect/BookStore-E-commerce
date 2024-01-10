const { getAllUsersController } = require("../../controllers/Users/getAllUsersController");


const getAllUsers = async (req,res) => {

    const {page,deleted} = req.query;

    try {
        
        const response = await getAllUsersController(page,deleted);

        res.status(200).json(response);

    } catch (error) {
        res.status(500).json(error.message);
    }

}

module.exports = {
    getAllUsers
}