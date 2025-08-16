const User = require('../models/User')
const jwt = require("jsonwebtoken");

//Generate JWT 
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: "1h" });
}

//Register user
exports.registerUser = async (req, res)  => {
    const {fullname, email, password, profileImageUrl} = req.body;

    //valudation check
    if (!fullname || !email || !password){
        return res.status(400).json({message: "All fields are required"});
    }
    
    try{
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({ message: "Al ready existing user, email in use "});
        };
        //create user
        const user = await User.create({
            fullname, 
            email, 
            password, 
            profileImageUrl,
        });
    
        res.status(201).json({
            id: user._id,
            user, 
            token: generateToken(user._id),
        });
    } catch(err) {
        res.status(500).json({
            message: "Error registering a new user", err: err.message 
        });
    }
};
//Login user
exports.loginUser = async (req, res)  => {
    const { email, password } = req.body;
    if (!email || !password){
        return res.status(400).json({ message: "All fields must be filled"});
    }

    try {
        const user = await User.findOne({ email });

        if(!user || !(await user.comparePass(password))) {
            return res.status(400).json({message: "Invalid credencials"})
        }

        res.status(200).json({
            id : user._id,
            user,
            token: generateToken(user._id),
        });
    } catch(err) {
        res.status(500).json({
            message: "Error login user", err: err.message 
        });
    }

};
//Get user info
exports.getUserInfo = async (req, res)  => {
    try{
        const user = User.findById(req.user._id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User nnot found" });
        }

        res.status(200).json(user);
    } catch(err){
        res.status(500).json({
            message: "Error getting user info", err: err.message 
        });
    }
};