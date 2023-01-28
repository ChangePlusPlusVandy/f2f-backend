const mongoose = require("mongoose");

const childSchema= mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    disabilities: {
        type: [String],
        default: []
    },
    birthMonth: {
        type: Number
    },
    birthDay: {
        type: Number
    },
    birthYear: {
        type: Number
    },
    completedTasks: {
        type: Array,
        default:[]
    },
}, {
    timestamps: true,
});

const Child = mongoose.model('Child', childSchema);
module.exports = Child;

