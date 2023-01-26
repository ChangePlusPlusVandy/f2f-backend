const Task = require('../models/task.model.js');
const ObjectId = require('mongodb').ObjectId;



//get all tasks:
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        return res.status(200).json(tasks);
    } 
    catch(err){
        console.log(err.message);
        return res.status(500).send({message: err.message});
    }
}


//get task by taskId:
const getTaskById = async (req, res) => {
    try{
        console.log(req.query.taskId);
        const taskId = req.query.taskId;
        if (taskId){
            const task = await Task.find(ObjectId(req.query.taskId));
            return res.status(200).json(task);
        }
        else{
            return res.status(400).json({message: "Missing taskId"});
        }
    }
    catch(err){
        console.log(err.message);
        return res.status(500).send({message: err.message});
    }
}

//get task by disability
const getTaskByDisability = async (req, res) => {
    try{
        const disability = req.body.disability;
        const allTasks = await Task.find();
        let disabilityTasks = [];
        allTasks.forEach(task => {
            let dis = task.disabilities;
            for (let i = 0; i < dis.length; i++){
                if (dis[i] === disability){
                    disabilityTasks.push(task);
                }
            }
        });
        return res.status(200).json(disabilityTasks);
    }
    catch(err){
        console.log(err.message);
        return res.status(500).send({message: err.message});
    }
}


//create a new task:
const createTask = async (req, res) => {
    try{
        const {title, description, disabilities, timePeriod, resources, status} = req.body;
        const newTask = await Task.create(req.body);
        await newTask.save();
        return res.status(200).json(newTask); 
    }
    catch(err){
        console.log(err.message);
        return res.status(500).send({message: err.message});
    }
}

//update a task:
const updateTask = async (req, res) => {
    try{
        const {taskId} = req.body;
        if (taskId){
            const task = await Task.updateOne({taskId}, req.body)
            return res.status(200).json(task);
        }
        else{
            return res.status(400).json({message: "Missing taskId"});
        }
    }
    catch(err){
        console.log(err.message);
        return res.status(500).send({message: err.message});
    }
}

//delete a task:
const deleteTask = async (req, res) => {
    try{
        const {taskId} = req.body;
        if (taskId){
            const task = await Task.deleteOne({_id: taskId})
            .then(() => res.status(200).json({message: "Task deleted successfully"}))
            .catch((error) => res.status(400).json({message: error}));
        }
        else{
            return res.status(400).json({message: "Missing taskId"});
        }
    }
    catch(err){
        console.log(err.message);
        return res.status(500).send({message: err.message});
    }
}



module.exports = {getAllTasks, getTaskById, getTaskByDisability, createTask, updateTask, deleteTask};
