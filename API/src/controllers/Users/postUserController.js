/* eslint-disable no-unused-vars */

const { Users } = require("../../db");

const postUserController = async (data) => {
  const {
    role,
    name,
    last_name,
    phone,
    email,
    password,
    registration_type,
    id
  } = data;

  try {
    console.log("hola!");

    const [instanceUser, created] = await Users.findOrCreate({
      where: {
        email
      },
      defaults: {
        id,
        name,
        last_name,
        phone,
        email,
        registration_type,
        password,
        role
      }
    });

    if (created) {
      return created;
    } else {
      return new Error("El Usuario ya existe");
    }
  } catch (error) {
    return error;
  }
};

module.exports = {
  postUserController
};
