const express = require("express");
//controller function
const{loginUser,signupUser} =require('../controllers/userController')


const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
//login
router.post("/login",loginUser);

//sign up
router.post("/signup",signupUser);

module.exports = router;
