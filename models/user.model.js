const mongoose = require("mongoose");

const taskSchema= mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    dueAt: {
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    resources:{
        type: String
    },
}, {
    timestamps: true,
});

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
        type: String,
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
    },
    disability: {
        type: Array,
        default: [],
    },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);
module.exports = User;