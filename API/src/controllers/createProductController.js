const { Products } = require("../db");

const createProductController = async (data) =>{

    const {name, description, creationDate, price, style, image} = data;

    try {
        
        const [productInstance, created] = await Products.findOrCreate({

            where:{
                name,
            },
            defaults:{
                name,
                description,
                creationDate,
                price,
                style,
                image
            }

        })

        if(created)return productInstance;
        else  throw new Error("no se creo el Producto porque fallo alguna validacion o ya existia el producto");
        

    } catch (error) {
        throw new Error(error.message);
    }

}

module.exports = {
    createProductController,
}