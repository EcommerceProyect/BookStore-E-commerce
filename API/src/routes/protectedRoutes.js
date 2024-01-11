/* eslint-disable no-undef */
const { Router } = require("express");
const router = Router();
const cors = require("cors");
const { auth } = require("express-oauth2-jwt-bearer");
const { postUser } = require("../handlers/Users/postUser");
const { getUser_Token } = require("../handlers/Users/getUser_Token");
const { getAllUsers } = require("../handlers/Users/getAllUsers");
const { createProduct } = require("../handlers/createProduct");
const { updateUserHandler } = require("../handlers/Users/updateUserHandler");
const { deleteUserHandler } = require("../handlers/Users/deleteUser");
const { activeUserHandler } = require("../handlers/Users/activeUserHandler");
const { updateProductHandler } = require("../handlers/updateProduct");
const {
  getOrderByUserIdHandler
} = require("../handlers/Orders/getOrderByUserIdHandler");
const {
  asingRoleToUserHandler
} = require("../handlers/Users/asingRoleToUserHandler");

router.use(cors());

const jwtCheck = auth({
  audience: "https://www.protectAPI.com",
  issuerBaseURL: "https://dev-s3pcs1ovog464bay.us.auth0.com/",
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
    console.log("es admin");
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

//Users
router.get("/authorized", checkPermissions(["user:edit"]), async (req, res) => {
  console.log(req.auth);

  try {
    // const emailExist = await

    console.log("hola protected");
    const response = await postUser(req, res);

    console.log(response, "soyyyy el protect");

    res.status(200).json({
      id_user: req.auth.payload.sub
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      // es 404 para que en la api intermedia pase que el usuario ya existia
      error: error,
      message: "Something went wrong"
    });
  }
});

router.get("/authorized/check", (req, res) => {
  res.status(200).json({ message: "El usuario esta autenticado" });
});
router.get(
  "/authorized/profile",
  checkPermissions(["user:edit"]),
  getUser_Token
);
router.get("/authorized/users", checkPermissions(["admin:edit"]), getAllUsers);

router.put(
  "/authorized/admin/:id",
  checkPermissions(["admin:edit"]),
  asingRoleToUserHandler
);

//update user by user
router.put(
  "/authorized/users",
  checkPermissions(["user:edit"]),
  updateUserHandler
);

//activar usuario si esta desactivado.  Solo admin
router.put(
  "/authorized/activeuser/:id",
  checkPermissions(["admin:edit"]),
  activeUserHandler
);

router.delete(
  "/authorized/users/:id",
  checkPermissions(["admin:edit"]),
  deleteUserHandler
);

//Products
router.post(
  "/authorized/products",
  checkPermissions(["admin:edit"]),
  createProduct
);

router.put(
  "/authorized/products/:id",
  checkPermissions(["admin:edit"]),
  updateProductHandler
);

//Orders

router.get(
  "/authorized/orders",
  checkPermissions(["user:edit"]),
  getOrderByUserIdHandler
);

module.exports = router;
