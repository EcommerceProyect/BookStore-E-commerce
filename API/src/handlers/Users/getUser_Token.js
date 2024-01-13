const {
  getUserController
} = require("../../controllers/Users/getUserController");

const getUser_Token = async (req, res) => {
  const { sub } = req.auth.payload;

  try {
    console.log("estamos en getusertoken");
    console.log(sub);
    const response = await getUserController(sub);
    console.log(response);
    const { token } = req.auth;

    if (token) res.status(200).json({ response, token });
    else res.status(200).json({ response });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  getUser_Token
};
