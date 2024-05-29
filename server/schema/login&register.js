const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: [/.+@.+\..+/, "Please enter a valid email address"] 
    },
    phoneNumber: { 
        type: String, 
        required: true, 
        match: [/^\d{10}$/, "Please enter a valid phone number"] 
    },
    DOB: { type: Date, required: true },
    gender: { type: String, required: true },
    password: { type: String, required: true }
});

const RegisterUser = mongoose.model("RegisterUser", registerSchema);

module.exports = RegisterUser;
