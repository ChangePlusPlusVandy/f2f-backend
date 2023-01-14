const mongoose = require("mongoose");

const userSchema= mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName:{
        type: String,
        required: true,
        trim: true
    }, 
    schoolDistrict:{
        type: Number,
        required: true,
        trim: true
    }, 
    zipCode: {
        type: Number,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        trim: true,
    }
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);
module.exports = User;