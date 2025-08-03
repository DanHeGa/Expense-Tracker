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
// router.ger("/gerUser", protect, getUserInfo);

module.exports = router;