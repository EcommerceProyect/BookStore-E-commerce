
const { restoreAuthorController } = require("../../controllers/Restore/restoreAuthor");


const restoreAuthorHandler = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('holaaaaaaaaaaaaa');
        const result = await restoreAuthorController(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error.message);
    }
};
module.exports = {restoreAuthorHandler}