// const {Products,Genre} = require("../../db");

// const filterProductByGenreController = async (genre) => {

//     try {
        
//         const response = await Genre.findAll({
//             where:{
//                 name:genre,
//             },
//             include:[{
//               model:Products,
//               as:"Product",

//             }]
//         })

//     } catch (error) {
        
//     }

// }