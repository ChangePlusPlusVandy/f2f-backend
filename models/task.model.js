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
    description: {
        type: String,
    },
    dueAt: {
        type: String,
        required: true
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
    pointGoal:{
        type: Number,
    },
    upcomingTasks: {
        type: Array,
        default: []
    },
    allTasks: {
        type: Array, 
        default: []
    }

}, {
    timestamps: true,
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;