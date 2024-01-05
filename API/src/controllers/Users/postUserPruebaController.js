const { Users } = require("../../db");

const postUserPruebaController = async (data) => {
    const { role, name, last_name, phone, email, password, registration_type, id } = data;

    try {
        const existingUser = await Users.findOne({
            where: {
                email: email,
            },
        });

        if (existingUser) {
            throw new Error("El correo electrónico ya está registrado en la base de datos.");
        }

        const [instanceUser, created] = await Users.findOrCreate({
            where: {
                email,
            },
            defaults: {
                id,
                name,
                last_name,
                phone,
                email,
                registration_type,
                password,
                role,
            },
        });

        return created;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    postUserPruebaController,
};
