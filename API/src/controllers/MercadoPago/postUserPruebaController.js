const { Users } = require("../../db");

const postUserPruebaController = async (req, res) => {
  const { role, name, last_name, phone, email, password, registration_type } =
    req.body;

  try {
    const existingUser = await Users.findOne({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      throw new Error(
        "El correo electrónico ya está registrado en la base de datos."
      );
    }
    // instanceUser,
    const [created] = await Users.findOrCreate({
      where: {
        email,
      },
      defaults: {
        name,
        last_name,
        phone,
        email,
        registration_type,
        password,
        role,
      },
    });

    res.status(200).json({ message: "Usuario creado", created: created });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  postUserPruebaController,
};
