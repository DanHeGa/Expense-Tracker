const express = require("express");

const {
    registerUser, 
    loginUser,
    getUserInfo
} = require("../controllers/authControllers");

const router = express.Router();

//Routes for authentication
router.post("/register", registerUser);
router.post("/login", loginUser);
router.ger("/gerUser", getUserInfo);

module.exports = router;