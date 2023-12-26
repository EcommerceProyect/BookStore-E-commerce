    const { Products, Author, Genre, ISBN, ReleasedDate, Editorial } = require("../db");

    const getProductByIdController = async (productId) => {
    try {
        const product = await Products.findByPk(productId, {
        include: [
            { model: Author, as: 'Authors' },
            { model: ReleasedDate, as: 'ReleasedDate' },
            { model: Editorial, as: 'Editorial' },
            { model: Genre, as: 'Genres' },
            { model: ISBN, as: 'ISBN' }
        ],
        });

        return product;
    } catch (error) {
        throw new Error(error.message);
    }
    };

    module.exports = {getProductByIdController};