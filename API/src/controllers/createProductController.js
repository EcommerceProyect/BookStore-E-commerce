const { Products } = require("../db");

const createProductController = async (data) =>{

    const {title, synopsis, price, image} = data;

    try {
        console.log(data);
        const [productInstance, created] = await Products.findOrCreate({

            where:{
                title,
            },
            defaults:{
                title,
                synopsis,
                price,
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