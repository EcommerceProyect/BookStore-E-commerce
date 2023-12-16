
const {ReleasedDate,Products} = require("../../db");
const { filterProductByPk } = require("./filterProductByPk");

const filterProductByDateController = async (rDate) =>{

    try {
        console.log(new Date(rDate))



        const response = await ReleasedDate.findAll({
            where:{
                date:new Date(rDate),
            },
            include:[{
                model:Products,
                as:"Product",
                attributes:["id"],
            }]
        })

        
        const productsId= response.map((releasedDate) => releasedDate.dataValues.ProductId);

        const resProducts = await Promise.all(
            productsId.map(async (id) => {

                const product = await filterProductByPk(id);
                return product;

            })
        );

        console.log(resProducts);
        return await resProducts;

    } catch (error) {
        return error;
    }

}

module.exports ={
    filterProductByDateController,
}