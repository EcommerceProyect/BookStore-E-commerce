/* eslint-disable no-undef */
const {Router} = require("express");
const router = Router();
const cors = require("cors");
const { auth } = require('express-oauth2-jwt-bearer');
const { postUser } = require("../handlers/Users/postUser");



router.use(cors());

const jwtCheck = auth({
  audience: 'https://www.protectAPI.com',
  issuerBaseURL: 'https://dev-s3pcs1ovog464bay.us.auth0.com/',
  tokenSigningAlg: 'HS256',
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

router.get("/authorized",checkPermissions(['admin:edit']), async (req, res) => {
  console.log("Y", req.auth);
  try {
    
    const response = await postUser(req,res)
    console.log(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: 'Something went wrong' });
  }
  res.json({
    challenge1: "This is the first challenge",
    challenge2: "This is another challenge",
  });
});



module.exports = router;
