const { required } = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String , default:""},
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: Number, required: true ,unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    vaultPassword:{type: String , required:false },
    userProfilePic:{type: String , required:false}
});

const userModel = mongoose.model('UserDetails', userSchema);

module.exports = userModel;
