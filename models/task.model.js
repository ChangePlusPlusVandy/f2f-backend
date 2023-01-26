const mongoose = require("mongoose");


const taskSchema= mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
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
    resources: {
        type: String,
        default: "none",
    },
    status:{
        type: String,
        required: true,
        default: "Incomplete"
    }
}, {
    timestamps: true,
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;