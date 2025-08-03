const User = require('../models/User')
const jwt = require("jsonwebtoken");

//Generate JWT 
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: "1h" });
}

//Register user
exports.registerUser = async (req, res)  => {};
//Login user
exports.loginUser = async (req, res)  => {};
//Get user info
exports.getUserInfo = async (req, res)  => {};