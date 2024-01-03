/* eslint-disable no-undef */
const { Router } = require("express");
const router = Router();
const cors = require("cors");
const { auth } = require("express-oauth2-jwt-bearer");
const { postUser } = require("../handlers/Users/postUser");
const { getUser_Token } = require("../handlers/Users/getUser_Token");
const { getAllUsers } = require("../handlers/Users/getAllUsers");

router.use(cors());

const jwtCheck = auth({
  audience: "https://api-test-auth0.com",
  issuerBaseURL: "https://dev-wf8xlazxrpkoi322.us.auth0.com/",
  tokenSigningAlg: "RS256"
});

//middleware
const checkPermissions = (requiredPermissions) => (req, res, next) => {
  const userPermissions = req.auth.payload.permissions || [];

  if (
    userPermissions.some((permission) =>
      requiredPermissions.includes(permission)
    )
  ) {
    // El usuario tiene al menos uno de los permisos requeridos
    next();
  } else {
    // El usuario no tiene los permisos necesarios
    res
      .status(403)
      .json({ error: "Forbidden", message: "Insufficient permissions" });
  }
};

router.use(jwtCheck);

//rutas del admin
router.get(
  "/authorized",
  checkPermissions(["admin:edit"]),
  async (req, res) => {
    console.log("info auth", req.auth);

    try {
      const response = await postUser(req, res);

      console.log(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Internal Server Error",
        message: "Something went wrong"
      });
    }
    res.status(200).json({
      id_user: req.auth.payload.sub
    });
  }
);

router.get(
  "/authorized/profile",
  jwtCheck,
  checkPermissions(["admin:edit"]),
  getUser_Token
);
router.get(
  "/authorized/users",
  jwtCheck,
  checkPermissions(["admin:edit"]),
  getAllUsers
);

module.exports = router;
