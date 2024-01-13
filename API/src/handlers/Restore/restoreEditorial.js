const { restoreEditorialController } = require("../../controllers/Restore/restoreEditorial");

const restoreEditorialHandler = async (req, res) => {
        const { id } = req.params;
        try {
            const result = await restoreEditorialController(id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
    
    module.exports = {
        restoreEditorialHandler,
    };