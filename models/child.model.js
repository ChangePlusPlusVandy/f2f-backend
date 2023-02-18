const mongoose = require("mongoose");
const ObjectId = require('mongodb').ObjectId;

const childSchema= mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    disabilities: {
        type: [String],
        default: []
    },
    birthDate: {
        type: Date
    },
    completedTasks: {
        type:[ObjectId],
        default:[]
    }
}, {
    timestamps: true,
});

const Child = mongoose.model('Child', childSchema);
module.exports = Child;

