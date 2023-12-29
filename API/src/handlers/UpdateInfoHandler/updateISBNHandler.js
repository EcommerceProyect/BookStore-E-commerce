const { updateISBNController } = require("../../controllers/UpdateInfo/UpdateISBNController");

const updateISBNHandler = async (req,res) => {

    const {id} = req.params;
    const ISBNdata = req.body;

    try {
        
        const response = await updateISBNController(id,ISBNdata);

        res.status(200).json({
            message:"ISBN actualizado correctamente",
            response
        })

    } catch (error) {
        res.status(500).json(error.message);
    }

}

module.exports = {
    updateISBNHandler,
}