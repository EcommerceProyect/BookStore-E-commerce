/* eslint-disable no-undef */
const {Router} = require("express");
const router = Router();
const cors = require("cors");
const { auth } = require('express-oauth2-jwt-bearer');
const { postUser } = require("../handlers/Users/postUser");
const { getUser_Token } = require("../handlers/Users/getUser_Token");
const { getAllUsers } = require("../handlers/Users/getAllUsers");
const { createProduct } = require("../handlers/createProduct");
const { updateUserHandler } = require("../handlers/Users/updateUser");
const { deleteUserHandler } = require("../handlers/Users/deleteUser");



router.use(cors());

const jwtCheck = auth({
  audience: 'https://www.protectAPI.com',
  issuerBaseURL: 'https://dev-s3pcs1ovog464bay.us.auth0.com/',
  tokenSigningAlg: 'RS256',
});

//middleware
const checkPermissions = (requiredPermissions) => (req, res, next) => {
  
  const userPermissions = req.auth.payload.permissions || [];

  if (userPermissions.some(permission => requiredPermissions.includes(permission))) {
    // El usuario tiene al menos uno de los permisos requeridos
    next();
  } else {
    // El usuario no tiene los permisos necesarios
    res.status(403).json({ error: 'Forbidden', message: 'Insufficient permissions' });
  }
};

router.use(jwtCheck);

//rutas del admin 

//Users
router.get("/authorized",checkPermissions(['admin:edit']), async (req, res) => {
  
  console.log("info auth", req.auth);

  try {
    
    const response = await postUser(req,res);

    console.log(response);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: 'Something went wrong' });
  }
  res.status(200).json({
    id_user:req.auth.payload.sub
  });
  
});

router.get('/authorized/check',checkPermissions(['admin:edit']),(req,res) => {

  res.status(200).json({message:"El usuario esta autenticado"})

});
router.get('/authorized/profile',checkPermissions(['admin:edit']),getUser_Token);
router.get('/authorized/users',checkPermissions(['admin:edit']),getAllUsers);
router.put('/authorized/users',checkPermissions(['admin:edit']),updateUserHandler);
router.delete('/authorized/users',checkPermissions(['admin:edit']),deleteUserHandler);

//Products
router.post("/authorized/products",checkPermissions(['admin:edit']), createProduct);

module.exports = router;
