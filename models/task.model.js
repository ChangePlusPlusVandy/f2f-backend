const mongoose = require("mongoose");


const taskSchema= mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    details: {
        type: String,
    },
    disabilities: {
        type: [String],
        default: []
    },
    timePeriod: {
        type: String,
        default: "none",
    },
    age: {
        type: [String],
        default: []
    },
    priority:{
        type: Number
    }
}, {
    timestamps: true,
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;