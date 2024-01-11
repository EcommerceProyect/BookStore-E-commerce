const {Productreview} = require("../../db");

const getAverageRatingController = async (producId) => {
    try {
        const reviews = await Productreview.findAll({
            where:{producId},
        })

        if(reviews.length === 0){
            return{
                message: "No hay reseñas con el producto especificado"
            }
        }

        const totalRating = reviews.reduce((sum,reviews)=> sum + reviews.rating,0);
        const averageRating = totalRating / reviews.length;

        return averageRating
    } catch (error) {
       return error
    }
};

module.exports = {getAverageRatingController};