const express = require("express");
const { protect } = require("../middleware/authMiddleware.js");


const {
    registerUser, 
    loginUser,
    getUserInfo
} = require("../controllers/authControllers");

const router = express.Router();

//Routes for authentication
router.post("/register", registerUser);
router.post("/login", loginUser);
//TODO: Check getuser endpoint with protect
router.get("/getUser", protect, getUserInfo);

module.exports = router;