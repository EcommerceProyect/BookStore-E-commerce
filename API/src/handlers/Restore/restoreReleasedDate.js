const {
    restoreReleasedDateController
} = require("../../controllers/Restore/restoreReleasedDate");

const restoreReleasedDateHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await restoreReleasedDateController(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

module.exports = {restoreReleasedDateHandler}