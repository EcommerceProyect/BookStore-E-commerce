// const {Users} = require("../../db");

// const updateUserController = async (id, newData) => {
//     try {
//         // Buscar el usuario por ID
      
//         const user = await Users.findByPk(id);

//         if (!user) {
//             // Si no se encuentra el usuario, puedes manejar el error como desees
//             throw new Error("Usuario no encontrado");
//         }

//         // Actualizar los campos del usuario con los nuevos datos
//         await user.update(newData);

//         // Devolver el usuario actualizado
//         return user;
//     } catch (error) {
//         // Puedes manejar el error de una manera específica para tu aplicación
//         throw new Error(`Error al actualizar el usuario: ${error.message}`);
//     }
// };

// module.exports = { updateUserController };

const {Users} = require("../../db");

const updateUserController = async (id, userData) => {
    try {
        const user = await Users.findByPk(id);

        if (!user){
            throw new Error ("No existe el usuario");
        }

        //Hago esto para no tener problemas ya que solo vamos a actualizar algunos campos
        // (Es como una actualizacion parcial) y no pierdo la info existente.
        user.name = userData.name || user.name;
        user.last_name = userData.last_name || user.last_name;
        user.phone = userData.phone || user.phone;
        user.password = userData.password || user.password;
        
        await user.save();


        const updateUser = await Users.findByPk(id);
        return updateUser;
    } catch (error) {
        throw new Error(error.message);
        
    }
};


module.exports = {
    updateUserController
};
