const { Products, Author } = require("../../db");

const updateAuthorController = async (productId, newAuthorName) => {
    try {
        const product = await Products.findByPk(productId, {
            include: Author,
        });

        if (!product) {
            throw new Error("No existe el producto");
        }

        const authors = product.Authors;

        if (!authors || authors.length === 0) {
            throw new Error("El producto no tiene información de autor");
        }

        // Obtén la instancia del autor que deseas actualizar (en este caso, supondré que es el primer autor)
        const authorToUpdate = authors[0];

        // Actualiza el nombre del autor
        authorToUpdate.name = newAuthorName;

        // Utiliza setAuthors para actualizar la relación muchos a muchos
        await product.setAuthors(authors);

        return authors;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = { updateAuthorController };
