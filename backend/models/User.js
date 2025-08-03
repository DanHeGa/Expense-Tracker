const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
    {
        fullname: {type: String, required: true}, 
        email: {type: String, required: true},
        password: {type: String, required: true},
        profileImageUrl: {type: String, default: null},
    },
    {timestamps: true}
);

UserSchema.pre("save", async function (next) {
    //if pass has no changes, the continue (next() function)
    if (!this.isModified("password")) return next();
    //else
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

UserSchema.methods.comparePass = async function (candidatePass) {
    return await bcrypt.compare(candidatePass, this.password);
};

module.exports = mongoose.model("User", UserSchema);